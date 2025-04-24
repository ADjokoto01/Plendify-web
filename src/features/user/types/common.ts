type Purchase = {
  id: string;

  cart_id: string | null;
  products: {
    product_id: string;
    shop_id: string | null;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image_url: string;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  promo_code_id: string | null;
  discount: number;
  shipping_details: {
    shipping_method: string;
    shipping_address: string;
    shipping_date: string;
  };
  payment_details: {
    payment_method: string;
    transaction_id: string;
    amount: number;
    currency: string;
    status: string;
    payment_date: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
  };
};

export type AllPurchasesResponse = {
  purchases: Purchase[];
};

export type PersonalDetailsResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};

export type UserResponse = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};
