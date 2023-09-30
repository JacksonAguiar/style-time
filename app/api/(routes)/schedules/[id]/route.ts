import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  let data: any[] = await req.json();
  const id = params.id;

  data = data.map((e) => {
    e.companieId = id;
    return e;
  });
  try {
    const comp = await prisma.schedules.createMany({
      data: data,
    });

    return NextResponse.json(comp);
  } catch (error) {
    console.log(error)
  }
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const comp = await prisma.schedules.findMany({
    where: { companieId: id },
  });

  return NextResponse.json(comp);
}
