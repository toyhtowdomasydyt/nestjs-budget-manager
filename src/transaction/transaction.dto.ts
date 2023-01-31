import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export const PROFITABLE = 'profitable';
export const CONSUMABLE = 'consumable';
export type TransactionTypes = 'profitable' | 'consumable';

export class TransactionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  category: Array<string>;
}
