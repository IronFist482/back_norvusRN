import express, { Express } from "express";
import dotenv from "dotenv";
import { getSignIn, getUsers } from "./database";
import cors from "cors";

import "./utils/config";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app: Express = express();

app.use(express.json());
app.use(cors(corsOptions));

app.listen(8080, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8080`);
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

app.get("/getSignIn/", async (req, res) => {
  const params = req.query;
  res.status(200).json();
});

app.get("/getUsuario/:id", async (req, res) => {
  const response = await getUsers(parseInt(req.params.id));
  res.status(200).json(response);
});
