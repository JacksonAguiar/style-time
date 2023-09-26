import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  var { getFullYear, getMonth, getDay } = new Date(data.hours[0]);

  data.companieId = params.id;
  data.date = `${getFullYear}-${getMonth}-${getDay}`;

  const user = await prisma.appointments.create({
    data: data,
  });
  return NextResponse.json(user);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const appointments = await prisma.appointments.findMany({
    where: {
      companieId: params.id,
      date: date,
      OR: [
        {
          status: {
            equals: "waiting",
          },
        },
        {
          status: {
            equals: "confirmed",
          },
        },
      ],
    },
  });
  return NextResponse.json(appointments);
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const appointments = await prisma.appointments.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(appointments);
}
