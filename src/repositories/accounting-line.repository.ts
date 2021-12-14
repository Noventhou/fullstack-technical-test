import { EntityRepository, Repository, MoreThan, LessThan, Between } from 'typeorm';
import { AccountingLineModel } from '../models';
import { AccountingLineDto } from '../dto';

@EntityRepository(AccountingLineModel)
export class AccountingLineRepository extends Repository<any> {
  
  async findByDatesForClient(companyId: number, startDate: Date, endDate: Date) {
    return this.find({
      where: {
        date: Between(startDate, endDate),
        companyId : companyId,
      },
  });
  }

  async findByDates(startDate: Date, endDate: Date) : Promise<AccountingLineModel[]> {
    return this.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  async findById(id: number) : Promise<AccountingLineModel> {
    return this.findOne(id);
  }
  
  async findAll() : Promise<AccountingLineModel[]> {
    return this.find();
  }

  async patch(id: number, accountingLines: Partial<AccountingLineDto>) : Promise<AccountingLineModel> {
    return this.save({
      id: id,
      ...accountingLines,
    });
  }

  async post(companyId: number, accountingNumber: number, date: Date, amount: number) : Promise<AccountingLineModel> {
    return await this.save({
      companyId, 
      accountingNumber,
      date,
      amount,
    });
  }

  async delete(id: number) {
    return this.remove({
      id: id,
    });
  }
}
