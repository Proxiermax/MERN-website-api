import { pool } from "../db/db.js";
import type { SkuVariantOption } from "../types/skuVariantOption.type.js";

export const getAllSkuVariantOptions = async (): Promise<SkuVariantOption[]> => {
  const { rows } = await pool.query<SkuVariantOption>(`
    SELECT sku_id, variant_option_id, created_at
    FROM sku_variant_options
    ORDER BY created_at DESC
  `);
  return rows;
};

export const getSkuVariantOptionsBySku = async (skuId: string): Promise<SkuVariantOption[]> => {
  const { rows } = await pool.query<SkuVariantOption>(`
    SELECT sku_id, variant_option_id, created_at
    FROM sku_variant_options
    WHERE sku_id = $1
    ORDER BY created_at DESC
  `, [skuId]);
  return rows;
};

export const getSkuVariantOptionsByVariantOption = async (variantOptionId: string): Promise<SkuVariantOption[]> => {
  const { rows } = await pool.query<SkuVariantOption>(`
    SELECT sku_id, variant_option_id, created_at
    FROM sku_variant_options
    WHERE variant_option_id = $1
    ORDER BY created_at DESC
  `, [variantOptionId]);
  return rows;
};

export const getSkuVariantOption = async (skuId: string, variantOptionId: string): Promise<SkuVariantOption | null> => {
  const { rows } = await pool.query<SkuVariantOption>(`
    SELECT sku_id, variant_option_id, created_at
    FROM sku_variant_options
    WHERE sku_id = $1 AND variant_option_id = $2
  `, [skuId, variantOptionId]);
  return rows[0] ?? null;
};

export const insertSkuVariantOption = async (data: { sku_id: string; variant_option_id: string; }): Promise<SkuVariantOption> => {
  const { rows } = await pool.query<SkuVariantOption>(`
    INSERT INTO sku_variant_options (sku_id, variant_option_id)
    VALUES ($1, $2)
    RETURNING sku_id, variant_option_id, created_at
  `, [data.sku_id, data.variant_option_id]);
    const skuVariantOption = rows[0];
    if (!skuVariantOption) {
        throw new Error("Failed to create SKU variant option");
    }
    return skuVariantOption;
};

export const deleteSkuVariantOption = async (skuId: string, variantOptionId: string): Promise<boolean> => {
  const { rowCount } = await pool.query(`
    DELETE FROM sku_variant_options
    WHERE sku_id = $1 AND variant_option_id = $2
  `, [skuId, variantOptionId]);
  return rowCount === 1;
};