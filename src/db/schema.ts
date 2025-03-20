import { integer, pgTable, varchar, jsonb } from "drizzle-orm/pg-core";

export const gamesTable = pgTable("games_table", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(), 
    information: varchar({ length: 255 }).notNull(),
    data_game: jsonb().default({})
});

export const usersTable = pgTable("users_table", {
    mail: varchar({ length: 255 }).notNull().primaryKey(),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    country: varchar({ length: 255 }).notNull(),
    global_score: integer().default(0),
});