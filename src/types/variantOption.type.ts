export interface VariantOption {
  id: string;
  variant_id: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface CreateVariantOptionInput {
  variant_id: string;
  value: string;
}

export type UpdateVariantOptionInput = Partial<CreateVariantOptionInput>;