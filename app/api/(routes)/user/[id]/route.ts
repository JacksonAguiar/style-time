import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { q: any; id: string } }
) {
  const { searchParams } = new URL(req.url);
  const id = params.id;
  const query = searchParams.get("q")?.split(",");

  var serv = false;
  var sch = false;
  var comp = false;
  var plans = false;

  if (query != null && (query as any[]).includes("services")) {
    console.log("envia serv");
    serv = true;
  }
  if (query != null && (query as any[]).includes("schedules")) {
    console.log("envia schedu");
    sch = true;
  }
  if (query != null && (query as any[]).includes("companie")) {
    console.log("envia comp");
    comp = true;
  }
  if (query != null && (query as any[]).includes("plans")) {
    console.log("envia plans");
    plans = true;
  }
  // const { data, id } = await req.json();

  //   const { teste, id } = params.q;
  //   if (teste) console.log(teste);
  //   if (id) console.log(id);

  //   if (!id || !data)
  //     return NextResponse.json(
  //       { message: "you miss id or data content" },
  //       { status: 403 }
  //     );
  //   if (data.password) data.password = await hash(data.password, 10);
  //   const res = await prisma.user.update({
  //     data,
  //     where: { id },
  //   });
  return NextResponse.json({ res: true });
}
