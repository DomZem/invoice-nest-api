import { PickType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceStatusDto extends PickType(CreateInvoiceDto, [
  'status',
] as const) {}
