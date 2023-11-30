# Dicoding Jobs

This project is used as a Technical Exercise Product Engineer at Dicoding.

## Local development setup

Node.js `>= 18.x` is required and setup with [pnpm](https://pnpm.io/) is recommended.

1. Install all dependencies

   ```sh
   pnpm install
   ```

2. Create `.env` file from [`.env.sample`](./.env.sample)

   There is two `DATABASE_URL`, the first one is for running the app in development / production mode and the other one is for running the test. So, make sure you set the correct database before run the server / test.

3. Run database migration

   ```sh
   pnpm prisma:migrate:dev
   ```

4. Run database seeder

   ```sh
   pnpm prisma:seed
   ```

5. Run local development server

   ```sh
   pnpm dev
   ```

### Testing

This project is using [Playwright](https://playwright.dev/) for the test. If you want to run the test, make sure to use database with empty data and set to `.env` file.

- Run end to end test

  ```sh
  pnpm test:e2e
  ```

- Run with debug mode

  ```sh
  pnpm test:e2e:debug
  ```

- Run with UI mode

  ```sh
  pnpm test:e2e:ui
  ```

#### Playwright command

- Run codegen

  ```sh
  pnpm playwright:codegen
  ```

- Show report

  ```sh
  pnpm playwright:report
  ```

## Requirements

- [x] Create vacancy
- [x] Show list of vacancies
- [x] Update vacancy
- [x] Delete vacancy
- [x] Show detail of vacancy
- [x] Search vacancies
- [x] End to end test using playwright
