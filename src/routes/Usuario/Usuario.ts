import { UsuarioCreateInputSchema } from "@schemas";
import { UsuarioHandler } from "@/handlers";
import { ControllerMonad } from "@lib";
import z from "zod";

const userMonad = new ControllerMonad();

const userHandlers = new UsuarioHandler();

userMonad
  .get("/", async (req, res) => {
    const users = await userHandlers.getUsuarios();
    return res.json(users);
  })
  .post(
    "/",
    async (req, res) => {
      const user = await userHandlers.createUsuario(req.body);

      return res.json({
        message: "Usuario Created!",
        user,
      });
    },
    {
      body: UsuarioCreateInputSchema,
      //  z.object({}),
    }
  );

export default userMonad.routerInstance;
