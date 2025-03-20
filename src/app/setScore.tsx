'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/db/schema';
import { updateGlobalScore } from '@/db/services/users';
import { currentUser } from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';
const db = drizzle(process.env.DATABASE_URL!);


// const user = getAuth();
// const user = await currentUser();
// const userEmail = user?.emailAddresses[0].emailAddress

export async function setUserScore(score: number, userEmail: string) {
  // if (userEmail) {
    updateGlobalScore(userEmail, score)
    
  // }
 
}