import { PickType } from '@nestjs/mapped-types';
import { CreateUpdateInvoiceDto } from './create-update-invoice.dto';

export class UpdateInvoiceStatusDto extends PickType(CreateUpdateInvoiceDto, [
  'status',
] as const) {}
