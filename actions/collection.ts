"use server";

import prisma from "@/lib/prisma";
import { CreateCollectionBodyType } from "@/schemas/collection.schema";
import { currentUser } from "@clerk/nextjs/server";

export async function createCollection(form: CreateCollectionBodyType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.collection.create({
    data: { userId: user.id, color: form.color, name: form.name },
  });
}

export async function deleteCollection(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.collection.delete({
    where: { id, userId: user.id },
  });
}
