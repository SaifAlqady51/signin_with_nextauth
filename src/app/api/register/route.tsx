import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt';


interface Body{
    email:string,
    name:string,
    password:string
}


export async function POST(request:NextRequest){
    const body = await request.json();
    const {email,name,password}   = body as Body

    if(!email || !name || !password){
        return new NextResponse('Missing Creditials',{status:400})
    }

    const exist = await prisma.user.findUnique({
        where:{email}
    })

    if(exist){
        throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password,10) 

    const user = await prisma.user.create({
        data:{email,name,hashedPassword}
    })

    return NextResponse.json(user);


}

