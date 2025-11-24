import { pool } from "../db/db.js";
import type { Product } from "../types/product.type.js";

export const getAllProducts = async (): Promise<Product[]> => {
    const { rows } = await pool.query<Product>(`
    SELECT id, owner_id, category_id, is_active, name, description, price::text AS price,
           sku, quantity, image_url, created_at, updated_at
    FROM products
    ORDER BY created_at DESC
  `);
    return rows;
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    const { rows } = await pool.query<Product>(`
    SELECT id, owner_id, category_id, is_active, name, description, price::text AS price,
           sku, quantity, image_url, created_at, updated_at
    FROM products
    WHERE category_id = $1
    ORDER BY created_at DESC
  `, [categoryId]);
    return rows;
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const { rows } = await pool.query<Product>(`
    SELECT id, owner_id, category_id, is_active, name, description, price::text AS price,
           sku, quantity, image_url, created_at, updated_at
    FROM products
    WHERE id = $1
  `, [id]);
    return rows[0] ?? null;
};

export const insertProduct = async (p: {
    owner_id?: string | null;
    category_id?: string | null;
    is_active: boolean;
    name: string;
    description?: string | null;
    price: string;
    sku: string;
    quantity: number;
    image_url?: string | null;
}): Promise<Product> => {
    const { rows } = await pool.query<Product>(`
    INSERT INTO products (owner_id, category_id, is_active, name, description, price, sku, quantity, image_url)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id, owner_id, category_id, is_active, name, description, price::text AS price,
              sku, quantity, image_url, created_at, updated_at
  `, [
        p.owner_id ?? null,
        p.category_id ?? null,
        p.is_active,
        p.name,
        p.description ?? null,
        p.price,
        p.sku,
        p.quantity,
        p.image_url ?? null
    ]);
    const product = rows[0];
    if (!product) {
        throw new Error("FAILED TO INSERT PRODUCT");
    }
    return product;
};

export const updateProductById = async (id: string, p: {
    owner_id?: string | null;
    category_id?: string | null;
    is_active?: boolean;
    name?: string;
    description?: string | null;
    price?: string;
    sku?: string;
    quantity?: number;
    image_url?: string | null;
}): Promise<Product | null> => {
    const { rows } = await pool.query<Product>(`
    UPDATE products
    SET owner_id = COALESCE($2, owner_id),
        category_id = COALESCE($3, category_id),
        is_active = COALESCE($4, is_active),
        name = COALESCE($5, name),
        description = COALESCE($6, description),
        price = COALESCE($7, price),
        sku = COALESCE($8, sku),
        quantity = COALESCE($9, quantity),
        image_url = COALESCE($10, image_url),
        updated_at = now()
    WHERE id = $1
    RETURNING id, owner_id, category_id, is_active, name, description, price::text AS price,
              sku, quantity, image_url, created_at, updated_at
  `, [
        id,
        p.owner_id ?? null,
        p.category_id ?? null,
        p.is_active ?? null,
        p.name ?? null,
        p.description ?? null,
        p.price ?? null,
        p.sku ?? null,
        p.quantity ?? null,
        p.image_url ?? null
    ]);
    return rows[0] ?? null;
};

export const deleteProductById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
    return rowCount === 1;
};