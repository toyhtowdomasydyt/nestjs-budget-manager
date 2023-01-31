import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateBankInputDTO } from './create-bank.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateBankInputDTO } from './update-bank.dto';

@Injectable()
export class BankService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createBank(bankInput: CreateBankInputDTO) {
    try {
      const bank = await this.prismaService.bank.create({
        data: bankInput,
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

    if (bank.transactions.length > 0) {
      throw new BadRequestException('Bank has transactions inside');
    }

    return this.prismaService.bank.delete({ where: { id } });
  }

  getOneBank(id: number) {
    return this.prismaService.bank.findUnique({ where: { id } });
  }

  getAllBanks() {
    return this.prismaService.bank.findMany();
  }

  updateBank(id: number, updateBankInput: UpdateBankInputDTO) {
    return this.prismaService.bank.update({
      where: { id },
      data: updateBankInput,
    });
  }

  async calculateBalance(id: number, balance: number) {
    const bank = await this.prismaService.bank.findUnique({ where: { id } });
    return this.prismaService.bank.update({
      where: { id },
      data: { balance: bank.balance + balance },
    });
  }
}
