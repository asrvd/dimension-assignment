import { prisma } from "@/app/lib/db";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, status, assignees, labels, priority, project } =
    await request.json();

  try {
    const data = await prisma.task.create({
      data: {
        title: title,
        description: description,
        status: status,
        priority: priority,
        project: project,
        assignees: assignees,
        labels: labels,
      },
    });
    if (data) {
      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        status: 200,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify(err), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      status: 500,
    });
  }
}
