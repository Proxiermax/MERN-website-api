import bcrypt from "bcryptjs";
import type { User, CreateUserInput, UpdateUserInput } from "../types/user.type.js";
import {
  getAllUsers,
  getUserById,
  insertUser,
  updateUserById,
  deleteUserById,
} from "../repositories/user.repo.js";

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? 12);

export const listUsers = (): Promise<User[]> => getAllUsers();

export const getUser = (id: string): Promise<User | null> => getUserById(id);

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  try {
    return await insertUser({
      name: input.name ?? null,
      email: input.email,
      passwordHash,
    });
  } catch (err: any) {
    if (err?.code === "23505") {
      throw new Error("EMAIL ALREADY EXISTS");
    }
    throw err;
  }
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<User | null> => {
  const passwordHash = input.password ? await bcrypt.hash(input.password, SALT_ROUNDS) : undefined;

  const updateData: { name?: string | null; email?: string; passwordHash?: string } = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.email !== undefined) updateData.email = input.email;
  if (passwordHash !== undefined) updateData.passwordHash = passwordHash;

  try {
    return await updateUserById(id, updateData);
  } catch (err: any) {
    if (err?.code === "23505") {
      throw new Error("EMAIL ALREADY EXISTS");
    }
    throw err;
  }
};

export const removeUser = (id: string): Promise<boolean> => deleteUserById(id);