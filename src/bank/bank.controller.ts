import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBankInputDTO } from './create-bank.dto';
import { UpdateBankInputDTO } from './update-bank.dto';

@ApiTags('Bank')
@Controller('bank')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post('/')
  createBank(@Body() bankInput: CreateBankInputDTO) {
    return this.bankService.createBank(bankInput);
  }

  @Delete('/:id')
  deleteBank(@Param('id', ParseIntPipe) id: number) {
    return this.bankService.deleteBank(id);
  }

  @Get('/:id')
  getOneBank(@Param('id', ParseIntPipe) id: number) {
    return this.bankService.getOneBank(id);
  }

  @Get('/')
  getAllBanks() {
    return this.bankService.getAllBanks();
  }

  @Put('/:id')
  updateBank(
    @Param('id', ParseIntPipe) id: number,
    @Body() bankInput: UpdateBankInputDTO,
  ) {
    return this.bankService.updateBank(id, bankInput);
  }
}
