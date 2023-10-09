import { ControllerMonad } from "@lib";
import { RolCreateInputSchema } from "@schemas";
import { RolHandler } from "@/handlers";

const rolMonad = new ControllerMonad();

const rolHandlers = new RolHandler();

rolMonad
  .get("/", async (req, res) => {
    const roles = await rolHandlers.getRoles();
    return res.json(roles);
  })
  .post(
    "/",
    async (req, res) => {
      const rolCreated = await rolHandlers.createRol(req.body);

      return res.json({
        message: "Rol Created!",
        rol: rolCreated,
      });
    },
    {
      body: RolCreateInputSchema,
    }
  );

export default rolMonad.routerInstance;
