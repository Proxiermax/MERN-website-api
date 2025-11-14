import { pool } from "../db/db.js";
import type { Address, AddressType } from "../types/address.type.js";

export const getAllAddresses = async (): Promise<Address[]> => {
    const { rows } = await pool.query<Address>(`
    SELECT id, user_id, street, city, zip_code, country, address_type, created_at, updated_at
    FROM addresses
    ORDER BY created_at DESC
  `);
    return rows;
};

export const getAddressesByUserId = async (
    userId: string
): Promise<Address[]> => {
    const { rows } = await pool.query<Address>(
        `
    SELECT id, user_id, street, city, zip_code, country, address_type, created_at, updated_at
    FROM addresses
    WHERE user_id = $1
    ORDER BY created_at DESC
  `,
        [userId]
    );
    return rows;
};

export const getAddressById = async (id: string): Promise<Address | null> => {
    const { rows } = await pool.query<Address>(
        `
    SELECT id, user_id, street, city, zip_code, country, address_type, created_at, updated_at
    FROM addresses
    WHERE id = $1
  `,
        [id]
    );
    return rows[0] ?? null;
};

export const insertAddress = async (payload: {
    user_id: string;
    street?: string | null;
    city?: string | null;
    zip_code?: string | null;
    country?: string | null;
    address_type: AddressType;
}): Promise<Address> => {
    const { rows } = await pool.query<Address>(
        `
    INSERT INTO addresses (user_id, street, city, zip_code, country, address_type)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id, user_id, street, city, zip_code, country, address_type, created_at, updated_at
  `,
        [
            payload.user_id,
            payload.street ?? null,
            payload.city ?? null,
            payload.zip_code ?? null,
            payload.country ?? null,
            payload.address_type,
        ]
    );
    const address = rows[0];
    if (!address) {
        throw new Error("FAILED TO INSERT ADDRESS");
    }
    return address;
};

export const updateAddressById = async (
    id: string,
    payload: {
        street?: string | null;
        city?: string | null;
        zip_code?: string | null;
        country?: string | null;
        address_type?: AddressType;
    }
): Promise<Address | null> => {
    const { rows } = await pool.query<Address>(
        `
    UPDATE addresses
    SET street = COALESCE($2, street),
        city = COALESCE($3, city),
        zip_code = COALESCE($4, zip_code),
        country = COALESCE($5, country),
        address_type = COALESCE($6, address_type),
        updated_at = now()
    WHERE id = $1
    RETURNING id, user_id, street, city, zip_code, country, address_type, created_at, updated_at
  `,
        [
            id,
            payload.street ?? null,
            payload.city ?? null,
            payload.zip_code ?? null,
            payload.country ?? null,
            payload.address_type ?? null,
        ]
    );
    return rows[0] ?? null;
};

export const deleteAddressById = async (id: string): Promise<boolean> => {
    const { rowCount } = await pool.query(`DELETE FROM addresses WHERE id = $1`, [
        id,
    ]);
    return rowCount === 1;
};
