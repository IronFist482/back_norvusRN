import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

const con = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

interface PropsGetUsuario {
  correo: string;
  password: string;
}

export async function getUsuario(params: PropsGetUsuario) {
  const [rows] = await con.query(
    `SELECT * FROM norvus_bd.usuario u, norvus_bd.cuenta c  WHERE c.cor_cue = '${params.correo}' AND c.con_cue = '${params.password}'`
  );
  console.log(rows[0]);
}

getUsuario({ correo: "cernaian5@gmail.com", password: "idcp2005M+" });