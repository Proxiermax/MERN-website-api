import { type Request, type Response } from "express";
import {
  listSkuVariantOptions,
  getSkuVariantOptionPair,
  createSkuVariantOption,
  removeSkuVariantOption
} from "../services/skuVariantOption.service.js";

export const getSkuVariantOptionsHandler = async (req: Request, res: Response) => {
  try {
    const skuId = (req.query.skuId as string) || undefined;
    const variantOptionId = (req.query.variantOptionId as string) || undefined;
    const items = await listSkuVariantOptions(skuId, variantOptionId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getSkuVariantOptionsHandler:", err);
    res.status(500).json({ error: "Failed to fetch sku_variant_options" });
  }
};

export const getSkuVariantOptionHandler = async (
  req: Request<{ skuId: string; variantOptionId: string }>,
  res: Response
) => {
  try {
    const { skuId, variantOptionId } = req.params;
    if (!skuId || !variantOptionId) {
      return res.status(400).json({ error: "skuId and variantOptionId required" });
    }
    const item = await getSkuVariantOptionPair(skuId, variantOptionId);
    if (!item) return res.status(404).json({ error: "Link not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getSkuVariantOptionHandler:", err);
    res.status(500).json({ error: "Failed to fetch link" });
  }
};

export const createSkuVariantOptionHandler = async (req: Request, res: Response) => {
  try {
    const { sku_id, variant_option_id } = req.body ?? {};
    if (!sku_id || !variant_option_id)
      return res.status(400).json({ error: "sku_id and variant_option_id required" });
    const item = await createSkuVariantOption({ sku_id, variant_option_id });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "SKU not found" || err?.message === "Variant option not found")
      return res.status(400).json({ error: err.message });
    if (err?.message === "Link already exists")
      return res.status(409).json({ error: err.message });
    console.error("createSkuVariantOptionHandler:", err);
    res.status(500).json({ error: "Failed to create link" });
  }
};

export const deleteSkuVariantOptionHandler = async (
  req: Request<{ skuId: string; variantOptionId: string }>,
  res: Response
) => {
  try {
    const { skuId, variantOptionId } = req.params;
    if (!skuId || !variantOptionId) {
      return res.status(400).json({ error: "skuId and variantOptionId required" });
    }
    const ok = await removeSkuVariantOption(skuId, variantOptionId);
    if (!ok) return res.status(404).json({ error: "Link not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteSkuVariantOptionHandler:", err);
    res.status(500).json({ error: "Failed to delete link" });
  }
};