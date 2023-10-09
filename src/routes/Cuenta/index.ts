import { CuentaHandler } from "../../handlers";
import { RequestHandler, RequestParamHandler } from "express";

export class CuentaController {
  private handler = new CuentaHandler();

  static async getCuenta() {}
}
