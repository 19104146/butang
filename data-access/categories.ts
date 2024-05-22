import { eq } from "drizzle-orm";

import { db } from "@/db";
import { categories } from "@/db/schema";

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export async function listCategories() {
  return await db.select().from(categories);
}

export async function getCategory(id: string) {
  return await db.select().from(categories).where(eq(categories.id, id));
}

export async function createCategory(name: string) {
  await db.insert(categories).values({ name });
}

export async function updateCategory(id: string, name: string) {
  await db.update(categories).set({ name }).where(eq(categories.id, id));
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id));
}
