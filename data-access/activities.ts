import { db } from "@/db";
import { activities } from "@/db/schema";

export async function listActivities() {
  return await db.select().from(activities);
}

export async function createActivity(message: string) {
  await db.insert(activities).values({ message });
}
