import dbConnect from "@/app/lib/dbConnect";
import Task, { TaskCreateDTO, taskEntitySchema } from "@/app/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  await dbConnect();
  try {
    const { userId } = await auth();
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: `Failed to fetch task` },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body: TaskCreateDTO = await request.json();
    const { userId } = await auth();
    const input = taskEntitySchema.parse(body);
    const newTask = new Task({ ...input, userId });
    await newTask.save();
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: `Failed to create task` },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const { _id } = await request.json();
    const { userId } = await auth();
    const response = await Task.findOneAndDelete({ _id, userId });
    if (!response)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(
      { message: "Successfully deleted task" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: `Failed to delete task` },
      { status: 500 },
    );
  }
}
