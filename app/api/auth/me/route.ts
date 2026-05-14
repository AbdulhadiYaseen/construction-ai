import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_jwt_token_key";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized session" },
        { status: 401 }
      );
    }

    // Decode session token to extract relational identifier
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Expired or corrupted session" },
        { status: 401 }
      );
    }

    if (!payload || !payload.userId) {
      return NextResponse.json(
        { success: false, message: "Corrupt token metadata" },
        { status: 401 }
      );
    }

    // Query primary SQL cluster for user profile metrics
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Operator node not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error: any) {
    console.error("Auth Check Pipeline Failure:", error);
    return NextResponse.json(
      { success: false, message: "Internal Authorization server error" },
      { status: 500 }
    );
  }
}
