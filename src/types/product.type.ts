export type Product = {
  id: string;
  owner_id: string | null;
  category_id: string | null;
  is_active: boolean;
  name: string;
  description: string | null;
  price: string;
  sku: string;
  quantity: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateProductInput = {
  owner_id?: string | null;
  category_id?: string | null;
  is_active?: boolean;
  name: string;
  description?: string | null;
  price: string;
  sku: string;
  quantity?: number;
  image_url?: string | null;
};

export type UpdateProductInput = Partial<CreateProductInput>;