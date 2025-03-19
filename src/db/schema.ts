import { integer, pgTable, varchar, jsonb } from "drizzle-orm/pg-core";
import { json } from "stream/consumers";

export const gamesTable = pgTable("games_table", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
    information: varchar({ length: 255 }).notNull(),
    data_game: jsonb().default({})
});

export const usersTable = pgTable("users_table", {
    mail: varchar({ length: 255 }).notNull().primaryKey(),
    country: varchar({ length: 255 }).notNull(),
    global_score: integer().default(0),
});