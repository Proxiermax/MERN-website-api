import { pool } from "../db/db.js";
import type { User } from "../types/user.type.js";

export const getAllUsers = async (): Promise<User[]> => {
    const { rows } = await pool.query<User>(`
        SELECT id, name, email, created_at, updated_at
        FROM users
        ORDER BY created_at DESC
    `);
    return rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { rows } = await pool.query<User>(
    `SELECT id, name, email, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
};

export const insertUser = async (params: {
  name?: string | null;
  email: string;
  passwordHash: string;
}): Promise<User> => {
  const { name, email, passwordHash } = params;
  const { rows } = await pool.query<User>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at, updated_at`,
    [name ?? null, email, passwordHash]
  );
  const user = rows[0];
  if (!user) {
    throw new Error("FAILED TO INSERT USER");
  }
  return user;
};

export const updateUserById = async (
  id: string,
  params: { name?: string | null; email?: string; passwordHash?: string }
): Promise<User | null> => {
  const { name, email, passwordHash } = params;
  const { rows } = await pool.query<User>(
    `UPDATE users
       SET name = COALESCE($2, name),
           email = COALESCE($3, email),
           password_hash = COALESCE($4, password_hash),
           updated_at = now()
     WHERE id = $1
     RETURNING id, name, email, created_at, updated_at`,
    [id, name ?? null, email ?? null, passwordHash ?? null]
  );
  return rows[0] ?? null;
};

export const deleteUserById = async (id: string): Promise<boolean> => {
  const { rowCount } = await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
  return rowCount === 1;
};