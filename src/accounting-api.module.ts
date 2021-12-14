import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccountingLineTable, PopulateAccountingLineTable } from './migrations';
import { AccountingLineModel } from './models';
import { AccountingLineRepository } from './repositories';
import { AccountingLineController } from './controllers';
import { AccountingLineService } from './services';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '../data/accounting-database.sqlite'),
      migrations: [CreateAccountingLineTable, PopulateAccountingLineTable],
      migrationsRun: true,
      entities: [AccountingLineModel],
    }),
    TypeOrmModule.forFeature([AccountingLineRepository]),
  ],
  controllers: [AccountingLineController],
  providers: [AccountingLineService],
})
export class AccountingApiModule {
  static async bootstrap() {
    const app = await NestFactory.create(AccountingApiModule);

    //Initalize Swagger API Documentation
    const config = new DocumentBuilder()
      .setTitle('Technical Test fullstack API')
      .setDescription('Retrieves all endpoints API for accountingLines')
      .setVersion('1.0')
      .addTag('accountingLines')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    const port = 3000;
    await app.listen(port, () => {
      console.log(`Accounting API is listening on port ${port}`);
    });
  }
}
