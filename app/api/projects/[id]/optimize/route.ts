import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: any
) {
  // Clean parameter unwrapping compliant with Next.js 16 App Router
  const resolvedParams = await context.params;
  const projectId = parseInt(resolvedParams.id, 10);
  
  try {
    const body = await req.json();
    const { type } = body; // Accepts "tasks" or "risks"

    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, error: "Invalid entity identifier" }, { status: 400 });
    }

    if (type === "tasks") {
      // Atomically inject optimized tasks into operational tracking grid
      await prisma.project.update({
        where: { id: projectId },
        data: {
          tasks: {
            create: [
              {
                title: "Seismic Perimeter Sensor Grid Setup",
                status: "In Progress",
                assignedTo: "Surveillance Node Alpha",
                deadline: "T+2 Days"
              },
              {
                title: "Core Structural Shaft Concrete Preparation",
                status: "Pending",
                assignedTo: "Automated Pour Systems",
                deadline: "T+8 Days"
              }
            ]
          }
        }
      });
    } else if (type === "risks") {
      // Atomically inject identified risks and log corresponding autonomous decision mitigations
      await prisma.project.update({
        where: { id: projectId },
        data: {
          risks: {
            create: [
              {
                riskType: "Excessive High-Elevation Wind Shearing",
                severity: "High"
              },
              {
                riskType: "Supply Logistics Frequency Stalling",
                severity: "Medium"
              }
            ]
          },
          decisions: {
            create: [
              {
                action: "Deploy Dynamic Shear-Dampening Sensors",
                reason: "Automate crane suspension lockouts upon detecting elevated wind speeds."
              }
            ]
          }
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Optimization Pipeline Failure:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
