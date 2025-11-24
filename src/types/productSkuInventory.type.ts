export interface ProductSkuInventory {
  id: string;
  product_id: string;
  sku: string;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductSkuInventoryInput {
  product_id: string;
  sku: string;
  price: string;
  quantity?: number;
}

export type UpdateProductSkuInventoryInput = Partial<CreateProductSkuInventoryInput>;