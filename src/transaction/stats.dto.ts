import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class StatsDTO {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fromPeriod?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  toPeriod?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  categoryIds: Array<number>;
}
