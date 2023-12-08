import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [InvoiceService, DatabaseService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
