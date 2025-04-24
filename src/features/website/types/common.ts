import { z } from "zod";

export type SEARCH_RESPONSE = {
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string | null;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: boolean;
    brand_id: string;
    has_free_shipping: boolean;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    brand_name: string;
    average_rating: string;
    review_count: string;
    images: string[];
    discount_percentage: string | null;
    brand: string;
  }[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: false;
    hasPrevPage: false;
  };
  category: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    parent_id: string;
    is_active: boolean;
  };
  subCategories: [];
  filters: {
    price_range: {
      min: number;
      max: number;
    };
    tags: [
      {
        code: string;
        name: string;
        count: number;
      },
      {
        code: string;
        name: string;
        count: number;
      }
    ];
    brands: [
      {
        id: string;
        name: string;
        count: number;
      }
    ];
  };
  sort_options: {
    value: string;
    label: string;
  }[];
};

export type PRODUCT_RESPONSE = {
  shop_logo_url: string | null | undefined;

  product_instructions: string;
  product_details: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    shop_logo_url: string;
    product_details: string;
    product_instructions: string;
    review_count: string;
    average_rating: string;
    searchable: string;
    materials: string[];
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string;
    shipping_profile_id: string;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: null;
    has_free_shipping: false;
    tag_ids: [];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    images: {
      id: string;
      product_id: string;
      image_url: string;
      key: string;
      is_primary: boolean;
      display_order: number;
      created_at: string;
      updated_at: string;
    }[];
    formattedPrice: string;
    displayCurrency: string;
  };
};

export type ShippingAddressResponse = {
  id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  total: number;
  same_billing_address: boolean;
  cart_id: string;
  updated_at: string;
  shipping_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
};

export type BillingAddressResponse = {
  id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  total: number;
  same_billing_address: boolean;
  cart_id: string;
  updated_at: string;
  shipping_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
};

export type AddToCartResponse = {
  id: string;
  items: {
    id: string;
    product_id: string;
    product_name: string;
    product_image: string;
    shop_id: string;
    shop_name: string;
    quantity: number;
    price: number;
    stock_quantity: number;
    subtotal: number;
  }[];
  total_items: number;
  subtotal: number;
};

export type AllProductsResponse = {
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string[];
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string;
    shipping_profile_id: string;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: null;
    has_free_shipping: false;
    tag_ids: [];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    brand_name: string | null;
    average_rating: string;
    review_count: string;
    images: {
      id: string;
      product_id: string;
      image_url: string;
      key: string;
      is_primary: boolean;
      display_order: number;
      created_at: string;
      updated_at: string;
    }[];
    discount_percentage: null;
    brand: null;
    displayPrice: string;
    displayCurrency: string;
    formattedPrice: string;
    originalPrice: string;
    originalCurrency: string;
  }[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  category: null;
  subCategories: null;
  filters: {
    price_range: {
      min: number;
      max: number;
    };
    tags: [];
    brands: [];
  };
  sort_options: {
    value: string;
    label: string;
  }[];
};

export type PresignedUrlResponse = {
  url: string;
};

export type BatchSignedUrlResponse = {
  urls: {
    [key: string]: string;
  };
};

export type AddToWishlistResponse = {
  id: string;
  wishlist_id: string;
  product_id: string;
  notes: string;
  added_at: string;
};

export type RemoveFromWishlistResponse = {
  message: string;
};

export type FindProductByIdResponse = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export type WishlistResponse = {
  items: {
    id: string;
    wishlist_id: string;
    product_id: string;
    notes: string;
    added_at: string;
    product_name: string;
    product_description: string;
    product_price: string;
    is_in_stock: boolean;
    product_image_url: string | null;
    shop_id: string;
    shop_name: string;
    average_rating: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total_count: number;
  };
};

export type HomeTrendingProductsResponse = {
  trendingProducts: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: "cm";
      width: 8;
      height: 12;
      length: 8;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: string;
    has_free_shipping: true;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    average_rating: string;
    review_count: string;
  }[];
};

export type HomeNewArrivalsResponse = {
  newArrivals: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: "cm";
      width: 8;
      height: 12;
      length: 8;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: string;
    has_free_shipping: true;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    average_rating: string;
    review_count: string;
  }[];
};

export type BeautyAndCosmeticsResponse = {
  pagination: any;
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: string;
    has_free_shipping: true;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    average_rating: string;
    review_count: string;
    image_url: string | null;
  }[];
};

