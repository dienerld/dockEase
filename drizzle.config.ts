import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/database/schemas/*.schema.ts',
  driver: 'better-sqlite',
  out: './server/database/migrations',
  dbCredentials: {
    url: './sqlite.db',
  },
  verbose: true,
  strict: true,
});
