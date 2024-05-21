import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  name: text("name").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  imageUrl: text("image_url"),
  name: text("name").notNull().unique(),
  description: text("description").default("No description"),
  quantity: integer("quantity").notNull(),
  lowLimit: integer("low_limit"),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const activities = sqliteTable("activities", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  sender: text("sender").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
