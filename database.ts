import { PrismaClient } from "@prisma/client";

const bd = new PrismaClient();

bd.$connect();

export async function getSignIn(params: string) {
  const response = await bd.cuenta.findMany({
    where: {},
    select: {
      id_cue: true,
      nic_cue: true,
      cor_cue: true,
      con_cue: true,
      usuario: {
        select: {
          id_usu: true,
          nom_usu: true,
          rol: {
            select: {
              nom_rol: true,
            },
          },
        },
      },
    },
  });
  console.log(response);
  return response;
}

export async function getUsers(params: number) {
  const response = await bd.usuario.findMany({
    where: {
      id_usu: params,
    },
    select: {
      id_usu: true,
      nom_usu: true,
      rol: {
        select: {
          nom_rol: true,
        },
      },
      cuenta: {
        select: {
          nic_cue: true,
          cor_cue: true,
        },
      },
      tel_usu: true,
    },
  });
  console.log(response[0]);
  return response[0];
}
