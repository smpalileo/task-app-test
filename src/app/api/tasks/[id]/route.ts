import dbConnect from "@/app/lib/dbConnect";
import Task from "@/app/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const _id = (await params).id;
    const body = await request.json();
    const task = await Task.findOneAndUpdate({ _id, userId }, body, {
      new: true,
    });
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: `Failed to update task` },
      { status: 500 },
    );
  }
}
