import { type Request, type Response } from "express";
import {
  listProductVariants,
  getProductVariant,
  createProductVariant,
  updateProductVariant,
  removeProductVariant
} from "../services/productVariant.service.js";

export const getProductVariantsHandler = async (req: Request, res: Response) => {
  try {
    const productId = (req.query.productId as string) || undefined;
    const items = await listProductVariants(productId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getProductVariantsHandler:", err);
    res.status(500).json({ error: "Failed to fetch product variants" });
  }
};

export const getProductVariantByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await getProductVariant(id);
    if (!item) return res.status(404).json({ error: "Product variant not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getProductVariantByIdHandler:", err);
    res.status(500).json({ error: "Failed to fetch product variant" });
  }
};

export const createProductVariantHandler = async (req: Request, res: Response) => {
  try {
    const { product_id, name } = req.body ?? {};
    if (!product_id || !name) return res.status(400).json({ error: "product_id and name are required" });
    const item = await createProductVariant({ product_id, name });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "Product not found") return res.status(400).json({ error: err.message });
    console.error("createProductVariantHandler:", err);
    res.status(500).json({ error: "Failed to create product variant" });
  }
};

export const updateProductVariantHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const item = await updateProductVariant(id, req.body ?? {});
    if (!item) return res.status(404).json({ error: "Product variant not found" });
    res.status(200).json(item);
  } catch (err: any) {
    if (err?.message === "Product not found") return res.status(400).json({ error: err.message });
    console.error("updateProductVariantHandler:", err);
    res.status(500).json({ error: "Failed to update product variant" });
  }
};

export const deleteProductVariantHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID parameter is required" });
    const ok = await removeProductVariant(id);
    if (!ok) return res.status(404).json({ error: "Product variant not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteProductVariantHandler:", err);
    res.status(500).json({ error: "Failed to delete product variant" });
  }
};