import { Router } from "express";
import {
  createController,
  type Controller,
  registerControllers,
} from "../../middlewares";
import z from "zod";

const rolRouter = Router();

const rolRoutes: Controller[] = [
  createController("/prueba", "get", {}, async (req, res) => {
    res.json({
      message: "Hello World!",
    });
  }),
  createController(
    "/prueba",
    "post",
    {
      body: z.object({
        name: z.string(),
        age: z.number(),
      }),
    },
    async (req, res) => {
      res.json({
        message: "parsed!",
        body: req.body,
      });
    }
  ),
];

registerControllers(rolRouter, rolRoutes);

export default rolRouter;
