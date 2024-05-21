import { createId } from "@paralleldrive/cuid2";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  name: text("name").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  updatedAt: text("updated_at").$onUpdate(() => new Date().toISOString()),
});

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  imageUrl: text("image_url"),
  name: text("name").notNull().unique(),
  quantity: integer("quantity").notNull(),
  lowLimit: integer("low_limit"),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  updatedAt: text("updated_at").$onUpdate(() => new Date().toISOString()),
});

export const activities = sqliteTable("activities", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  sender: text("sender").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
});
