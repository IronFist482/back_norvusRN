import express, { Express } from "express";
import cors from "cors";

import "./utils/config";
import { RolRoutes } from "./routes";

export function main() {
  const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

  const app: Express = express();

  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/", async (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
  });

  app.use("/api", RolRoutes);

  app.listen(8080, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:8080`);
  });
}
