import mongoose from "mongoose";
import Document, { Schema } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  completed: boolean;
  userId: string;
}

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
  },
  { timestamps: true },
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
