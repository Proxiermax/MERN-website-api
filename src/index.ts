import { config as loadEnv } from "dotenv";
loadEnv();

import express, { type Request, type Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript backend!");
});

app.listen(PORT, () => {
  console.log(`SERVER running on http://localhost:${PORT}`);
})