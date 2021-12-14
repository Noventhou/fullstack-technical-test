import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAccountingLineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  companyId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  accountingNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  amount!: number;

  @ApiProperty()
  @IsNotEmpty()
  date!: Date;
}