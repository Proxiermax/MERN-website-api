import { pool } from "../db/db.js";
import type { ProductSkuInventory } from "../types/productSkuInventory.type.js";

export const getAllSkuInventory = async (): Promise<ProductSkuInventory[]> => {
    const { rows } = await pool.query<ProductSkuInventory>(`
    SELECT id, product_id, sku, price::text AS price, quantity, created_at, updated_at
    FROM product_sku_inventory
    ORDER BY created_at DESC
  `);
    return rows;
};

export const getSkuInventoryByProduct = async (productId: string): Promise<ProductSkuInventory[]> => {
    const { rows } = await pool.query<ProductSkuInventory>(`
    SELECT id, product_id, sku, price::text AS price, quantity, created_at, updated_at
    FROM product_sku_inventory
    WHERE product_id = $1
    ORDER BY created_at DESC
  `, [productId]);
    return rows;
};

export const getSkuInventoryById = async (id: string): Promise<ProductSkuInventory | null> => {
    const { rows } = await pool.query<ProductSkuInventory>(`
    SELECT id, product_id, sku, price::text AS price, quantity, created_at, updated_at
    FROM product_sku_inventory
    WHERE id = $1
  `, [id]);
    return rows[0] ?? null;
};

export const insertSkuInventory = async (d: {
    product_id: string;
    sku: string;
    price: string;
    quantity: number;
}): Promise<ProductSkuInventory> => {
    const { rows } = await pool.query<ProductSkuInventory>(`
    INSERT INTO product_sku_inventory (product_id, sku, price, quantity)
    VALUES ($1,$2,$3,$4)
    RETURNING id, product_id, sku, price::text AS price, quantity, created_at, updated_at
  `, [d.product_id, d.sku, d.price, d.quantity]);
    const skuInventory = rows[0];
    if (!skuInventory) {
        throw new Error("Failed to create SKU inventory");
    }

    return skuInventory;
};

export const updateSkuInventoryById = async (
    id: string,
    d: { product_id?: string; sku?: string; price?: string; quantity?: number; }
): Promise<ProductSkuInventory | null> => {
    const { rows } = await pool.query<ProductSkuInventory>(`
    UPDATE product_sku_inventory
    SET product_id = COALESCE($2, product_id),
        sku        = COALESCE($3, sku),
        price      = COALESCE($4, price),
        quantity   = COALESCE($5, quantity),
        updated_at = now()
    WHERE id = $1
    RETURNING id, product_id, sku, price::text AS price, quantity, created_at, updated_at
  `, [
        id,
        d.product_id ?? null,
        d.sku ?? null,
        d.price ?? null,
        d.quantity ?? null
    ]);
    return rows[0] ?? null;
};

export const deleteSkuInventoryById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM product_sku_inventory WHERE id = $1`, [id]);
    return rowCount === 1;
};