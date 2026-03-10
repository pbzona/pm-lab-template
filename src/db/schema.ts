import { pgSchema, uuid, text, timestamp } from "drizzle-orm/pg-core";

const schemaName = process.env.DATABASE_SCHEMA || "prototype";
const schema = pgSchema(schemaName);

export const users = schema.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const items = schema.table("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const comments = schema.table("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  itemId: uuid("item_id").references(() => items.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = schema.table("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
