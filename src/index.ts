import { config as loadEnv } from "dotenv";
loadEnv();

import express, { type Request, type Response } from "express";
import { pool } from "./db/db.js";
import usersRouter from "./routes/user.route.js";
import addressRouter from "./routes/address.route.js";
import categoriesRouter from "./routes/category.route.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/addresses", addressRouter);
app.use("/categories", categoriesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript backend!");
});

app.get("/ping/db", async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    res.status(200).json({ db: "UP" });
  } catch (err) {
    console.error("DATABASE CONNECTION ERROR:", err);
    res.status(500).json({ db: "DOWN" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER running on http://localhost:${PORT}`);
})