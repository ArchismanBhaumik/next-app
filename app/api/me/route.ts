import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/app/models/signupModel"
import dbConnect from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, user: null });
    }

    const decoded = verifyToken(token) as { userId: string };

    const user = await User.findById(decoded.userId).select(
      "_id name email address"
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch {
    return NextResponse.json({ success: false, user: null });
  }
}
