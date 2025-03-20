import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { gamesTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const game: typeof gamesTable.$inferInsert = {
    name: 'QCM primary',
    type: 'QCM',
    category: 'General',
    information: 'you must correctly answer the questions in this game !',
  };

  await db.insert(gamesTable).values(game);
  console.log('New game created!')

  // SELECT * FROM gamesTable
  const games = await db.select().from(gamesTable);
  console.log('Getting all games from the database: ', games)
  /*
  const games: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(gamesTable)
    .set({
      name: "QCM secondary",
    })
    // WHERE gamesTable.name = 'QCM primary'
    .where(eq(gamesTable.name, "QCM primary"));
  console.log('game info updated!')

  await db.delete(gamesTable).where(eq(gamesTable.name, "QCM secondary"));
  console.log('game deleted!')
}

main();