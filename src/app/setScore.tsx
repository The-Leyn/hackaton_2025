"use server";
import "dotenv/config";
import { updateGlobalScore } from "@/db/services/users";

export async function setUserScore(score: number, userEmail: string) {
  updateGlobalScore(userEmail, score);
}
