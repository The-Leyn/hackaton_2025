import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

// fonction de fermeture (pas obligatoire)
export const closeConnection = async () => {
  await client.end();
};