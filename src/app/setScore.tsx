"use server";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { updateGlobalScore } from "@/db/services/users";
const db = drizzle(process.env.DATABASE_URL!);

export async function setUserScore(score: number, userEmail: string) {
  updateGlobalScore(userEmail, score);
}
