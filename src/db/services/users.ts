import { db } from '../lib/db';
import { usersTable } from '../schema';
import { eq, sql } from 'drizzle-orm';

export async function createUser(userData: typeof usersTable.$inferInsert) {
  return await db.insert(usersTable).values(userData).returning();
}

export async function updateGlobalScore(mail: string, score: number) {
  return await db
    .update(usersTable)
    .set({ global_score: sql`${usersTable.global_score} + ${score}` })
    .where(eq(usersTable.mail, mail))
};

export async function getUserByMail(mail: string) {
  return await db.select().from(usersTable).where(eq(usersTable.mail, mail));
}

export async function removeAllGlobalScore() {
    return await db.update(usersTable).set({ global_score: 0 });
}
    