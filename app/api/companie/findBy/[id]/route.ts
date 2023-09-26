import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? "";

  const comp = await prisma.companie.findUnique({
    where: {
      id:  params.id,
    },
    include: {
      Services: true,
      Schedules: true,
      Appointments: {
        where: {
          OR: [
            {
              status: "waiting",
            },
            {
              status: "confirmed",
            },
          ],
          AND: [
            {
              date: date,
            },
          ],
        },
      },
    },
    // select: { Services: true, Schedules: true },
  });

  return NextResponse.json(comp);
}
