import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { gamesTable } from './db/schema';
  
const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  const game: typeof gamesTable.$inferInsert = {
    name: 'QCM of europe',
    type: 'QCM',
    information: 'global QCM',
  };

  await db.insert(gamesTable).values(game);
  console.log('New game created!')

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
      type: "find Words",
    })
    .where(eq(gamesTable.name, game.type));
  console.log('game info updated!')

  await db.delete(gamesTable).where(eq(gamesTable.name, game.type));
  console.log('game deleted!')
}

main();
