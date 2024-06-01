import { z } from "zod";

export const CreateTaskBody = z.object({
  collectionId: z.number().nonnegative(),
  content: z
    .string()
    .min(8, { message: "Task content must be at least 8 characters" }),
  expiresAt: z.date().optional(),
});
export type CreateTaskBodyType = z.infer<typeof CreateTaskBody>;

export const UpdateTaskStatus = z.object({
  done: z.boolean(),
});
export type UpdateTaskStatusType = z.infer<typeof UpdateTaskStatus>;
