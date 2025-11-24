import type {
    VariantOption,
    CreateVariantOptionInput,
    UpdateVariantOptionInput
} from "../types/variantOption.type.js";
import {
    getAllVariantOptions,
    getVariantOptionsByVariant,
    getVariantOptionById,
    insertVariantOption,
    updateVariantOptionById,
    deleteVariantOptionById
} from "../repositories/variantOption.repo.js";
import { getProductVariantById } from "../repositories/productVariant.repo.js";

export const listVariantOptions = async (variantId?: string): Promise<VariantOption[]> =>
    variantId ? getVariantOptionsByVariant(variantId) : getAllVariantOptions();

export const getVariantOption = (id: string): Promise<VariantOption | null> =>
    getVariantOptionById(id);

export const createVariantOption = async (input: CreateVariantOptionInput): Promise<VariantOption> => {
    const variant = await getProductVariantById(input.variant_id);
    if (!variant) throw new Error("Variant not found");
    return insertVariantOption(input);
};

export const updateVariantOption = async (
    id: string,
    input: UpdateVariantOptionInput
): Promise<VariantOption | null> => {
    if (input.variant_id) {
        const variant = await getProductVariantById(input.variant_id);
        if (!variant) throw new Error("Variant not found");
    }
    return updateVariantOptionById(id, input);
};

export const removeVariantOption = (id: string): Promise<boolean> =>
    deleteVariantOptionById(id);