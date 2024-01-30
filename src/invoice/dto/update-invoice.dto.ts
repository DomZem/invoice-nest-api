import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { INVOICE_STATUS, PAYMENT_TERM } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateUpdateAddressDto {
  @IsString()
  streetName: string;

  @IsString()
  city: string;

  @IsString()
  postCode: string;

  @IsString()
  country: string;
}

export class CreateUpdateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

export class UpdateInvoiceDto {
  @IsString()
  mark: string;

  @IsString()
  clientName: string;

  @IsEmail()
  clientEmail: string;

  @IsDateString()
  date: Date;

  @IsEnum(INVOICE_STATUS)
  status: INVOICE_STATUS;

  @IsEnum(PAYMENT_TERM)
  paymentTerm: PAYMENT_TERM;

  @IsString()
  projectDescription: string;

  @ValidateNested({ each: true })
  @Type(() => CreateUpdateAddressDto)
  billFromAddress: CreateUpdateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreateUpdateAddressDto)
  billToAddress: CreateUpdateAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateUpdateItemDto)
  items: CreateUpdateItemDto[];
}
