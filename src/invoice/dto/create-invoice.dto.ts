import { OmitType } from '@nestjs/mapped-types';
import { UpdateInvoiceDto } from './update-invoice.dto';

export class CreateInvoiceDto extends OmitType(UpdateInvoiceDto, [
  'mark',
] as const) {}
