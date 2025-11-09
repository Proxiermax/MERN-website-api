import { type Request, type Response } from "express";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from "../services/user.service.js";

export const getUsersHandler = async (_req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("getUsersHandler:", err);
    res.status(500).json({ error: "FAILED TO FETCH USERS" });
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params ?? {};
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const user = await getUser(id);
    if (!user) return res.status(404).json({ error: "USER NOT FOUND" });
    res.status(200).json(user);
  } catch (err) {
    console.error("getUserByIdHandler:", err);
    res.status(500).json({ error: "FAILED TO FETCH USER" });
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "EMAIL AND PASSWORD ARE REQUIRED" });
    }
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err: any) {
    if (err?.message === "EMAIL ALREADY EXISTS") {
      return res.status(409).json({ error: err.message });
    }
    console.error("createUserHandler:", err);
    res.status(500).json({ error: "FAILED TO CREATE USER" });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params ?? {};
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const user = await updateUser(id, req.body ?? {});
    if (!user) return res.status(404).json({ error: "USER NOT FOUND" });
    res.status(200).json(user);
  } catch (err: any) {
    if (err?.message === "EMAIL ALREADY EXISTS") {
      return res.status(409).json({ error: err.message });
    }
    console.error("updateUserHandler:", err);
    res.status(500).json({ error: "FAILED TO UPDATE USER" });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params ?? {};
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const ok = await removeUser(id);
    if (!ok) return res.status(404).json({ error: "USER NOT FOUND" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteUserHandler:", err);
    res.status(500).json({ error: "FAILED TO DELETE USER" });
  }
};