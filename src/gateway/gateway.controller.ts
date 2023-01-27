import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BankService } from 'src/bank/bank.service';
import { BankInput } from 'src/bank/bank.service';

@Controller('v1')
export class GatewayController {
  constructor(private readonly bankService: BankService) {}

  @Post('bank')
  createBank(@Body() bankInput: BankInput) {
    return this.bankService.createBank(bankInput);
  }

  @Delete('bank/:id')
  deleteBank(@Param('id') id: number) {
    return this.bankService.deleteBank(id);
  }

  @Get('bank/:id')
  getOneBank(@Param('id') id: number) {
    return this.bankService.getOneBank(id);
  }

  @Get('bank')
  getAllBanks() {
    return this.bankService.getAllBanks();
  }

  @Put('bank/:id')
  updateBank(@Param('id') id: number, @Body() bankInput: BankInput) {
    return this.bankService.updateBank(id, bankInput);
  }
}
