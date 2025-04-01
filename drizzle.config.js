import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_WlFeb5Z8KhqA@ep-floral-forest-a87elvvh-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
