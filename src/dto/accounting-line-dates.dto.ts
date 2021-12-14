import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class AccountingLineByDatesDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate!: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate!: Date;
}