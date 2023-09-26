import prisma from "@/config/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "No email or phone provided" },
      { status: 401 }
    );
  }
  try {
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    } else {
      return NextResponse.json(exists);
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
