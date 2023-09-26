import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const user = await prisma.appointments.createMany({
    data: data,
  });
  
  return NextResponse.json(user);
}
