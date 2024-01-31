
# Invoice API

The Invoice API project provides a backend solution for managing invoices. It is designed for users who need a system to create, update, and track invoices for various clients. The API allows users to perform actions such as logging in, registering, creating invoices, updating invoice details, fetching invoice information, and more.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`: Specifies the port on which the project will run. Example: `8080` 

`DOMAIN`: Represents the domain associated with the project. Example: `localhost`

`CORS_ORIGIN`: Defines the allowed origins for Cross-Origin Resource Sharing. It should be the link to your client app. Example: `http://localhost:3000`

`JWT_SECRET_TOKEN`: Secret key used for signing JSON Web Tokens (JWT). Example: `JoY3tazD5jpm9nz2Mrs6fbbu48KRMmAd`

`JWT_EXPIRATION_SECRET`: Time duration for JWT expiration. Example an hour: `3600`

`POSTGRES_HOST`: Hostname or IP address of the PostgreSQL database. Example: `localhost`

`POSTGRES_PORT`: Port number for the PostgreSQL database. Example: `5434`

`POSTGRES_DB`: Name of the PostgreSQL database. Example: `invoice`

`POSTGRES_USER`: Username for connecting to the PostgreSQL database. Example: `prisma`

`POSTGRES_PASSWORD`: Password for the specified PostgreSQL user. Example: `xwAwsvmbCr9lCJD7`
## Run Locally
⚠️ Before that step make sure you setup all env variables. 

Clone the project

```bash
  git clone https://github.com/DomZem/invoice-nest-api.git
```

Go to the project directory

```bash
  cd invoice-nest-api
```

Install dependencies

```bash
  npm install
```

Create database by using Docker

```bash
  npm run db:dev:up
```

Apply migration and seed database

```bash
  npm run db:seed
```

Start the server

```bash
  npm run start:dev
```


## API Reference
The API supports various endpoints, including authentication (login, register, logout), invoice creation and management (create, update, get all, get unique, delete), and a "Me" endpoint to retrieve user information.

#### Login

```http
  POST /auth/login
```
⚠️ That action method requires to send body data. Example request:
```http
  POST /auth/login
```

```javascript
{
  "email": "anakin.skywalker@gmail.com",
  "password": "zaq1@WSX"
}
```

🚀 Example data response: 
```javascript
{
  "id": 1,
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "createdAt": "2024-01-30T17:30:57.324Z",
  "avatar": "https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
```

***

#### Register

```http
  POST /auth/register
```

⚠️ That action method requires to send body data. Example request:
```http
  POST /auth/register
```

```javascript
{
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "password": "zaq1@WSX",
  "confirmPassword": "zaq1@WSX",
  "avatar: "https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=600"
}
```

🚀 Example data response: 
```javascript
{
  "id": 5,
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "createdAt": "2024-01-31T13:00:31.738Z",
  "avatar": "https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=600"
}
```

***

#### Logout

```http
  GET /auth/logout
```

🚀 Example data response: 
```javascript
{
	"message": "Logged out"
}
```

***

#### Me

```http
  GET /auth/me
```
⚠️ You must be logged in to send this request. Example request:
```http
  GET /auth/me
```

🚀 Example data response: 
```javascript
{
  "id": 1,
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "createdAt": "2024-01-30T17:30:57.324Z",
  "avatar": "https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
```

***

#### Create invoice

```http
  POST /invoice
```
⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  POST /invoice
```

```javascript
{
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T13:33:03.969Z",
  "status": "PAID",
  "paymentTerm": "NET_7",
  "projectDescription": "lightsaber",
  "billFromAddress": {
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "E1 3EZ",
	  "country": "United Kingdom"
  },
  "billToAddress": {
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "ZU 7NW",
	  "country": "United Kingdom"
  },
  "items": [
	  {
		  "name": "Banner design 1",
		  "price": 20,
		  "quantity": 2
	  },
	  {
		  "name": "Banner design 2",
		  "price": 26,
		  "quantity": 2
	  },
	  {
		  "name": "Banner design 3",
		  "price": 25,
		  "quantity": 3
	  }
  ] 
}
```

🚀 Example data response: 
```javascript
{
  "id": 9,
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "PAID",
  "paymentTerm": "NET_7",
  "projectDescription": "lightsaber",
  "userId": 1,
  "billFromAddressId": 15,
  "billToAddressId": 16
}
```

***

#### Get all invoices

```http
  GET /invoice?page=${page}&size=${size}
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | **Optional**. Which page you want to get. Default: **1** |
| `size` | `string` | **Optional**. How many invoices per page. Default: **6** |


⚠️ You must be logged in to send this request. Example request:
```http
  GET /invoice?page=1&size=1
```

🚀 Example data response for: 

