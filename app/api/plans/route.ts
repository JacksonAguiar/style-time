import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const res = await prisma.plans.createMany({
    data: data,
  });

  return NextResponse.json(res);
}
export async function GET(req: Request) {
  const data = await req.json();
  const res = await prisma.plans.createMany({
    data: data,
  });

  return NextResponse.json(res);
}