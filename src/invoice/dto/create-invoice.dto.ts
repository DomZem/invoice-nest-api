import { OmitType, PickType } from '@nestjs/mapped-types';
import {
  UpdateAddressDto,
  UpdateInvoiceDto,
  UpdateItemDto,
} from './update-invoice.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAddressDto extends OmitType(UpdateAddressDto, [] as const) {}

class CreateItemDto extends OmitType(UpdateItemDto, ['id'] as const) {}

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
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  billFromAddress: CreateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  billToAddress: CreateAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}
