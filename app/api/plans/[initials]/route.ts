import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: Request,
  { params }: { params: { initials: string } }
) {
  const ini = await params.initials;
  const response = await prisma.plans.findMany({
    where: { initials: ini as string },
  });

  return NextResponse.json(response);
}
