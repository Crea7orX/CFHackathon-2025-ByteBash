import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import IdPrefix, { generateId } from "~/lib/ids";

export const tv = pgTable("tv", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$default(() => generateId(IdPrefix.TV)),
  name: varchar("name", { length: 256 }),
  usage: decimal("usage", { precision: 10, scale: 2 }).notNull().default("0"),
  type: varchar("type", { length: 256 }),
  ownerId: varchar("owner_id", { length: 256 }).notNull(),
  createdAt: integer("created_at")
    .default(sql`(EXTRACT (EPOCH FROM NOW()))`)
    .notNull(),
  updatedAt: integer("updated_at").$onUpdate(
    () => sql`(EXTRACT (EPOCH FROM NOW()))`,
  ),
});
