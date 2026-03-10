import { createComment } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
  id: string;
  content: string;
  itemId: string | null;
  authorId: string | null;
  createdAt: Date;
}

export function CommentList({
  comments,
  itemId,
}: {
  comments: Comment[];
  itemId: string;
}) {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-sm text-foreground/50">No comments yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-foreground/10 p-4"
            >
              <p className="text-sm">{comment.content}</p>
              <p className="mt-2 text-xs text-foreground/40">
                {comment.createdAt.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <form action={createComment} className="flex gap-2">
        <input type="hidden" name="itemId" value={itemId} />
        <Input
          name="content"
          placeholder="Add a comment..."
          required
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          Comment
        </Button>
      </form>
    </div>
  );
}
