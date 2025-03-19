import { db } from '../lib/db';
import { gamesTable } from '../schema';
import { eq } from 'drizzle-orm';

export async function getAllGames() {
  return await db.select().from(gamesTable);
}

export async function getGameById(id: number) {
  return await db.select().from(gamesTable).where(eq(gamesTable.id, id));
}

export async function createGame(gameData: typeof gamesTable.$inferInsert) {
  return await db.insert(gamesTable).values(gameData).returning();
}

export async function updateGame(id: number, gameData: Partial<typeof gamesTable.$inferInsert>) {
  return await db.update(gamesTable)
    .set(gameData)
    .where(eq(gamesTable.id, id))
    .returning();
}

export async function deleteGame(id: number) {
  return await db.delete(gamesTable).where(eq(gamesTable.id, id));
}