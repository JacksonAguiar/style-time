import client from "@/config/prisma";

class JobsServices {
  async getAll(): Promise<any[]> {
    return await client.services.findMany();
  }
  async getById(id: string): Promise<any> {
    return await client.services.findUnique({ where: { id } });
  }
  async create(data: any[]): Promise<any> {
    return await client.services.createMany({ data: data });
  }
  async update(id: string, data: any): Promise<any> {
    return await client.services.update({ where: { id }, data });
  }
  async delete(id: string): Promise<any> {
    const res = await client.services.delete({ where: { id } });
    return res != null;
  }
}

export default JobsServices;
