import {
  BadRequestException,
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
import { BankService } from 'src/bank/bank.service';
import { CategoryInputDTO } from './category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('bank/:bankId/category')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly bankService: BankService,
  ) {}

  @Post('/')
  async createCategory(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Body() categoryInput: CategoryInputDTO,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.categoryService.createCategory(bankId, categoryInput);
  }

  @Delete('/:id')
  async deleteCategory(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.categoryService.deleteCategory(id);
  }

  @Get('/:id')
  async getOneCategory(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.categoryService.getOneCategory(id);
  }

  @Get('/')
  async getAllCategories(@Param('bankId', ParseIntPipe) bankId: number) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.categoryService.getAllCategories(bankId);
  }

  @Put('/:id')
  async updateCategory(
    @Param('bankId', ParseIntPipe) bankId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() bankInput: CategoryInputDTO,
  ) {
    const bank = await this.bankService.getOneBank(bankId);

    if (!bank) {
      throw new BadRequestException();
    }

    return this.categoryService.updateCategory(id, bankInput);
  }
}
