import { Router } from "express";
import { ControllerMonad } from "@/middlewares";
import z from "zod";

const rolRouter = Router();

const rolMonad = new ControllerMonad();

rolMonad
  .get("/prueba", async (req, res) => {
    res.json({
      message: "Hello World!",
    });
  })
  .post(
    "/prueba",
    async (req, res) => {
      res.json({
        message: "parsed!",
        body: req.body,
      });
    },
    {
      body: z.object({
        name: z.string(),
        age: z.number(),
      }),
    }
  );

rolMonad.registerControllers(rolRouter);

export default rolRouter;
