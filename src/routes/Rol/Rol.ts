import { Router } from "express";
import { ControllerMonad } from "@/middlewares";
import z from "zod";
import { RolCreateInputSchema } from "@schemas";
import { RolHandler } from "@/handlers";

const rolRouter = Router();

const rolMonad = new ControllerMonad();

const rolHandlers = new RolHandler();

rolMonad
  .get("/prueba", async (req, res) => {
    res.json({
      message: "Hello World!",
    });
  })
  .post(
    "/prueba",
    async (req, res) => {
      const created = rolHandlers.createRol({
        nom_rol: "asd",
      });

      res.json({
        message: "parsed!",
        body: req.body,
      });
    },
    {
      body: RolCreateInputSchema,
    }
  );

rolMonad.registerControllers(rolRouter);

export default rolRouter;
