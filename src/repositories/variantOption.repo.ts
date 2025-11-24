import { pool } from "../db/db.js";
import type { VariantOption } from "../types/variantOption.type.js";

export const getAllVariantOptions = async (): Promise<VariantOption[]> => {
    const { rows } = await pool.query<VariantOption>(`
    SELECT id, variant_id, value, created_at, updated_at
    FROM variant_options
    ORDER BY created_at DESC
  `);
    return rows;
};

export const getVariantOptionsByVariant = async (variantId: string): Promise<VariantOption[]> => {
    const { rows } = await pool.query<VariantOption>(`
    SELECT id, variant_id, value, created_at, updated_at
    FROM variant_options
    WHERE variant_id = $1
    ORDER BY created_at DESC
  `, [variantId]);
    return rows;
};

export const getVariantOptionById = async (id: string): Promise<VariantOption | null> => {
    const { rows } = await pool.query<VariantOption>(`
    SELECT id, variant_id, value, created_at, updated_at
    FROM variant_options
    WHERE id = $1
  `, [id]);
    return rows[0] ?? null;
};

export const insertVariantOption = async (d: { variant_id: string; value: string; }): Promise<VariantOption> => {
    const { rows } = await pool.query<VariantOption>(`
    INSERT INTO variant_options (variant_id, value)
    VALUES ($1, $2)
    RETURNING id, variant_id, value, created_at, updated_at
  `, [d.variant_id, d.value]);
    const variantOption = rows[0];
    if (!variantOption) {
        throw new Error("Failed to create variant option");
    }
    return variantOption;
};

export const updateVariantOptionById = async (
    id: string,
    d: { variant_id?: string; value?: string; }
): Promise<VariantOption | null> => {
    const { rows } = await pool.query<VariantOption>(`
    UPDATE variant_options
    SET variant_id = COALESCE($2, variant_id),
        value = COALESCE($3, value),
        updated_at = now()
    WHERE id = $1
    RETURNING id, variant_id, value, created_at, updated_at
  `, [id, d.variant_id ?? null, d.value ?? null]);
    return rows[0] ?? null;
};

export const deleteVariantOptionById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM variant_options WHERE id = $1`, [id]);
    return rowCount === 1;
};