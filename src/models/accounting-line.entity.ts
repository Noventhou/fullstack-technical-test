import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accountingLines')
export class AccountingLineModel {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('int')
  companyId!: number;

  @Column('int')
  accountingNumber!: number;

  @Column('date')
  date!: Date;

  @Column('int')
  amount!: number;
}
