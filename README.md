# Node rate limiter

Custom node api request limiter with redis

## Installation

Install dependencies with npm

```bash
  npm install
```

## Init database

Craete database (Postgres)

```bash
  npm run db:create
```

Run migrations

```bash
  npm run db:migrate
```

Seed data

```bash
  npm run db:seed
```

## Run the application

To run tests, run the following command

```bash
  npm run start:dev
```

## API Reference

#### Get all items

```http
  GET /blog
```
