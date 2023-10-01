import { NextResponse } from "next/server";
class ScheduleServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }

  async getAll(id: string): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/schedules/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((value) => value.json());

    return data;
  }

  async create(schedules: any[], id: string): Promise<any> {
    const res = await fetch(this.URL_BASE + "/api/schedules/" + id, {
      body: JSON.stringify(schedules),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    var data = await res.json();

    return NextResponse.json(data);
  }
  
  async delete(id: string): Promise<any> {
    const res = await fetch(this.URL_BASE + "/api/schedules/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    var data = await res.json();

    return NextResponse.json(data);
  }
}

var ScheduleService = new ScheduleServiceClass();
export default ScheduleService;
