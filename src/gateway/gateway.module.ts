import { Module } from '@nestjs/common';
import { BankModule } from 'src/bank/bank.module';
import { CategoryModule } from 'src/category/category.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [BankModule, TransactionModule, CategoryModule],
  controllers: [GatewayController],
})
export class GatewayModule {}
