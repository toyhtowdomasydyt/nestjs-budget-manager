import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BankModule } from 'src/bank/bank.module';

@Module({
  imports: [DatabaseModule, BankModule],
  exports: [TransactionService],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
