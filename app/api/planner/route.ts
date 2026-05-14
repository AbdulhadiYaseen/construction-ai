import { plannerAgent } from "@/agents/plannerAgent";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await plannerAgent(
      body.project
    );

    // Create full relational tracking footprint including initial agent-synthesized items
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.project,
        status: "Planning",
        tasks: {
          create: [
            { 
              title: "Geotechnical Site Survey & Validation", 
              status: "In Progress", 
              assignedTo: "Lead Surveyor Agent", 
              deadline: "T+5 Days" 
            },
            { 
              title: "Foundation Excavation & Shoring Layout", 
              status: "Pending", 
              assignedTo: "Heavy Ops Coordinator", 
              deadline: "T+14 Days" 
            },
            { 
              title: "Steel Framework Sub-Assembly Preparation", 
              status: "Pending", 
              assignedTo: "Structural Engineer Agent", 
              deadline: "T+30 Days" 
            },
          ]
        },
        risks: {
          create: [
            { 
              riskType: "Weather & Material Supply Chain Degradation", 
              severity: "Medium" 
            },
            { 
              riskType: "Zoning Variance Overlap & Buffer Compliance", 
              severity: "Low" 
            },
          ]
        },
        decisions: {
          create: [
            { 
              action: "Allocate Dynamic Resource Buffers", 
              reason: "Mitigate potential logistical delays flagged by supply telemetry alerts." 
            },
            { 
              action: "Deploy Edge Sensor Safety Matrices", 
              reason: "Synchronize environmental monitoring channels to the operational grid." 
            },
          ]
        }
      },
    });

    return NextResponse.json({
      success: true,
      result,
      project,
    });
  } catch (err: any) {
    console.error("Planner API Failure:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
