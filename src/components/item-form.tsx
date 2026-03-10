"use client";

import { createItem } from "@/actions/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export function ItemForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    await createItem(formData);
    formRef.current?.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleAction} className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter item title"
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Optional description"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
