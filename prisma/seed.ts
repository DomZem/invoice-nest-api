import { INVOICE_STATUS, PAYMENT_TERM, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
    const password = await argon.hash('zaq1@WSX');

    //action
    const user = await prisma.user.upsert({
        where: { email: 'anakin.skywalker@gmail.com' },
        update: {},
        create: {
            email: 'anakin.skywalker@gmail.com',
            firstName: 'Anakin',
            lastName: 'Skywalker',
            password,
            avatar:
                'https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    });

    const terms: PAYMENT_TERM[] = ['NET_1', 'NET_7', 'NET_14', 'NET_30'];

    const statuses: INVOICE_STATUS[] = ['DRAFT', 'PENDING', 'PAID'];

    for (let i = 0; i < 7; i++) {
        const [clientFirstName, clientLastName] = faker.person
            .fullName()
            .split(' ');

        const markPrefix = faker.string.alpha({ length: 2, casing: 'upper' })

        const mark = `${markPrefix}${faker.number.int({ min: 1001, max: 9999 })}`;

        const { id } = await prisma.invoice.upsert({
            where: {
                mark,
            },
            update: {},
            create: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                mark,
                clientName: `${clientFirstName} ${clientLastName}`,
                clientEmail: faker.internet.email({
                    firstName: clientFirstName,
                    lastName: clientLastName,
                }),
                projectDescription: faker.lorem.words(7),
                paymentTerm: terms[faker.number.int({ min: 0, max: terms.length - 1 })],
                status:
                    statuses[faker.number.int({ min: 0, max: statuses.length - 1 })],
                date: faker.date.anytime(),
                billFromAddress: {
                    create: {
                        streetName: faker.location.streetAddress(false),
                        city: faker.location.city(),
                        postCode: faker.location.countryCode('numeric'),
                        country: faker.location.county(),
                    },
                },
                billToAddress: {
                    create: {
                        streetName: faker.location.streetAddress(false),
                        city: faker.location.city(),
                        postCode: faker.location.countryCode('numeric'),
                        country: faker.location.county(),
                    },
                },
            },
        });

        for (let i = 0; i < 4; i++) {
            await prisma.item.create({
                data: {
                    name: faker.commerce.product(),
                    price: parseFloat(faker.commerce.price({ min: 0.01, max: 500 })),
                    quantity: faker.number.int({ min: 1, max: 20 }),
                    invoiceId: id,
                },
            });
        }
    }

    // action
    console.log('Database has been seeded. 🌱');
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
