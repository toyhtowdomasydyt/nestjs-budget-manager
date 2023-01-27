import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

export interface BankInput {
  name: string;
  balance: number;
}

@Injectable()
export class BankService {
  constructor(private readonly prismaService: DatabaseService) {}

  createBank(bankInput: BankInput) {
    return this.prismaService.bank.create({
      data: bankInput,
    });
  }

  deleteBank(id: number) {
    return this.prismaService.bank.delete({ where: { id } });
  }

  getOneBank(id: number) {
    return this.prismaService.bank.findUnique({ where: { id } });
  }

  getAllBanks() {
    return this.prismaService.bank.findMany();
  }

  updateBank(id: number, updateBankInput: BankInput) {
    return this.prismaService.bank.update({
      where: { id },
      data: updateBankInput,
    });
  }
}
