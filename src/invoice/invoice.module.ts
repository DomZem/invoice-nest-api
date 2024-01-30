import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [InvoiceService, DatabaseService],
})
export class InvoiceModule {}
