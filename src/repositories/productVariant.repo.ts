import { pool } from "../db/db.js";
import type { ProductVariant } from "../types/productVariant.type.js";

export const getAllProductVariants = async (): Promise<ProductVariant[]> => {
    const { rows } = await pool.query<ProductVariant>(`
    SELECT id, product_id, name, created_at, updated_at
    FROM product_variants
    ORDER BY created_at DESC
  `);
    return rows;
};

export const getProductVariantsByProduct = async (productId: string): Promise<ProductVariant[]> => {
    const { rows } = await pool.query<ProductVariant>(`
    SELECT id, product_id, name, created_at, updated_at
    FROM product_variants
    WHERE product_id = $1
    ORDER BY created_at DESC
  `, [productId]);
    return rows;
};

export const getProductVariantById = async (id: string): Promise<ProductVariant | null> => {
    const { rows } = await pool.query<ProductVariant>(`
    SELECT id, product_id, name, created_at, updated_at
    FROM product_variants
    WHERE id = $1
  `, [id]);
    return rows[0] ?? null;
};

export const insertProductVariant = async (data: { product_id: string; name: string; }): Promise<ProductVariant> => {
    const { rows } = await pool.query<ProductVariant>(`
    INSERT INTO product_variants (product_id, name)
    VALUES ($1, $2)
    RETURNING id, product_id, name, created_at, updated_at
  `, [data.product_id, data.name]);
    const productVariant = rows[0];
    if (!productVariant) {
        throw new Error("Failed to create product variant");
    }
    return productVariant;
};

export const updateProductVariantById = async (
    id: string,
    data: { product_id?: string; name?: string; }
): Promise<ProductVariant | null> => {
    const { rows } = await pool.query<ProductVariant>(`
    UPDATE product_variants
    SET product_id = COALESCE($2, product_id),
        name = COALESCE($3, name),
        updated_at = now()
    WHERE id = $1
    RETURNING id, product_id, name, created_at, updated_at
  `, [id, data.product_id ?? null, data.name ?? null]);
    return rows[0] ?? null;
};

export const deleteProductVariantById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM product_variants WHERE id = $1`, [id]);
    return rowCount === 1;
};