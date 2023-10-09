import { Prisma, Cuenta } from "@prisma/client";
import { bd } from "@/db";

export class CuentaHandler {
  db = bd;

  public async getCuentas(): Promise<Cuenta[]> {
    const cuenta = await this.db.cuenta.findMany({
      include: {
        usuario: true,
      },
    });

    return cuenta;
  }

  public async getCuenta(
    params: Prisma.CuentaWhereUniqueInput
  ): Promise<Cuenta> {
    const cuenta = await this.db.cuenta.findUniqueOrThrow({
      where: params,
    });

    return cuenta;
  }

  public async createCuenta(params: Prisma.CuentaCreateInput): Promise<Cuenta> {
    const cuenta = await this.db.cuenta.create({
      data: params,
    });

    return cuenta;
  }
}
