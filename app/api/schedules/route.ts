import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const comp = await prisma.schedules.createMany({
    data: data,
  });

  return NextResponse.json(comp);
}
