import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { companieId: string } }
) {
  let data: any[] = await req.json();
  const id = params.companieId;

  data = data.map((e) => {
    e.companieId = id;
    return e;
  });
  const response = await prisma.services.createMany({
    data: data,
  });

  return NextResponse.json(response);
}
