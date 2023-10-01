import prisma from "@/config/prisma";
import { decode } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  // const authorization = req.headers.get("authorization");

  // if (!authorization) {
  //   return NextResponse.json("You missing web token", { status: 403 });
  // }
  // const decoded = await decode({
  //   token: authorization,
  //   secret: process.env.NEXTAUTH_SECRET as string,
  // });

  // var id = decoded?.id;
  const id = params.id;

  const { title, description } = await req.json();

  if (!id)
    return NextResponse.json(
      { message: "you miss id or data content" },
      { status: 403 }
    );
  const res = await prisma.reports.create({
    data: {
      title,
      description,
      userId: id,
    },
  });
  return NextResponse.json(res);
}
