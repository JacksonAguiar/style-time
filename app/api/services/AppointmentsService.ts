import { NextResponse } from "next/server";
class AppointmentsServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }
  async create(data: any, id: string): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/appointments/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log(res);
      return { data: res, status: response.status };
    } catch (error) {
      console.log(data);
      console.log("service request error: " + error);
    }
  }

  async updateStatus(
    id: string,
    status: "confirmed" | "declined"
  ): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/appointments/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });

      const res = await response.json();
      return { data: res, status: response.status };
    } catch (error) {
      console.log("service APPOINTMENT request error: " + error);
    }
  }
  async getByDateAndStatus(
    date: string,
    status: string = "waiting"
  ): Promise<any> {
    try {
      var response = await fetch(
        `${this.URL_BASE}/api/appointments?date=${date}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const res = await response.json();

      return { data: res, status: response.status };
    } catch (error) {
      console.log("service APPOINTMENT request error: " + error);
    }
  }
}

var AppointmentsService = new AppointmentsServiceClass();
export default AppointmentsService;
