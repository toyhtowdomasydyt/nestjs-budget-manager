import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DatabaseService } from 'src/database/database.service';
import { CategoryInputDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createCategory(bankId: number, categoryInput: CategoryInputDTO) {
    try {
      const category = await this.prismaService.category.create({
        data: { ...categoryInput, bankId },
      });

      return category;
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new category cannot be created with this category name',
          );
        }
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      include: {
        transaction: true,
      },
    });

    if (category.transaction.length > 0) {
      throw new BadRequestException('Category has transaction attached');
    }

    return this.prismaService.category.delete({ where: { id } });
  }

  getOneCategory(id: number) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  getAllCategories(bankId: number) {
    return this.prismaService.category.findMany({ where: { bankId } });
  }

  updateCategory(id: number, categoryInput: CategoryInputDTO) {
    return this.prismaService.category.update({
      where: { id },
      data: categoryInput,
    });
  }
}
