import { type Request, type Response } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} from "../services/product.service.js";

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const categoryId = (req.query.categoryId as string) || undefined;
    const items = await listProducts(categoryId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getProductsHandler:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await getProduct(id);
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getProductByIdHandler:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body ?? {};
    if (!body.name || !body.price || !body.sku) return res.status(400).json({ error: "name, price and sku are required" });
    const item = await createProduct(body);
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "Owner not found" || err?.message === "Category not found") return res.status(400).json({ error: err.message });
    if (err?.message?.includes("Duplicate")) return res.status(409).json({ error: err.message });
    console.error("createProductHandler:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await updateProduct(id, req.body ?? {});
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(item);
  } catch (err: any) {
    if (err?.message === "Owner not found" || err?.message === "Category not found") return res.status(400).json({ error: err.message });
    if (err?.message?.includes("Duplicate")) return res.status(409).json({ error: err.message });
    console.error("updateProductHandler:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const ok = await removeProduct(id);
    if (!ok) return res.status(404).json({ error: "Product not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteProductHandler:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};