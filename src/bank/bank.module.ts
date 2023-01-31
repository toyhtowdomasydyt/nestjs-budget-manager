import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';

@Module({
  imports: [DatabaseModule],
  providers: [BankService],
  exports: [BankService],
  controllers: [BankController],
})
export class BankModule {}