export type AuthenticFoodsResponse = {
  pagination: any;
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string | null;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: string;
    has_free_shipping: true;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    average_rating: string;
    review_count: string;
    image_url: string | null;
  }[];
};

export type CartItemsResponse = {
  product_image: any;
  id: string;
  items: [
    {
      rating: number;
      id: string;
      product_id: string;
      product_name: string;
      product_image: string;
      shop_id: string;
      shop_name: string;
      quantity: number;
      price: number;
      stock_quantity: number;
      subtotal: number;
    }
  ];
  total_items: number;
  subtotal: number;
};

export type RemoveFromCartResponse = {
  message: string;
};

export type CreateCheckoutSessionResponse = {
  id: string;
  status: string;
  email: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  total: number;
  same_billing_address: boolean;
  cart_id: string;
  updated_at: string;
};

export type ProcessStripePaymentResponse = {
  success: boolean;
  payment_id: string;
  client_secret: string;
  status: "requires_action" | "succeeded" | "processing" | "requires_capture";
};

export type SelectShippingMethodResponse = {
  id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  total: number;
  same_billing_address: boolean;
  cart_id: string;
  updated_at: string;
  shipping_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  billing_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  shipping_method: {
    id: string;
    name: string;
    description: string;
    price: number;
    estimated_delivery_days: number;
  };
};

export type UpdateBillingResponse = {
  id: string;
  status: string;
  email: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  total: number;
  same_billing_address: boolean;
  cart_id: string;
  updated_at: string;
  shipping_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  billing_address: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
};

export type AvailableShippingMethodsResponse = {
  shipping_methods: {
    id: string;
    name: string;
    description: string;
    price: number;
    estimated_delivery_days: number;
  }[];
};

export type AvailableAddressesResponse = {
  shipping_addresses: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
  }[];
  billing_addresses: {
    id: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
  }[];
};

export type OtherProductsByCategoryIdResponse = {
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: string;
    image_urls: string[];
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    shop_id: string;
    searchable: string;
    materials: string | null;
    dimensions: {
      unit: string;
      width: number;
      height: number;
      length: number;
    };
    weight: string;
    weight_unit: string;
    sku: string;
    is_customizable: boolean;
    processing_time: string | null;
    shipping_profile_id: string | null;
    is_digital: boolean;
    digital_file_url: string | null;
    tags: string[];
    variant: string | null;
    total_sales: number;
    views: number;
    search_vector: string;
    is_active: true;
    brand_id: string;
    has_free_shipping: true;
    tag_ids: string[];
    original_price: string;
    on_sale: boolean;
    category_name: string;
    shop_name: string;
    average_rating: string;
    review_count: string;
    image_url: string | null;
  }[];
};

export const shipAddressSchema = z
  .object({
    // Shipping fields
    shipping_first_name: z
      .string()
      .min(1, { message: "First name is required" }),
    shipping_last_name: z.string().min(1, { message: "Last name is required" }),
    shipping_address_line1: z.string().optional(),
    shipping_address_line2: z.string().optional(),
    shipping_city: z.string().min(1, { message: "City is required" }),
    shipping_state: z.string().min(1, { message: "State is required" }),
    shipping_postal_code: z
      .string()
      .min(1, { message: "Postal code is required" }),
    shipping_phone: z.string().min(1, { message: "Phone is required" }),

    // Control flag
    shipping_billingAndDeliveryAddressAreTheSame: z.boolean(),

    // Billing fields - all initially optional
    billing_first_name: z.string().optional(),
    billing_last_name: z.string().optional(),
    billing_address_line1: z.string().optional(),
    billing_address_line2: z.string().optional(),
    billing_city: z.string().optional(),
    billing_state: z.string().optional(),
    billing_postal_code: z.string().optional(),
    billing_phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Skip validation if using same address
    if (data.shipping_billingAndDeliveryAddressAreTheSame) {
      return;
    }

    // Validate each billing field individually for better error reporting
    if (!data.billing_first_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name is required",
        path: ["billing_first_name"],
      });
    }

    if (!data.billing_last_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last name is required",
        path: ["billing_last_name"],
      });
    }

    if (!data.billing_city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required",
        path: ["billing_city"],
      });
    }

    if (!data.billing_state) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State is required",
        path: ["billing_state"],
      });
    }

    if (!data.billing_postal_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Postal code is required",
        path: ["billing_postal_code"],
      });
    }

    if (!data.billing_phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone is required",
        path: ["billing_phone"],
      });
    }
  });

export type ShipAddressForm = z.infer<typeof shipAddressSchema>;
