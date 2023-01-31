import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryInputDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
