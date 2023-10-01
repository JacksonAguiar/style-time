import prisma from "@/config/prisma";
import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: Request) {
  var body = await req.json();
  const { id, data } = body;

  const comp = await prisma.company.update({
    data: data,
    where: { id },
  });

  return NextResponse.json(comp);
}

export async function POST(req: Request) {
  var body = await req.json();
  const { name } = body;

  const shareCode = await generateCode(name as string);

  const comp = await prisma.company.create({
    data: {
      name,
      shareCode,
    },
  });

  return NextResponse.json(comp);
}

export async function GET(request: NextRequest, resp: NextApiResponse) {
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  const companieId = request.headers.get("CompanyId");

  if (!companieId) {
    return NextResponse.json("No companie id provided", { status: 403 });
  }

  const todayDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const today = formatDate(todayDate);
  const tomorrow = formatDate(tomorrowDate);

  const comp = await prisma.company.findUnique({
    where: {
      id: companieId as string,
    },
    include: {
      Services: true,
      Schedules: true,
      User: {
        select: {
          createdAt: true,
          annualDiscount: true,
          Plan: {
            select: {
              name: true,
              annualValue: true,
              maxAppointments: true,
              id: true,
            },
          },
        },
      },
      Appointments: {
        orderBy: { confirmedHour: "asc" },
        where: {
          OR: [
            {
              status: "waiting",
              date: tomorrow,
            },
            {
              status: "confirmed",
              date: today,
            },
          ],
        },
      },
    },
    // select: { Services: true, Schedules: true },
  });

  return NextResponse.json(comp);
}

async function generateCode(name: string): Promise<string> {
  var code = createHash("sha256")
    .update(name.trim(), "binary")
    .digest("hex")
    .toUpperCase()
    .slice(0, 18);
  code = "S#" + code;

  const comp = await prisma.company.findFirst({
    where: { shareCode: code },
  });
  if (comp) {
    generateCode(name);
  }

  return code;
}
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
