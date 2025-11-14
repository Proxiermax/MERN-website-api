import {
  getAllCategories,
  getCategoriesByParent,
  getCategoryById,
  insertCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../repositories/category.repo.js";
import type { Category } from "../types/category.type.js";

export const listCategories = async (parentId?: string): Promise<Category[]> => {
  return parentId ? getCategoriesByParent(parentId) : getAllCategories();
};

export const getCategory = async (id: string): Promise<Category | null> => getCategoryById(id);

export const createCategory = async (payload: { parent_id?: string | null; name: string; }): Promise<Category> => {
  if (payload.parent_id) {
    const parent = await getCategoryById(payload.parent_id);
    if (!parent) throw new Error("Parent category not found");
  }
  return insertCategory(payload);
};

export const updateCategory = async (id: string, payload: { parent_id?: string | null; name?: string; }): Promise<Category | null> => {
  if (payload.parent_id) {
    const parent = await getCategoryById(payload.parent_id);
    if (!parent) throw new Error("Parent category not found");
    if (payload.parent_id === id) throw new Error("Category cannot be its own parent");
  }
  return updateCategoryById(id, payload);
};

export const removeCategory = async (id: string): Promise<boolean> => {
  return deleteCategoryById(id);
};