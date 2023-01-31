import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  ParseIntPipe,
  Delete,
  Param,
  BadRequestException,
  Get,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BankService } from 'src/bank/bank.service';
import { StatsDTO } from './stats.dto';
import { TransactionDTO } from './transaction.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Controller('bank/:bankId/transaction')
@UsePipes(new ValidationPipe())
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly bankService: BankService,
  ) {}

  @Post('/')
  async createTransaction(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Body() transactionInput: TransactionDTO,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.transactionService.createTransaction(bankId, transactionInput);
  }

  @Delete('/:id')
  async deleteTransaction(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.transactionService.deleteTransaction(id);
  }

  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @Get('/')
  async getAllTransactions(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.transactionService.getAllTransactions(bankId, offset, limit);
  }

  @Post('/stats')
  async getStatistic(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Body() statsInput: StatsDTO,
  ) {
    return this.transactionService.getStats(bankId, statsInput);
  }
}
