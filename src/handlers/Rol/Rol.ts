import { Prisma, Rol } from "@prisma/client";
import { bd } from "../../db";

export class RolHandler {
  db = bd;

  public async getRoles(): Promise<Rol[]> {
    const roles = await this.db.rol.findMany();

    return roles;
  }

  public async getRol(params: Prisma.RolWhereUniqueInput): Promise<Rol> {
    const rol = await this.db.rol.findUniqueOrThrow({
      where: params,
    });

    return rol;
  }

  public async createRol(params: Prisma.RolCreateInput): Promise<Rol> {
    const rol = await this.db.rol.create({
      data: params,
    });

    return rol;
  }
}
