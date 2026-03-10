"use server";

import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createComment(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create comments");
  }

  const content = formData.get("content") as string;
  const itemId = formData.get("itemId") as string;

  if (!content || !itemId) {
    throw new Error("Content and item ID are required");
  }

  await db.insert(comments).values({
    content,
    itemId,
    authorId: user.id,
  });

  revalidatePath(`/dashboard/items/${itemId}`);
}

export async function deleteComment(id: string, itemId: string) {
  await db.delete(comments).where(eq(comments.id, id));

  revalidatePath(`/dashboard/items/${itemId}`);
}
