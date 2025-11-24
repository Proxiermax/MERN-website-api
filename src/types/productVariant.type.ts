export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductVariantInput {
  product_id: string;
  name: string;
}

export type UpdateProductVariantInput = Partial<CreateProductVariantInput>;