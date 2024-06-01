"use server";

import prisma from "@/lib/prisma";
import { CreateTaskBodyType } from "@/schemas/task.schema";
import { currentUser } from "@clerk/nextjs/server";

export async function createTask(data: CreateTaskBodyType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { content, expiresAt, collectionId } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function setTaskToDone(id: number, done: boolean) {
  const user = await currentUser();
  console.log(done);

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.task.update({
    where: { id, userId: user.id },
    data: { done },
  });
}
