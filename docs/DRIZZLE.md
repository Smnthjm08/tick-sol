

# Drizzle Kit Quick Reference (Execution Order)


## 1. Generate migration files from your Drizzle schema
```bash
pnpm drizzle-kit generate
```

## 2. Check migrations for collisions or race conditions

```bash
pnpm drizzle-kit check
```

## 3. Apply generated migrations to your database

```bash
pnpm drizzle-kit migrate
```

## 4. Push Drizzle schema changes to the database

```bash
pnpm drizzle-kit push
```

## 5. Introspect existing database and convert to Drizzle schema

```bash
pnpm drizzle-kit pull
```

## 6. Upgrade snapshots of previously generated migrations

```bash
pnpm drizzle-kit up
```

## 7. Launch Drizzle Studio for browsing the database

```bash
pnpm drizzle-kit studio
```

