import signupModel from "@/app/models/signupModel";
import dbConnect from "@/lib/db";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, password, address } = body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await signupModel.create({
      name,
      email,
      password:hashedPassword,
      address,
    });
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: userResponse,
      },
      {
        status: 201,
      },
    );
  } catch (error:any) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        { status: 409 }
      );
    }
    return NextResponse.json({
      success: false,
      error: `Error creating user ${error}`,
    });
  }
}
