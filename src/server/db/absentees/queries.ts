import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { type AbsenteeCreate } from "~/lib/validations/absentee";
import { db } from "~/server/db";
import { absentee } from "~/server/db/absentees/schema";

interface AbsenteeInsertProps {
  create: AbsenteeCreate;
  ownerId: string;
}

export async function absenteeInsert({ create, ownerId }: AbsenteeInsertProps) {
  return (
    await db
      .insert(absentee)
      .values({
        name: create.name,
        ownerId,
      })
      .returning()
  )[0];
}

interface AbsenteesGetAllProps {
  ownerId: string;
}

export async function absenteesGetAll({ ownerId }: AbsenteesGetAllProps) {
  return db.select().from(absentee).orderBy(desc(absentee.classStart)).where(
    eq(absentee.ownerId, ownerId), // Ensure ownership
  );
}

interface AbsenteeGetByIdProps {
  id: string;
  ownerId: string;
}

export async function absenteeGetById({ id, ownerId }: AbsenteeGetByIdProps) {
  return (
    await db
      .select()
      .from(absentee)
      .where(
        and(
          eq(absentee.ownerId, ownerId), // Ensure ownership
          eq(absentee.id, id),
        ),
      )
  )[0];
}

interface AbsenteeDeleteProps {
  id: string;
  ownerId: string;
}

export async function absenteeDelete({ id, ownerId }: AbsenteeDeleteProps) {
  return (
    await db
      .delete(absentee)
      .where(
        and(
          eq(absentee.ownerId, ownerId), // Ensure ownership
          eq(absentee.id, id),
        ),
      )
      .returning()
  )[0];
}
