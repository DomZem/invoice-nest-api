import { PickType } from '@nestjs/mapped-types';
import { UpdateInvoiceDto } from './update-invoice.dto';

export class UpdateInvoiceStatusDto extends PickType(UpdateInvoiceDto, [
  'status',
] as const) {}
