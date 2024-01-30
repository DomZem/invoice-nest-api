import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Invoice, Prisma } from '@prisma/client';
import { generateRandomString } from '../common/utility/generateRandomString.utility';

@Injectable()
export class InvoiceService {
  constructor(private databaseService: DatabaseService) {}

  async findUnique(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput,
    invoiceInclude?: Prisma.InvoiceInclude,
  ): Promise<Invoice | null> {
    return this.databaseService.invoice.findUnique({
      where: invoiceWhereUniqueInput,
      include: invoiceInclude,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    include?: Prisma.InvoiceInclude;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    const { skip, take, cursor, where, include, orderBy } = params;
    return this.databaseService.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
  }

  async create(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.databaseService.invoice.create({ data });
  }

  async update(params: {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.InvoiceUpdateInput;
    include?: Prisma.InvoiceInclude;
  }): Promise<Invoice> {
    const { where, data, include } = params;
    return this.databaseService.invoice.update({
      data,
      where,
      include,
    });
  }

  async delete(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.databaseService.invoice.delete({
      where,
    });
  }

  async count(userId: number): Promise<number> {
    return this.databaseService.invoice.count({
      where: {
        userId,
      },
    });
  }

  async generateMark(): Promise<string> {
    const mark = generateRandomString();

    const isExist = await this.databaseService.invoice.findUnique({
      where: {
        mark,
      },
    });

    if (isExist) {
      await this.generateMark();
    }

    return mark;
  }

  async createOrReturnAddress(address: Prisma.AddressCreateInput) {
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
