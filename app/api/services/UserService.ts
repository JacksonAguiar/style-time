import { NextResponse } from "next/server";
class UserServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }
  async getByEmailOrPhone(email: string): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/user/findBy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      return { data: data, status: response.status };
    } catch (error) {
      console.log("service request error: " + error);
    }
  }

  async create(user: any): Promise<any> {
    console.log(JSON.stringify(user));
    var response = await fetch(this.URL_BASE + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }

  async update(id: string, update: any): Promise<any> {
    const { data, error, isLoading } = await fetch(
      this.URL_BASE + "/api/user",
      {
        body: JSON.stringify({ data: update, id: id }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    ).then((value) => value.json());
    if (error) console.log(error);

    return NextResponse.json({ message: "success" }, { status: 200 });
  }
}

var UserService = new UserServiceClass();
export default UserService;
