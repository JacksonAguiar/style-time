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
        body: JSON.stringify({
          status: status,
          confirmationCode: status == "confirmed" ? generateRandomCode() : null,
        }),
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
          },
        }
      );

      const res = await response.json();

      return { data: res, status: response.status };
    } catch (error) {
      console.log("service APPOINTMENT request error: " + error);
    }
  }
}
function generateRandomCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let code = "";

  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }

  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers[randomIndex];
  }

  return code;
}
var AppointmentsService = new AppointmentsServiceClass();
export default AppointmentsService;
