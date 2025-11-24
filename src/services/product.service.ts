import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "../types/product.type.js";
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
} from "../repositories/product.repo.js";
import { getUserById } from "../repositories/user.repo.js";
import { getCategoryById } from "../repositories/category.repo.js";

export const listProducts = async (categoryId?: string): Promise<Product[]> => {
  return categoryId ? getProductsByCategory(categoryId) : getAllProducts();
};

export const getProduct = async (id: string): Promise<Product | null> =>
  getProductById(id);

export const createProduct = async (
  input: CreateProductInput
): Promise<Product> => {
  if (input.owner_id) {
    const owner = await getUserById(input.owner_id);
    if (!owner) throw new Error("Owner not found");
  }
  if (input.category_id) {
    const cat = await getCategoryById(input.category_id);
    if (!cat) throw new Error("Category not found");
  }
  const payload = {
    owner_id: input.owner_id ?? null,
    category_id: input.category_id ?? null,
    is_active: input.is_active ?? true,
    name: input.name,
    description: input.description ?? null,
    price: input.price,
    sku: input.sku,
    quantity: input.quantity ?? 0,
    image_url: input.image_url ?? null,
  };
  try {
    return await insertProduct(payload);
  } catch (err: any) {
    if (err?.code === "23505") throw new Error("Duplicate value (likely sku)");
    throw err;
  }
};

export const updateProduct = async (
  id: string,
  input: UpdateProductInput
): Promise<Product | null> => {
  if (input.owner_id) {
    const owner = await getUserById(input.owner_id);
    if (!owner) throw new Error("Owner not found");
  }
  if (input.category_id) {
    const cat = await getCategoryById(input.category_id);
    if (!cat) throw new Error("Category not found");
  }
  try {
    return await updateProductById(id, input as any);
  } catch (err: any) {
    if (err?.code === "23505") throw new Error("Duplicate value (likely sku)");
    throw err;
  }
};

export const removeProduct = async (id: string): Promise<boolean> =>
  deleteProductById(id);
