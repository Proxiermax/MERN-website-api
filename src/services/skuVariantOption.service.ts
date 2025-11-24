import type { SkuVariantOption, CreateSkuVariantOptionInput } from "../types/skuVariantOption.type.js";
import {
  getAllSkuVariantOptions,
  getSkuVariantOptionsBySku,
  getSkuVariantOptionsByVariantOption,
  getSkuVariantOption,
  insertSkuVariantOption,
  deleteSkuVariantOption
} from "../repositories/skuVariantOption.repo.js";
import { getSkuInventoryById } from "../repositories/productSkuInventory.repo.js";
import { getVariantOptionById } from "../repositories/variantOption.repo.js";

export const listSkuVariantOptions = async (skuId?: string, variantOptionId?: string): Promise<SkuVariantOption[]> => {
  if (skuId) return getSkuVariantOptionsBySku(skuId);
  if (variantOptionId) return getSkuVariantOptionsByVariantOption(variantOptionId);
  return getAllSkuVariantOptions();
};

export const getSkuVariantOptionPair = (skuId: string, variantOptionId: string) =>
  getSkuVariantOption(skuId, variantOptionId);

export const createSkuVariantOption = async (input: CreateSkuVariantOptionInput): Promise<SkuVariantOption> => {
  const sku = await getSkuInventoryById(input.sku_id);
  if (!sku) throw new Error("SKU not found");
  const variantOption = await getVariantOptionById(input.variant_option_id);
  if (!variantOption) throw new Error("Variant option not found");
  const existing = await getSkuVariantOption(input.sku_id, input.variant_option_id);
  if (existing) throw new Error("Link already exists");
  return insertSkuVariantOption(input);
};

export const removeSkuVariantOption = (skuId: string, variantOptionId: string) =>
  deleteSkuVariantOption(skuId, variantOptionId);