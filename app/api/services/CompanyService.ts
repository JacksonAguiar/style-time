import { decode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
class CompanieServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }

  async getById(id: string): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/companie", {
        method: "GET",
        headers: new Headers({
          CompanyId: id,
          "Content-Type": "application/json",
        }),
        cache: "no-cache",
      });
      const data = await response.json();

      return { data: data, status: response.status };
    } catch (error) {
      console.log("service request error: " + error);
    }
  }
  async getBySharedCode(sc: string): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/companie/" + sc, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = await response.json();

      return { data: data, status: response.status };
    } catch (error) {
      console.log("service request error: " + error);
    }
  }

  async create(name: any): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/companie", {
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    var res = await data.json();
    return res;
  }
  async addServices(id: any, services: any[]): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/services/" + id, {
      body: JSON.stringify(services),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    var res = await data.json();

    return res;
  }
  async update(id: string, update: any): Promise<any> {
    const { data, error, isLoading } = await fetch(
      this.URL_BASE + "/api/companie",
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

  async services(id: string): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/services/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((value) => value.json());

    return data;
  }
  async deleteService(id: string): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/services/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((value) => value.json());

    return data;
  }
  async addOneService(
    companieId: string,
    name: string,
    duration: any
  ): Promise<any> {
    const data = await fetch(this.URL_BASE + "/api/services/" + companieId, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify([{ name, duration }]),
    }).then((value) => value.json());

    return data;
  }
}

var CompanieService = new CompanieServiceClass();
export default CompanieService;
