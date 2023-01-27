import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BankService } from './bank.service';

@Module({
  imports: [DatabaseModule],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
