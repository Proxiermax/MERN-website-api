import type {
  ProductSkuInventory,
  CreateProductSkuInventoryInput,
  UpdateProductSkuInventoryInput
} from "../types/productSkuInventory.type.js";
import {
  getAllSkuInventory,
  getSkuInventoryByProduct,
  getSkuInventoryById,
  insertSkuInventory,
  updateSkuInventoryById,
  deleteSkuInventoryById
} from "../repositories/productSkuInventory.repo.js";
import { getProductById } from "../repositories/product.repo.js";

export const listSkuInventory = async (productId?: string): Promise<ProductSkuInventory[]> =>
  productId ? getSkuInventoryByProduct(productId) : getAllSkuInventory();

export const getSkuInventory = (id: string): Promise<ProductSkuInventory | null> =>
  getSkuInventoryById(id);

export const createSkuInventory = async (input: CreateProductSkuInventoryInput): Promise<ProductSkuInventory> => {
  const product = await getProductById(input.product_id);
  if (!product) throw new Error("Product not found");
  const payload = {
    product_id: input.product_id,
    sku: input.sku,
    price: input.price,
    quantity: input.quantity ?? 0
  };
  try {
    return await insertSkuInventory(payload);
  } catch (err: any) {
    if (err?.code === "23505") throw new Error("SKU already exists");
    throw err;
  }
};

export const updateSkuInventory = async (
  id: string,
  input: UpdateProductSkuInventoryInput
): Promise<ProductSkuInventory | null> => {
  if (input.product_id) {
    const product = await getProductById(input.product_id);
    if (!product) throw new Error("Product not found");
  }
  try {
    return await updateSkuInventoryById(id, input);
  } catch (err: any) {
    if (err?.code === "23505") throw new Error("SKU already exists");
    throw err;
  }
};

export const removeSkuInventory = (id: string): Promise<boolean> =>
  deleteSkuInventoryById(id);