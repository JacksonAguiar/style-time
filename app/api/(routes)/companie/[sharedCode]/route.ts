import prisma from "@/config/prisma";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sharedCode: string } }
) {
  var code = params.sharedCode;
  const comp = await prisma.company.findUnique({
    where: {
      shareCode: code,
    },
    include: { Services: true, Schedules: true },
    // select: { Services: true, Schedules: true },
  });

  return NextResponse.json(comp);
}
