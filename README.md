# Node.js & Express App

A minimalist Node.js & Express.js application with TypeScript, PostgreSQL as main database, and Redis for rate limiting. With CRUD operations for authors, categories, and books, following a basic RESTful API design.

## Prerequisites

- Node.js (v14 or higher)
- Pnpm
- Docker

## Setup

1. Clone the repository:

```bash
git clone https://github.com/andy-viera/nodejs-express-app.git
cd nodejs-express-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Create the PostgreSQL database:

```bash
docker compose up -d
```

4. Create a `.env` file in the root directory with the variables from the `.env.example` file.

5. Start the development server:

```bash
pnpm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Testing

To run the tests, use the following command:

```bash
pnpm test
```
