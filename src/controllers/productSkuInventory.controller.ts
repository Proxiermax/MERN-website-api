import { type Request, type Response } from "express";
import {
  listSkuInventory,
  getSkuInventory,
  createSkuInventory,
  updateSkuInventory,
  removeSkuInventory
} from "../services/productSkuInventory.service.js";

export const getSkuInventoryItemsHandler = async (req: Request, res: Response) => {
  try {
    const productId = (req.query.productId as string) || undefined;
    const items = await listSkuInventory(productId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getSkuInventoryItemsHandler:", err);
    res.status(500).json({ error: "Failed to fetch SKU inventory" });
  }
};

export const getSkuInventoryItemByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await getSkuInventory(id);
    if (!item) return res.status(404).json({ error: "SKU inventory item not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getSkuInventoryItemByIdHandler:", err);
    res.status(500).json({ error: "Failed to fetch SKU inventory item" });
  }
};

export const createSkuInventoryItemHandler = async (req: Request, res: Response) => {
  try {
    const { product_id, sku, price, quantity } = req.body ?? {};
    if (!product_id || !sku || !price) {
      return res.status(400).json({ error: "product_id, sku, price required" });
    }
    const item = await createSkuInventory({ product_id, sku, price, quantity });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "Product not found") return res.status(400).json({ error: err.message });
    if (err?.message === "SKU already exists") return res.status(409).json({ error: err.message });
    console.error("createSkuInventoryItemHandler:", err);
    res.status(500).json({ error: "Failed to create SKU inventory item" });
  }
};

export const updateSkuInventoryItemHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await updateSkuInventory(id, req.body ?? {});
    if (!item) return res.status(404).json({ error: "SKU inventory item not found" });
    res.status(200).json(item);
  } catch (err: any) {
    if (err?.message === "Product not found") return res.status(400).json({ error: err.message });
    if (err?.message === "SKU already exists") return res.status(409).json({ error: err.message });
    console.error("updateSkuInventoryItemHandler:", err);
    res.status(500).json({ error: "Failed to update SKU inventory item" });
  }
};

export const deleteSkuInventoryItemHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const ok = await removeSkuInventory(id);
    if (!ok) return res.status(404).json({ error: "SKU inventory item not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteSkuInventoryItemHandler:", err);
    res.status(500).json({ error: "Failed to delete SKU inventory item" });
  }
};