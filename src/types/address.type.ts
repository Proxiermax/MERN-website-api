export type AddressType = "billing" | "shipping" | "both";

export interface Address {
  id: string;
  user_id: string;
  street: string | null;
  city: string | null;
  zip_code: string | null;
  country: string | null;
  address_type: AddressType;
  created_at: string;
  updated_at: string;
}