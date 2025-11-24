import type {
    ProductVariant,
    CreateProductVariantInput,
    UpdateProductVariantInput
} from "../types/productVariant.type.js";
import {
    getAllProductVariants,
    getProductVariantsByProduct,
    getProductVariantById,
    insertProductVariant,
    updateProductVariantById,
    deleteProductVariantById
} from "../repositories/productVariant.repo.js";
import { getProductById } from "../repositories/product.repo.js";

export const listProductVariants = async (productId?: string): Promise<ProductVariant[]> =>
    productId ? getProductVariantsByProduct(productId) : getAllProductVariants();

export const getProductVariant = (id: string): Promise<ProductVariant | null> =>
    getProductVariantById(id);

export const createProductVariant = async (input: CreateProductVariantInput): Promise<ProductVariant> => {
    const product = await getProductById(input.product_id);
    if (!product) throw new Error("Product not found");
    return insertProductVariant(input);
};

export const updateProductVariant = async (
    id: string,
    input: UpdateProductVariantInput
): Promise<ProductVariant | null> => {
    if (input.product_id) {
        const product = await getProductById(input.product_id);
        if (!product) throw new Error("Product not found");
    }
    return updateProductVariantById(id, input);
};

export const removeProductVariant = (id: string): Promise<boolean> =>
    deleteProductVariantById(id);