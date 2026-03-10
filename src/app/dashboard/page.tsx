import { db } from "@/db";
import { items } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ItemTable } from "@/components/item-table";
import { ItemForm } from "@/components/item-form";

export default async function DashboardPage() {
  const allItems = await db
    .select()
    .from(items)
    .orderBy(desc(items.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Items</h2>
      </div>
      <ItemForm />
      <ItemTable items={allItems} />
    </div>
  );
}
