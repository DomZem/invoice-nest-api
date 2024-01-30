import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { DatabaseService } from '../database/database.service';
import { InvoiceController } from './invoice.controller';

@Module({
  providers: [InvoiceService, DatabaseService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
