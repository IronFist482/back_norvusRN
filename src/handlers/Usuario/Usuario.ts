import { Prisma, Usuario } from "@prisma/client";
import { bd } from "@/db";

export class UsuarioHandler {
  db = bd;

  public async getUsuarios(): Promise<Usuario[]> {
    const usuario = await this.db.usuario.findMany({
      include: {
        cuenta: true,
        rol: true,
      },
    });

    return usuario;
  }

  public async getUsuario(
    params: Prisma.UsuarioWhereUniqueInput
  ): Promise<Usuario> {
    const usuario = await this.db.usuario.findUniqueOrThrow({
      where: params,
    });

    return usuario;
  }

  public async createUsuario(
    params: Prisma.UsuarioCreateInput
  ): Promise<Usuario> {
    const usuario = await this.db.usuario.create({
      data: params,
    });

    return usuario;
  }
}
