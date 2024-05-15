import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  name: text("name").primaryKey().notNull().unique(),
});

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  url: text("url"),
  name: text("name").notNull().unique(),
  description: text("description").default("No description"),
  quantity: integer("quantity").notNull(),
  category: text("category")
    .notNull()
    .references(() => categories.name, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
