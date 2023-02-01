import { fetch } from 'undici';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateBankInputDTO } from './create-bank.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateBankInputDTO } from './update-bank.dto';

@Injectable()
export class BankService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createBank(bankInput: CreateBankInputDTO) {
    try {
      const webhookLinks =
        bankInput?.webhookLinks && bankInput.webhookLinks.length > 0
          ? bankInput.webhookLinks.map((link) => ({ link }))
          : [];

      const bank = await this.prismaService.bank.create({
        data: {
          name: bankInput.name,
          balance: bankInput.balance,
          webhookLinks: {
            create: webhookLinks,
          },
        },
      });

      return bank;
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new bank cannot be created with this name',
          );
        }
      }
      throw error;
    }
  }

  async deleteBank(id: number) {
    const bank = await this.prismaService.bank.findUnique({
      where: { id },
      include: { transactions: true },
    });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    if (bank.transactions.length > 0) {
      throw new BadRequestException('Bank has transactions inside');
    }

    return this.prismaService.bank.delete({ where: { id } });
  }

  async getOneBank(id: number) {
    const bank = await this.prismaService.bank.findUnique({ where: { id } });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    return bank;
  }

  getAllBanks() {
    return this.prismaService.bank.findMany();
  }

  async updateBank(id: number, updateBankInput: UpdateBankInputDTO) {
    const bank = await this.prismaService.bank.findUnique({ where: { id } });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    const webhookLinks =
      updateBankInput?.webhookLinks && updateBankInput.webhookLinks.length > 0
        ? updateBankInput.webhookLinks.map((link) => ({ link }))
        : [];

    return this.prismaService.bank.update({
      where: { id },
      data: {
        name: updateBankInput.name,
        webhookLinks: {
          create: webhookLinks,
        },
      },
    });
  }

  async calculateBalance(id: number, balance: number) {
    const bank = await this.prismaService.bank.findUnique({ where: { id } });
    const updatedBalance = bank.balance + balance;

    if (updatedBalance < 0) {
      throw new BadRequestException('Transaction amount is to large');
    }

    return this.prismaService.bank.update({
      where: { id },
      data: { balance: updatedBalance },
    });
  }

  async callWebhook(id: number, data: string) {
    const webhookLinks = await this.prismaService.webhookLink.findMany({
      where: { bankId: id },
    });

    return Promise.all(
      webhookLinks.map(({ link }) =>
        fetch(link, {
          method: 'POST',
          body: data,
        }),
      ),
    );
  }
}
