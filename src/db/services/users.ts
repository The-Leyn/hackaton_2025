import { db } from '../lib/db';
import { usersTable } from '../schema';
import { eq, sql, desc } from 'drizzle-orm';

export async function createUser(userData: typeof usersTable.$inferInsert) {
  return await db.insert(usersTable).values(userData).returning();
}

export async function getTopScores(limit: number) {
  return await db.select()
    .from(usersTable)
    .orderBy(desc(usersTable.global_score))
    .limit(limit);
}

export async function updateGlobalScore(mail: string, score: number) {
  return await db
    .update(usersTable)
    .set({ global_score: sql`${usersTable.global_score} + ${score}` })
    .where(eq(usersTable.mail, mail))
}

export async function getUserByMail(mail: string) {
  const users = await db.select().from(usersTable).where(eq(usersTable.mail, mail));
  return users[0] || null;
}

export async function removeAllGlobalScore() {
    return await db.update(usersTable).set({ global_score: 0 });
}

export async function getUserRankByMail(mail: string): Promise<number> {
  const result = (await db.execute(
    sql`
      SELECT rank FROM (
        SELECT mail, RANK() OVER (ORDER BY global_score DESC) as rank
        FROM ${usersTable}
      ) ranked_users
      WHERE mail = ${mail}
    `
  )) as any[]; 

  return Number(result[0]?.rank) || 0;
}
    