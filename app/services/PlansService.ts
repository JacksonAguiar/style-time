
class PlansServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }
  async getAll(initials: string): Promise<any> {
    try {
      var response = await fetch(this.URL_BASE + "/api/plans/"+initials, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      return { data: data, status: response.status };
    } catch (error) {
      console.log("service request error: " + error);
    }
  }

}

var PlansService =  new PlansServiceClass();
export default PlansService;
