import "dotenv/config";
import { Pool } from "pg";

const required = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
};

export const pool = new Pool({
  host: process.env.PG_HOST ?? "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  user: required("PG_USER"),
  password: required("PG_PASSWORD"),
  database: required("PG_DATABASE"),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false
});

export const query = (text: string, params?: any[]) => pool.query(text, params);