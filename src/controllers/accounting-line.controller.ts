import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AccountingLineService } from '../services';
import { AccountingLineDto, AccountingLineByDatesDto, CreateAccountingLineDto } from '../dto';
import { AccountingLineModel } from '../models';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/accounting-lines')
export class AccountingLineController {
  constructor(private readonly accountingLineService: AccountingLineService) {}

  // Get an accounting Line between two dates for a specific client
  @Get('/companies/:id')
  @ApiResponse({ status: 200, description: 'Get of accounting line between two dates for a specific client'})
  @ApiResponse({ status: 400, description: 'A parameter is missing or not respect the correct format.'})
  findByDatesForClient(@Param('id') companyId : number, @Query() dates : AccountingLineByDatesDto) : Promise<object> {
    return this.accountingLineService.findByDatesForClient(companyId, dates.startDate, dates.endDate);
  }

  // Get an accounting Line between two dates
  @Get('/dates')
  @ApiResponse({ status: 200, description: 'Get of accounting Line between two dates'})
  @ApiResponse({ status: 400, description: 'A parameter is missing or not respect the correct format.'})
  findByDates(@Query() dates : AccountingLineByDatesDto) : Promise<AccountingLineModel[]> {
    return this.accountingLineService.findByDates(dates.startDate, dates.endDate);
  }

  // Get an accounting Line by id
  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get a specific accounting line'})
  @ApiResponse({ status: 400, description: 'The id is missing or not respect the number format'})
  findById(@Param('id', ParseIntPipe) accountingLineId: number) : Promise<AccountingLineModel> {
    return this.accountingLineService.findById(accountingLineId);
  }

  // Get all of the accounting Lines
  @Get()
  @ApiResponse({ status: 200, description: 'Get all the accounting lines'})
  findAll() : Promise<AccountingLineModel[]> {
    return this.accountingLineService.findAll();
  }

  // Creation of a new accounting Line
  @Post()
  @ApiResponse({ status: 200, description: 'The accounting line has been successfully created.'})
  @ApiResponse({ status: 400, description: 'A parameter is missing or not respect the correct format.'})
  create(@Query() createAccountingLine : CreateAccountingLineDto) : Promise<AccountingLineModel> {
    return this.accountingLineService.create(createAccountingLine.companyId, 
      createAccountingLine.accountingNumber, 
      createAccountingLine.date, 
      createAccountingLine.amount);
  }

  // Update an accounting Line by id
  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Update a specific accounting line'})
  @ApiResponse({ status: 400, description: 'The id is missing or not respect the number format'})
  update(@Param('id', ParseIntPipe) accountingLineId: number, @Body() values: Partial<AccountingLineDto>) : Promise<AccountingLineModel> {
    return this.accountingLineService.update(accountingLineId, values);
  }

  // Delete an accounting Line by Id
  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Delete a specific accounting line'})
  @ApiResponse({ status: 400, description: 'The id is missing or not respect the number format'})
  delete(@Param('id', ParseIntPipe) accountingLineId: number) : Promise<AccountingLineModel> {
    return this.accountingLineService.delete(accountingLineId);
  }
}
