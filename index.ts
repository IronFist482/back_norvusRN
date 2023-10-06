import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

app.listen(3024, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3024`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
