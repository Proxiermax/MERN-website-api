import { type Request, type Response } from "express";
import {
  listAddresses,
  getAddress,
  createAddress,
  updateAddress,
  removeAddress,
} from "../services/address.service.js";

export const getAddressesHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || undefined;
    const items = await listAddresses(userId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getAddressesHandler:", err);
    res.status(500).json({ error: "FAILED TO FETCH ADDRESSES" });
  }
};

export const getAddressByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const item = await getAddress(id);
    if (!item) return res.status(404).json({ error: "ADDRESS NOT FOUND" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getAddressByIdHandler:", err);
    res.status(500).json({ error: "FAILED TO FETCH ADDRESS" });
  }
};

export const createAddressHandler = async (req: Request, res: Response) => {
  try {
    const { user_id, street, city, zip_code, country, address_type } = req.body ?? {};
    if (!user_id || !address_type) return res.status(400).json({ error: "USER ID OR ADDRESS TYPE REQUIRED" });
    const item = await createAddress({ user_id, street, city, zip_code, country, address_type });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "Invalid address_type") return res.status(400).json({ error: err.message });
    console.error("createAddressHandler:", err);
    res.status(500).json({ error: "FAILED TO CREATE ADDRESS" });
  }
};

export const updateAddressHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const item = await updateAddress(id, req.body ?? {});
    if (!item) return res.status(404).json({ error: "ADDRESS NOT FOUND" });
    res.status(200).json(item);
  } catch (err: any) {
    if (err?.message === "Invalid address_type") return res.status(400).json({ error: err.message });
    console.error("updateAddressHandler:", err);
    res.status(500).json({ error: "FAILED TO UPDATE ADDRESS" });
  }
};

export const deleteAddressHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const ok = await removeAddress(id);
    if (!ok) return res.status(404).json({ error: "ADDRESS NOT FOUND" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteAddressHandler:", err);
    res.status(500).json({ error: "FAILED TO DELETE ADDRESS" });
  }
};