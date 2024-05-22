import { db } from "@/db";
import { activities } from "@/db/schema";

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export async function listActivities() {
  return await db.select().from(activities);
}

export async function createActivity(activity: NewActivity) {
  await db.insert(activities).values(activity);
}
