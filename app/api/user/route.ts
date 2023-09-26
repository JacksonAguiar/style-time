import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, provider } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json(exists);
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        provider,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
export async function PATCH(req: Request) {
  const { data, id } = await req.json();
  if (!id || !data)
    return NextResponse.json(
      { message: "you miss id or data content" },
      { status: 403 }
    );
  if (data.password) data.password = await hash(data.password, 10);
  const res = await prisma.user.update({
    data,
    where: { id },
  });
  return NextResponse.json(res);
}