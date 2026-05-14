import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Explicitly flush persistent authorization token cookie
    cookieStore.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration to epoch to enforce deletion
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Session securely terminated",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to sign out session cleanly" },
      { status: 500 }
    );
  }
}
