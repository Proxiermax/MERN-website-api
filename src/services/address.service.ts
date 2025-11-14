import type { Address } from "../types/address.type.js";
import {
    getAllAddresses,
    getAddressesByUserId,
    getAddressById,
    insertAddress,
    updateAddressById,
    deleteAddressById,
} from "../repositories/address.repo.js";

const VALID_TYPES = new Set(["billing", "shipping", "both"] as const);

export const listAddresses = async (userId?: string): Promise<Address[]> => {
    return userId ? getAddressesByUserId(userId) : getAllAddresses();
};

export const getAddress = async (id: string): Promise<Address | null> => getAddressById(id);

export const createAddress = async (payload: {
    user_id: string;
    street?: string | null;
    city?: string | null;
    zip_code?: string | null;
    country?: string | null;
    address_type: string;
}): Promise<Address> => {
    if (!VALID_TYPES.has(payload.address_type as any)) {
        throw new Error("Invalid address_type");
    }
    return insertAddress({ ...payload, address_type: payload.address_type as any });
};

export const updateAddress = async (id: string, payload: {
    street?: string | null;
    city?: string | null;
    zip_code?: string | null;
    country?: string | null;
    address_type?: string;
}): Promise<Address | null> => {
    if (payload.address_type && !VALID_TYPES.has(payload.address_type as any)) {
        throw new Error("Invalid address_type");
    }
    return updateAddressById(id, { ...payload, address_type: payload.address_type as any });
};

export const removeAddress = async (id: string): Promise<boolean> => deleteAddressById(id); 