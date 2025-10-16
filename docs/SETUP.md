# Development Setup

1. Clone the repo
   git clone <https://github.com/Smnthjm08/tick-sol.git>
   cd tick-sol

2. Copy .env.example to .env in the required folders

## For web app

cp apps/web/.env.example apps/web/.env

## For database package

cp packages/db/.env.example packages/db/.env

3.Install dependencies at the root
pnpm i

4.Run the development environment
pnpm run dev

This will start your project with both apps/web and packages/db configured with their environment variables.
