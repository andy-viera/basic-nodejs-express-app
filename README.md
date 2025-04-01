# Basic Node.js Express App

A minimalist Express.js application with TypeScript and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Pnpm
- Docker

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd basic-nodejs-express-app
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

To run the tests:

```bash
pnpm run test
```

This will run the tests using Jest and display the results.
