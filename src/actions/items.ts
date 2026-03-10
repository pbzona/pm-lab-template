"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  await db.insert(items).values({
    title,
    description: description || null,
    status: "draft",
  });

  revalidatePath("/dashboard");
}

export async function updateItem(
  id: string,
  data: { title?: string; description?: string; status?: string }
) {
  await db
    .update(items)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(items.id, id));

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/items/${id}`);
}

export async function deleteItem(id: string) {
  await db.delete(items).where(eq(items.id, id));

  revalidatePath("/dashboard");
}
