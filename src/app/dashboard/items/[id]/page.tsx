import { db } from "@/db";
import { items, comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CommentList } from "@/components/comment-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await db
    .select()
    .from(items)
    .where(eq(items.id, id))
    .then((rows) => rows[0]);

  if (!item) {
    notFound();
  }

  const itemComments = await db
    .select()
    .from(comments)
    .where(eq(comments.itemId, id))
    .orderBy(comments.createdAt);

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard"
        className="text-sm text-foreground/60 hover:text-foreground"
      >
        &larr; Back to items
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{item.title}</CardTitle>
            <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium">
              {item.status}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/70">
            {item.description || "No description provided."}
          </p>
          <p className="mt-4 text-xs text-foreground/40">
            Created {item.createdAt.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Comments</h3>
        <CommentList comments={itemComments} itemId={id} />
      </div>
    </div>
  );
}
