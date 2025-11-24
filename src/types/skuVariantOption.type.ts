export interface SkuVariantOption {
  sku_id: string;
  variant_option_id: string;
  created_at: string;
}

export interface CreateSkuVariantOptionInput {
  sku_id: string;
  variant_option_id: string;
}