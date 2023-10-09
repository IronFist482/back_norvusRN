import express, { Express } from "express";
import cors from "cors";

import { config } from "./utils";
import { MainRoutes } from "./routes";

export function main() {
  const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

  const app: Express = express();

  app.use(express.json());
  app.use(cors(corsOptions));

  app.use(config.Constants.GLOBAL_PREFIX, MainRoutes);

  app.listen(config.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at ${
        config.env.NODE_ENV === "development"
          ? `http://localhost:${config.env.PORT}`
          : config.env.APP_URL
      }`
    );
  });
}
