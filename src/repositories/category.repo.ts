import { pool } from "../db/db.js";
import type { Category } from "../types/category.type.js";

export const getAllCategories = async (): Promise<Category[]> => {
    const { rows } = await pool.query<Category>(`
        SELECT id, parent_id, name, created_at, updated_at
        FROM categories
        ORDER BY created_at DESC
    `);
    return rows;
};

export const getCategoriesByParent = async (parentId: string): Promise<Category[]> => {
    const { rows } = await pool.query<Category>(`
    SELECT id, parent_id, name, created_at, updated_at
        FROM categories
        WHERE parent_id = $1
        ORDER BY created_at DESC
    `, [parentId]);
    return rows;
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
    const { rows } = await pool.query<Category>(`
        SELECT id, parent_id, name, created_at, updated_at
        FROM categories
        WHERE id = $1
    `, [id]);
    const category = rows[0];
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
};

export const insertCategory = async (payload: {
    parent_id?: string | null;
    name: string;
}): Promise<Category> => {
    const { rows } = await pool.query<Category>(`
        INSERT INTO categories (parent_id, name)
        VALUES ($1, $2)
        RETURNING id, parent_id, name, created_at, updated_at
    `, [payload.parent_id ?? null, payload.name]);
    const category = rows[0];
    if (!category) {
        throw new Error("Failed to create category");
    }
    return category;
};

export const updateCategoryById = async (id: string, payload: {
    parent_id?: string | null;
    name?: string;
}): Promise<Category | null> => {
    const { rows } = await pool.query<Category>(`
        UPDATE categories
        SET parent_id = COALESCE($2, parent_id),
            name = COALESCE($3, name),
            updated_at = now()
        WHERE id = $1
        RETURNING id, parent_id, name, created_at, updated_at
    `, [id, payload.parent_id ?? null, payload.name ?? null]);
    const category = rows[0];
    if (!category) {
        throw new Error("Failed to update category");
    }
    return category;
};

export const deleteCategoryById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return rowCount === 1;
};