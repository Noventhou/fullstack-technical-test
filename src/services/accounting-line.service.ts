import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountingLineRepository } from '../repositories';
import { AccountingLineDto } from '../dto';
import { AccountingLineModel } from '../models';

@Injectable()
export class AccountingLineService {
  constructor(private readonly accountingLineRepository: AccountingLineRepository) {}

  async findByDatesForClient(companyId: number, startDate: Date, endDate : Date) : Promise<object> {
    const accountingLines = await this.accountingLineRepository.findByDatesForClient(companyId, startDate, endDate);
    
    if (accountingLines.length == 0){
      throw new HttpException({
        status: HttpStatus.NO_CONTENT,
        error: `No result found for companyId : ${companyId} between ${startDate} and ${endDate}`,
      }, HttpStatus.NO_CONTENT);
    }

    const totalAmount = accountingLines.map(accountingLine => accountingLine.amount).reduce((acc, amount) => amount + acc);

    return {companyId, totalAmount};
  }

  async findByDates(startDate: Date, endDate : Date) : Promise<AccountingLineModel[]> {
    const accountingLines = await this.accountingLineRepository.findByDates(startDate, endDate);

    return accountingLines;
  }

  async findById(id: number) : Promise<AccountingLineModel> {
    const accountingLines = await this.accountingLineRepository.findById(id);

    return accountingLines;
  }

  async findAll() : Promise<AccountingLineModel[]> {
    const accountingLines = await this.accountingLineRepository.findAll();

    return accountingLines;
  }

  update(id: number, values: Partial<AccountingLineDto>) : Promise<AccountingLineModel> {
    return this.accountingLineRepository.patch(id, values);
  }

  create(companyId: number, accountingNumber: number, date: Date, amount: number) : Promise<AccountingLineModel> {
    return this.accountingLineRepository.post(companyId, accountingNumber, date, amount);
  }

  delete(id: number) : Promise<AccountingLineModel> {
    return this.accountingLineRepository.delete(id);
  }
}
