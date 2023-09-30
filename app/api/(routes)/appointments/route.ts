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
export async function GET(
  req: Request
  // { params }: { params: { date: string } }
) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "waiting";
  const date = searchParams.get("date");

  // const date = params.date;

  const apts = await prisma.appointments.findMany({
    where: {
      date: date,
      status: status,
    },
  });


  return NextResponse.json(apts);
}
