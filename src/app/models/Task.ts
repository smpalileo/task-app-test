import mongoose from "mongoose";
import Document, { Schema } from "mongoose";

import { z } from "zod";

export interface ITask extends Document {
  name: string;
  description: string;
  completed: boolean;
  userId: string;
  deadline?: Date;
  tags?: string[];
}

export const taskEntitySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string(),
  completed: z.boolean().optional(),
  deadline: z
    .string()
    .date()
    .transform((str) => new Date(str))
    .optional(),
  tags: z.string().array().optional(),
});

export const updateEntitySchema = taskEntitySchema.partial();

export type TaskCreateDTO = z.infer<typeof taskEntitySchema>;
export type TaskUpdateDTO = Partial<TaskCreateDTO>;

const TaskSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required."],
    },
    description: {
      type: String,
      required: [true, "A description is required."],
    },
    userId: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
