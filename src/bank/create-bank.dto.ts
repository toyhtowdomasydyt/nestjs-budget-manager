import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBankInputDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  balance: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  webhookLinks?: Array<string>;
}
