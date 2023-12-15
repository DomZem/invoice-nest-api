import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DatabaseService } from '../database/database.service';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { Prisma } from '@prisma/client';
import { CreateUpdateInvoiceDto } from './dto/create-update-invoice.dto';

@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post()
  async create(
    @Req() req,
    @Body()
    {
      mark,
      clientName,
      clientEmail,
      date,
      status,
      paymentTerm,
      projectDescription,
      billFromAddress,
      billToAddress,
      items,
    }: CreateUpdateInvoiceDto,
  ) {
    const searchBillFromAddress =
      await this.createOrReturnAddress(billFromAddress);
    const searchBillToAddress = await this.createOrReturnAddress(billToAddress);

    return this.invoiceService.create({
      mark,
      clientName,
      clientEmail,
      date,
      status,
      paymentTerm,
      projectDescription,
      billFromAddress: {
        connect: {
          id: searchBillFromAddress.id,
        },
      },
      billToAddress: {
        connect: {
          id: searchBillToAddress.id,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
      items: {
        createMany: {
          data: items,
        },
      },
    });
  }

  @Get()
  findMany(@Req() req) {
    return this.invoiceService.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        billFromAddress: true,
        billToAddress: true,
        items: true,
      },
    });
  }

  @Get(':id')
  async findUnique(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const invoice = await this.invoiceService.findUnique(
      { id },
      {
        billFromAddress: true,
        billToAddress: true,
        items: true,
      },
    );

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.userId !== req.user.id) {
      throw new ForbiddenException('You are not allowed to read this invoice');
    }

    return invoice;
  }

  @Put(':id')
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceDto: CreateUpdateInvoiceDto,
  ) {
    const invoiceToUpdate = await this.invoiceService.findUnique({ id });

    if (!invoiceToUpdate) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoiceToUpdate.userId !== req.user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this invoice',
      );
    }

    const searchBillFromAddress = await this.createOrReturnAddress(
      updateInvoiceDto.billFromAddress,
    );

    const searchBillToAddress = await this.createOrReturnAddress(
      updateInvoiceDto.billToAddress,
    );

    // Delete all items related with invoice
    await this.databaseService.item.deleteMany({
      where: {
        invoiceId: id,
      },
    });

    return this.invoiceService.update({
      data: {
        ...updateInvoiceDto,
        billFromAddress: {
          connect: {
            id: searchBillFromAddress.id,
          },
        },
        billToAddress: {
          connect: {
            id: searchBillToAddress.id,
          },
        },
        items: {
          createMany: {
            data: updateInvoiceDto.items,
          },
        },
      },
      where: {
        id,
      },
      include: {
        billFromAddress: true,
        billToAddress: true,
        items: true,
      },
    });
  }

  @Patch(':id')
  async updateStatus(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() { status }: UpdateInvoiceStatusDto,
  ) {
    const invoiceToUpdate = await this.invoiceService.findUnique({ id });

    if (!invoiceToUpdate) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoiceToUpdate.userId !== req.user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this invoice',
      );
    }

    return this.invoiceService.update({
      data: {
        status,
      },
      where: {
        id,
      },
      include: {
        billFromAddress: true,
        billToAddress: true,
        items: true,
      },
    });
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const invoiceToRemove = await this.invoiceService.findUnique({ id });

    if (!invoiceToRemove) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoiceToRemove.userId !== req.user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this invoice',
      );
    }

    return this.invoiceService.delete(invoiceToRemove);
  }

  private async createOrReturnAddress(address: Prisma.AddressCreateInput) {
    let searchedAddress = await this.databaseService.address.findFirst({
      where: {
        streetName: address.streetName,
        city: address.city,
        postCode: address.postCode,
        country: address.country,
      },
    });

    if (!searchedAddress) {
      searchedAddress = await this.databaseService.address.create({
        data: address,
      });
    }

    return searchedAddress;
  }
}
