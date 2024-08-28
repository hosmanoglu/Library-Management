# Library Management Application

A simple library management application that helps manage members and the borrowing of books by members. 

## Features

- **Manage Users:**
  - List all users
  - Access detailed information about a user (name, previously borrowed books with ratings, and currently borrowed books)
  - Create a new user

- **Manage Books:**
  - List all books
  - Access detailed information about a book (title, average rating)
  - Create a new book

- **Borrowing System:**
  - Borrow a book
  - Return a book and give a rating

## Requirements

Make sure the following are installed before running the application:

- **Node.js** `^20.10.0`
- **npm**  `^10.2.3`
- **Docker** (for database deployment, you can also use another PostgreSQL instance. Just ensure the `.env` file is filled with the correct information.)

### Setting Up the Project

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Run PostgreSQL with Docker:**

    ```bash
    docker run --name my-postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -d postgres
    ```

3. **Run database migrations:**

    ```bash
    npx sequelize-cli db:migrate
    ```

4. **Start the application:**

    ```bash
    npm run start
    ```

## Testing

To test the API using Postman:

1. Navigate to the `collection` folder in the project directory.
2. Open the `testCollection` file.
3. Make sure the correct Postman environment is selected for successful testing.
