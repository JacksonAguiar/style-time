import prisma from "@/config/prisma";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  var body = await req.json();
  const { name } = body;

  const shareCode = await generateCode(name as string);

  const comp = await prisma.companie.create({
    data: {
      name,
      shareCode,
    },
  });

  return NextResponse.json(comp);
}
async function generateCode(name: string): Promise<string> {
  var code = createHash("sha256").update(name.trim(), "binary").digest("hex").toUpperCase().slice(0,18);
  code = "S#" + code;

  const comp = await prisma.companie.findFirst({
    where: { shareCode: code },
  });
  if (comp) {
    generateCode(name);
  }

  return code;
}
