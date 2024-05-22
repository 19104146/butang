import { eq } from "drizzle-orm";

import { db } from "@/db";
import { products } from "@/db/schema";

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export async function listProducts() {
  return await db.select().from(products);
}

export async function getProduct(id: string) {
  return await db.select().from(products).where(eq(products.id, id));
}

export async function createProduct(product: NewProduct) {
  await db.insert(products).values(product);
}

export async function updateProduct(product: NewProduct & { id: string }) {
  await db.update(products).set(product).where(eq(products.id, product.id));
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
}
