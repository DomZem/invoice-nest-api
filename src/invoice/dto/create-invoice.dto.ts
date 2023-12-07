import { OmitType, PickType } from '@nestjs/mapped-types';
import {
  UpdateAddressDto,
  UpdateInvoiceDto,
  UpdateItemDto,
} from './update-invoice.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class CreateInvoiceDto extends PickType(UpdateInvoiceDto, [
  'mark',
  'clientName',
  'clientEmail',
  'date',
  'status',
  'status',
  'paymentTerm',
  'projectDescription',
] as const) {
  @ValidateNested()
  billFromAddress: CreateAddressDto;

  @ValidateNested()
  billToAddress: CreateAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: CreateItemDto[];
}

class CreateAddressDto extends OmitType(UpdateAddressDto, ['id'] as const) {}

class CreateItemDto extends OmitType(UpdateItemDto, ['id'] as const) {}
