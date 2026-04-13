import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server';
export function middleware(req:NextRequest){
    const token = req.cookies.get('token')?.value;
    const protectedRoutes = ["/checkout","/profile"];
    if(protectedRoutes.some((path)=>req.nextUrl.pathname.startsWith(path))){
        if(!token){
             return NextResponse.redirect(new URL("/login", req.url));
        }

        try{
            jwt.verify(token,process.env.JWT_SECRET!);
        }catch(error){
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    return NextResponse.next();
}
