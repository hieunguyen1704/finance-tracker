# Finance Tracker API

======================

## Overview

The Finance Tracker API is a RESTful API designed to manage personal finances. It provides endpoints for creating, reading, updating, and deleting (CRUD) financial data, including budgets, transactions.

## Features

- User authentication and authorization using JSON Web Tokens (JWT)
- Budget management:
  - Create, update, and delete budgets and get all budgets with filters.
- Transaction management:
  - Create, update, and delete transactions, get all transactions with filters
- Category management:
  - Get all categories
- Email notifications for user registration

## API Endpoints

### Authentication

- `POST /api/auth/login`: Login with email and password
- `POST /api/auth/register`: Register a new user
- `GET /api/auth/confirm-email`: Confirm registered email of user

### Budgets

- `GET /api/budget`: Get all budgets
- `POST /api/budget`: Create a new budget
- `PUT /api/budget/:id`: Update a budget
- `DELETE /api/budget/:id`: Delete a budget

### Transactions

- `GET /api/transaction`: Get all transactions
- `POST /api/transaction`: Create a new transaction
- `PUT /api/transaction/:id`: Update a transaction
- `DELETE /api/transaction/:id`: Delete a transaction
- `GET /api/transaction/metrics`: Get transaction's metrics
- `GET /api/transaction/spending-trend`: Get spending trend data

### Categories

- `GET /api/categories`: Get all categories

## Environment Variables

- `DATABASE_URL`: Database's URL
- `POSTGRES_USER`: Database's user
- `POSTGRES_PASSWORD`: Database's password
- `POSTGRES_DB`: Database's name
- `JWT_SECRET`: Secret key for JWT token generation
- `MAILTRAP_USER`: Mailtrap username for email notifications
- `MAILTRAP_PASSWORD`: Mailtrap password for email notifications
- `MAILTRAP_HOST`: Mailtrap host for email notifications
- `MAILTRAP_PORT`: Mailtrap port for email notifications
- `EMAIL_FROM`: Sender's email
- `APP_URL`: URL of the application
- `RABBITMQ_URL`: URL of RabbitMQ

## Tech Stack

- Backend Framework: Express.js
- Type Checker: TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Message Broker: RabbitMQ
- Authentication: JSON Web Tokens (JWT)
- Email Service: Mailtrap
- Containerization: Docker
- Package Manager: npm

## Prerequisites

- Node.js (>= 14.17.0)
- TypeScript (>= 4.3.5)
- Prisma (>= 3.14.0)
- PostgreSQL (>= 13.4)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/finance-tracker-api.git`
2. Run `make bootstrap` to bootstrap the project (install dependencies, build, generate Prisma client)
3. Create a `.env` file with the required environment variables
4. Run `make up` to start the application
5. In the first time, run `make seed-category` to seed category data

## Contributing

Contributions are welcome! Please submit a pull request with a clear description of the changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
