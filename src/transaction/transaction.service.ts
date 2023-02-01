import { BadRequestException, Injectable } from '@nestjs/common';
import { BankService } from 'src/bank/bank.service';
import { DatabaseService } from 'src/database/database.service';
import { StatsDTO } from './stats.dto';
import { TransactionDTO, PROFITABLE, CONSUMABLE } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly bankService: BankService,
  ) {}

  private getTransactionType(amount: number) {
    return amount >= 0 ? PROFITABLE : CONSUMABLE;
  }

  private async getValidCategories(
    bankId: number,
    categoryNames: Array<string>,
  ) {
    const categories = await this.prismaService.category.findMany({
      where: { bankId },
    });

    const usedCategories = categories.filter((category) =>
      categoryNames.includes(category.name),
    );

    if (usedCategories.length === 0) {
      throw new BadRequestException('Categories not valid');
    }

    return usedCategories;
  }

  async createTransaction(bankId: number, transactionInput: TransactionDTO) {
    const transactionType = this.getTransactionType(transactionInput.amount);
    const validCategories = await this.getValidCategories(
      bankId,
      transactionInput.category,
    );

    const transaction = await this.prismaService.transaction.create({
      data: {
        amount: transactionInput.amount,
        type: transactionType,
        bankId,
        category: {
          connect: validCategories.map((category) => ({ id: category.id })),
        },
      },
    });

    await this.bankService.calculateBalance(bankId, transactionInput.amount);
    this.bankService.callWebhook(bankId, JSON.stringify(transaction));

    return transaction;
  }

  async deleteTransaction(id: number) {
    const transaction = await this.prismaService.transaction.delete({
      where: { id },
    });

    await this.bankService.calculateBalance(
      transaction.bankId,
      -transaction.amount,
    );

    return transaction;
  }

  async getAllTransactions(bankId: number, offset = 0, limit = 10) {
    return this.prismaService.transaction.findMany({
      skip: offset,
      take: limit,
      where: {
        bankId,
      },
    });
  }

  async getStats(bankId: number, statsInput: StatsDTO) {
    const createdAtFilter: { gte?: Date; lt?: Date } = {};

    if (statsInput.fromPeriod) {
      createdAtFilter.gte = new Date(statsInput.fromPeriod);
    }

    if (statsInput.toPeriod) {
      createdAtFilter.lt = new Date(statsInput.toPeriod);
    }

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        bankId,
        createdAt: {
          ...createdAtFilter,
        },
      },
      include: {
        category: {
          where: {
            id: {
              in: statsInput.categoryIds,
            },
          },
        },
      },
    });

    const stats = transactions
      .filter((transaction) => transaction.category.length > 0)
      .map((transaction) => ({
        [transaction.category.map((category) => category.name).join(',')]:
          transaction.amount,
      }));

    return stats;
  }
}