```javascript
{
  "data": [
	  {
		  "id": 3,
		  "mark": "WO2873",
		  "clientName": "Mathew Franey",
		  "clientEmail": "Mathew_Franey@gmail.com",
		  "date": "2024-11-07T00:00:00.000Z",
		  "status": "PENDING",
		  "paymentTerm": "NET_7",
		  "projectDescription": "ars suffoco clementia thalassinus arma succedo suggero",
		  "userId": 1,
		  "billFromAddressId": 6,
		  "billToAddressId": 5,
		  "billFromAddress": {
			  "id": 6,
			  "streetName": "8424 Towne Parkways",
			  "city": "The Woodlands",
			  "postCode": "748",
			  "country": "Dumfries and Galloway"
		  },
		  "billToAddress": {
			  "id": 5,
			  "streetName": "74558 Grace Bridge",
			  "city": "Concord",
			  "postCode": "222",
			  "country": "Warren County"
		  },
		  "items": [
			  {
				  "id": 9,
				  "name": "Salad",
				  "price": 309,
				  "quantity": 7,
				  "invoiceId": 3
			  },
			  {
				  "id": 10,
				  "name": "Car",
				  "price": 93,
				  "quantity": 17,
				  "invoiceId": 3
			  },
			  {
				  "id": 11,
				  "name": "Chips",
				  "price": 41,
				  "quantity": 20,
				  "invoiceId": 3
			  },
			  {
				  "id": 12,
				  "name": "Hat",
				  "price": 407,
				  "quantity": 15,
				  "invoiceId": 3
			  }
		  ]
	  }
  ],
  "meta": {
	  "total": 9,
	  "lastPage": 9,
	  "currentPage": 1,
	  "totalPerPage": 1,
	  "prevPage": null,
	  "nextPage": 2
  }
}
```

***

#### Get unique invoice

```http
  GET /invoice/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Invoice unique id |

⚠️ You must be logged in to send this request. Example request:


```http
  GET /invoice/9
```

🚀 Example data response: 
```javascript
{
  "id": 9,
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "PAID",
  "paymentTerm": "NET_7",
  "projectDescription": "lightsaber",
  "userId": 1,
  "billFromAddressId": 15,
  "billToAddressId": 16,
  "billFromAddress": {
	  "id": 15,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "E1 3EZ",
	  "country": "United Kingdom"
  },
  "billToAddress": {
	  "id": 16,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "ZU 7NW",
	  "country": "United Kingdom"
  },
  "items": [
	  {
		  "id": 32,
		  "name": "Banner design 1",
		  "price": 20,
		  "quantity": 2,
		  "invoiceId": 9
	  },
	  {
		  "id": 33,
		  "name": "Banner design 2",
		  "price": 26,
		  "quantity": 2,
		  "invoiceId": 9
	  },
	  {
		  "id": 34,
		  "name": "Banner design 3",
		  "price": 25,
		  "quantity": 3,
		  "invoiceId": 9
	  }
  ] 
}
```

***

#### Update invoice

```http
  PUT /invoice/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Invoice unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request: 
```http
  PUT /invoice/9
```

```javascript 
{
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "PAID",
  "paymentTerm": "NET_14",
  "projectDescription": "new lightsabers",
  "billFromAddress": {
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "E1 3EZ",
	  "country": "United Kingdom"
  },
  "billToAddress": {
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "ZU 7NW",
	  "country": "United Kingdom"
  },
  "items": [
	  {
		  "name": "Banner design 1",
		  "price": 199,
		  "quantity": 2
	  }
  ]
}
```

🚀 Example data response: 
```javascript
{
  "id": 9,
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "PAID",
  "paymentTerm": "NET_14",
  "projectDescription": "new lightsabers",
  "userId": 1,
  "billFromAddressId": 15,
  "billToAddressId": 16,
  "billFromAddress": {
	  "id": 15,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "E1 3EZ",
	  "country": "United Kingdom"
  },
  "billToAddress": {
	  "id": 16,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "ZU 7NW",
	  "country": "United Kingdom"
  },
  "items": [
	  {
		  "id": 43,
		  "name": "Banner design 1",
		  "price": 199,
		  "quantity": 2,
		  "invoiceId": 9
	  }
  ]
}
```

***

#### Update invoice status

```http
  PATCH /invoice/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Invoice unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  PATCH /invoice/9
```

```javascript
{
  "status": "DRAFT"
}
```

🚀 Example data response: 
```javascript
{
  "id": 9,
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "DRAFT",
  "paymentTerm": "NET_7",
  "projectDescription": "lightsabe",
  "userId": 1,
  "billFromAddressId": 15,
  "billToAddressId": 16,
  "billFromAddress": {
	  "id": 15,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "E1 3EZ",
	  "country": "United Kingdom"
  },
  "billToAddress": {
	  "id": 16,
	  "streetName": "19 Union Terrace",
	  "city": "London",
	  "postCode": "ZU 7NW",
	  "country": "United Kingdom"
  },
  "items": [
	  {
		  "id": 32,
		  "name": "Banner design 1",
		  "price": 20,
		  "quantity": 2,
		  "invoiceId": 9
	  },
	  {
		  "id": 33,
		  "name": "Banner design 2",
		  "price": 26,
		  "quantity": 2,
		  "invoiceId": 9
	  },
	  {
		  "id": 34,
		  "name": "Banner design 3",
		  "price": 25,
		  "quantity": 3,
		  "invoiceId": 9
	  }
  ]
}
```

***

#### Delete invoice

```http
  DELETE /invoice/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Invoice unique id |

⚠️ You must be logged in to send this request. Example request:
```http 
  DELETE /invoice/9
```

🚀 Example data response for:  
```javascript
{
  "id": 9,
  "mark": "XJ6516",
  "clientName": "Ahsoka",
  "clientEmail": "ahsoka.tano@gmail.com",
  "date": "2019-07-04T00:00:00.000Z",
  "status": "PENDING",
  "paymentTerm": "NET_7",
  "projectDescription": "lightsaber",
  "userId": 1,
  "billFromAddressId": 15,
  "billToAddressId": 16
}
```
## Tech Stack

- ![Static Badge](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

