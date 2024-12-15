# Finance Tracker

#### Video Demo: https://youtu.be/SgKoUYk5XNo

#### Description:

Finance Tracker is a comprehensive personal finance management system designed to empower users in effectively managing their financial activities. This system is built to cater to individuals looking for a robust tool to track income, manage expenses, and maintain budgets. With its user-friendly interface and a powerful backend, the Finance Tracker ensures seamless financial management and transparency.

#### Features:

- **User Authentication:** Provides secure authentication and authorization mechanisms using JSON Web Tokens (JWT). Ensures user data privacy and secure access to the system.
- **Budgeting:** Enables users to create, update, and delete budgets. Users can also monitor expenses against set budgets, making it easier to avoid overspending.
- **Transaction Management:** Allows users to record and manage their income and expenses. Each transaction can be categorized for better tracking and analysis.
- **Expense Tracking:** Facilitates detailed tracking of expenses by categories, date ranges, or other customizable criteria.
- **Data Visualization:** Offers a variety of charts and graphs to help users understand their financial data. This feature supports informed decision-making by identifying trends and progress.
- **Email Notifications:** Provides email notifications for user registration, enhancing the onboarding experience.

#### API Endpoints:

##### Authentication:

- `POST /api/auth/login`: Authenticate a user with email and password.
- `POST /api/auth/register`: Register a new user.
- `GET /api/auth/confirm-email`: Confirm a user’s email address to complete the registration process.

##### Budgets:

- `GET /api/budget`: Retrieve all budgets.
- `POST /api/budget`: Create a new budget.
- `PUT /api/budget/:id`: Update an existing budget.
- `DELETE /api/budget/:id`: Delete a budget.

##### Transactions:

- `GET /api/transaction`: Retrieve all transactions.
- `POST /api/transaction`: Create a new transaction.
- `PUT /api/transaction/:id`: Update an existing transaction.
- `DELETE /api/transaction/:id`: Delete a transaction.
- `GET /api/transaction/metrics`: Retrieve transaction metrics for insights.
- `GET /api/transaction/spending-trend`: Retrieve data on spending trends.

##### Categories:

- `GET /api/categories`: Retrieve a list of all available categories.

##### Environment Variables:

The application requires several environment variables for proper configuration:

- `DATABASE_URL`: The database connection URL.
- `POSTGRES_USER`: Username for the database.
- `POSTGRES_PASSWORD`: Password for the database user.
- `POSTGRES_DB`: The name of the database.
- `JWT_SECRET`: Secret key used for generating JWT tokens.
- `MAILTRAP_USER`: Username for Mailtrap, used for email notifications.
- `MAILTRAP_PASSWORD`: Password for Mailtrap authentication.
- `MAILTRAP_HOST`: Host for Mailtrap services.
- `MAILTRAP_PORT`: Port for Mailtrap services.
- `EMAIL_FROM`: Sender’s email address.
- `APP_URL`: Base URL of the application.
- `RABBITMQ_URL`: RabbitMQ server connection URL.

#### Tech Stack for Backend:

The backend of the Finance Tracker is developed using:

- **Backend Framework:** Express.js – A minimal and flexible Node.js web application framework.
- **Language:** TypeScript – Ensures type safety and improved developer experience.
- **Database:** PostgreSQL – A powerful, open-source relational database.
- **ORM:** Prisma – Simplifies database management and migrations.
- **Message Broker:** RabbitMQ – Handles heavy asynchronous tasks like email notifications.
- **Authentication:** JSON Web Tokens (JWT) – Secures API endpoints.
- **Email Service:** Mailtrap – Manages email sending during development.
- **Containerization:** Docker – Ensures consistency across development and production environments.
- **Package Manager:** npm – Manages dependencies and scripts.

#### Tech Stack for Frontend:

The frontend is built using modern tools and libraries:

- **Build Tool:** Vite – Ensures fast development builds and optimized production outputs.
- **Language:** TypeScript – Provides type definitions for enhanced code quality.
- **JavaScript Library:** React – Creates dynamic and responsive user interfaces.
- **UI Library:** shadcn-ui – Simplifies UI component styling and customization.
- **CSS:** Tailwind CSS – Enables utility-first styling for rapid UI development.
- **Server State Management:** React-query – Simplifies data fetching and state synchronization with the server.

#### Prerequisites:

Before setting up the application, ensure the following tools are installed:

- Node.js (>= 14.17.0)
- TypeScript (>= 4.3.5)
- Prisma (>= 3.14.0)
- PostgreSQL (>= 13.4)

#### Getting Started with Backend:

To set up the backend:

1. Navigate to the backend directory.
2. Run `make bootstrap` to initialize the project, including installing dependencies, building the project, and generating the Prisma client.
3. Create a `.env` file and populate it with the required environment variables.
4. Run `make up` to start the backend application.
5. For initial setup, execute `make seed-category` to populate the database with default categories.

#### Getting Started with Frontend:

To set up the frontend:

1. Navigate to the frontend directory.
2. Copy `.env.example` to `.env`.
3. Update the values in the `.env` file based on your configuration.
4. Install the necessary dependencies by running:
   ```sh
   npm i
   ```
5. Start the development server for an instant preview:
   ```sh
   npm run dev
   ```

#### Future Enhancements:

The Finance Tracker has a solid foundation, but there are numerous features that can be added to improve functionality and user experience:

- **Recurring Transactions:** Allow users to set up recurring income or expense entries for better automation of financial tracking.
- **Savings Goals:** Enable users to set and track savings goals over time, integrating them with budgeting and expense tracking features.
- **Financial Forecasting:** Provide predictive analytics and suggestions based on past financial data.
- **Advanced Notifications:** Add customizable alerts for low budget limits, upcoming bills, or unusual spending patterns.
- **Integration with Bank APIs:** Automate transaction imports directly from bank accounts using secure APIs.
- **Export and Reporting:** Allow users to export data to formats like CSV or PDF for tax filing or detailed analysis.
- **Dark Mode:** Provide a dark theme option for improved accessibility and user comfort during nighttime use.

#### Contributing:

We welcome contributions from the community! If you wish to contribute, please fork the repository, make your changes, and submit a pull request. Ensure your pull request includes a clear description of the changes and why they are necessary. Following best coding practices and adhering to the project’s coding style is encouraged.

#### License:

This project is licensed under the MIT License. Refer to the LICENSE file for more details.

---

Finance Tracker is designed with simplicity and functionality in mind, enabling users to take control of their financial goals. The system’s scalability and modern architecture ensure that it can grow with users’ needs. From budgeting to detailed expense tracking, Finance Tracker provides a seamless experience, making personal finance management accessible to all. Start using Finance Tracker today and take the first step toward financial freedom!
