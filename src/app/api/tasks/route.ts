import { prisma } from "@/app/lib/db";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const data = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
