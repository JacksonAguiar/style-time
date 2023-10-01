import prisma from "@/config/prisma";
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
  const response = await prisma.services.createMany({
    data: data,
  });

  return NextResponse.json(response);
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const companieId = params.id;

  const response = await prisma.services.findMany({
    where: { companieId },
  });

  return NextResponse.json(response);
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) NextResponse.json({ message: "no id provided" }, { status: 403 });

  const response = await prisma.services.delete({ where: { id } });

  return NextResponse.json(response);
}
