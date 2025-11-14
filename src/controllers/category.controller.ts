import { type Request, type Response } from "express";
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} from "../services/category.service.js";

export const getCategoriesHandler = async (req: Request, res: Response) => {
  try {
    const parentId = (req.query.parentId as string) || undefined;
    const items = await listCategories(parentId);
    res.status(200).json(items);
  } catch (err) {
    console.error("getCategoriesHandler:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "id is required" });
    const item = await getCategory(id);
    if (!item) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("getCategoryByIdHandler:", err);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { parent_id, name } = req.body ?? {};
    if (!name) return res.status(400).json({ error: "name is required" });
    const item = await createCategory({ parent_id, name });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.message === "Parent category not found") return res.status(400).json({ error: err.message });
    console.error("createCategoryHandler:", err);
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "id is required" });
    const item = await updateCategory(id, req.body ?? {});
    if (!item) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(item);
  } catch (err: any) {
    if (err?.message === "Parent category not found" || err?.message === "Category cannot be its own parent") {
      return res.status(400).json({ error: err.message });
    }
    console.error("updateCategoryHandler:", err);
    res.status(500).json({ error: "Failed to update category" });
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID PARAMETER IS REQUIRED" });
    const ok = await removeCategory(id);
    if (!ok) return res.status(404).json({ error: "Category not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteCategoryHandler:", err);
    res.status(500).json({ error: "Failed to delete category" });
  }
};