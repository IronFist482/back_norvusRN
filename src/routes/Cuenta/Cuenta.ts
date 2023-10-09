import { ControllerMonad } from "@lib";
import { CuentaCreateInputSchema } from "@schemas";
import { CuentaHandler } from "@/handlers";

const CuentaMonad = new ControllerMonad();

const cuentaHandlers = new CuentaHandler();

CuentaMonad.get("/", async (req, res) => {
  const roles = await cuentaHandlers.getCuentas();
  return res.json(roles);
}).post(
  "/",
  async (req, res) => {
    const rolCreated = await cuentaHandlers.createCuenta(req.body);

    return res.json({
      message: "Rol Created!",
      rol: rolCreated,
    });
  },
  {
    body: CuentaCreateInputSchema,
  }
);

export default CuentaMonad.routerInstance;
