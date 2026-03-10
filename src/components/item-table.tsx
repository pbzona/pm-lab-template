import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Item {
  id: string;
  title: string;
  status: string;
  description: string | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function ItemTable({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-foreground/10 p-8 text-center text-foreground/50">
        No items yet. Create one above to get started.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-foreground/10">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-foreground/10 bg-foreground/5">
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={`/dashboard/items/${item.id}`}
                  className="text-sm font-medium hover:underline"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium">
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-sm text-foreground/60">
                {item.createdAt.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
