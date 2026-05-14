import { plannerAgent } from "@/agents/plannerAgent";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await plannerAgent(
    body.project
  );

  const project = await prisma.project.create({
    data: {
      name: body.name,
      description: body.project,
      status: "Planning",
    },
  });


  return NextResponse.json({
    success: true,
    result,
    project,
  });
}
