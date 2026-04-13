import dbConnect from "@/lib/db";
import User from "@/app/models/signupModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { signToken } from "@/lib/jwt";
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User does not exist!",
        },
        { status: 404 },
      );
    }
    console.log(password,"password", user.password,"user password")
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if(!isMatch){
        return NextResponse.json(
        {
          success: false,
          error: "Credentials Do Not Match!",
        },
        { status: 401 },
      );
    }

    const token = signToken(user._id.toString());
    const response = NextResponse.json({
        success:true,
        message:"Login SuccessFul",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
        },
    })

    response.cookies.set('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"lax",
        path:'/'
    })
    return response;
  } catch (error: unknown) {
    return NextResponse.json({
        success:false,
        error:error instanceof Error ? error.message : "Something went wrong",
    },{
        status:500
    })
  }
}
