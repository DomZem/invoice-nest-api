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

export class UpdateInvoiceDto {
  @IsNumber()
  id: number;

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

  @ValidateNested()
  billFromAddress: UpdateAddressDto;

  @ValidateNested()
  billToAddress: UpdateAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: UpdateItemDto[];
}

export class UpdateAddressDto {
  @IsNumber()
  id: number;

  @IsString()
  streetName: string;

  @IsString()
  city: string;

  @IsString()
  postCode: string;

  @IsString()
  country: string;
}

export class UpdateItemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
