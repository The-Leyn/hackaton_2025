import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const gamesTable = sqliteTable("games_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    type: text().notNull(),
    information: text().notNull(),
  });