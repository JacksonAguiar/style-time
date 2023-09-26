import { NextResponse } from "next/server";
class ScheduleServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }

  async getAll(id: string): Promise<any> {
    const { data, error, isLoading } = await fetch(
        this.URL_BASE + "/api/companie/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((value) => value.json())
        .then((res) => res.json());
  
      return NextResponse.json(data);
  }

  async create(schedules: any[], id: string): Promise<any> {
    const res = await fetch(
      this.URL_BASE + "/api/schedules/" + id,
      {
        body: JSON.stringify(schedules),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
     var data = await res.json();

    return NextResponse.json(data);
  }
//   async update(id: string, update: any): Promise<any> {
//     const { data, error, isLoading } = await fetch(
//       this.URL_BASE + "/api/companie",
//       {
//         body: JSON.stringify({ data: update, id: id }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "PATCH",
//       }
//     ).then((value) => value.json());
//     if (error) console.log(error);

//     return NextResponse.json({ message: "success" }, { status: 200 });
//   }
}

var ScheduleService =  new ScheduleServiceClass();
export default ScheduleService;