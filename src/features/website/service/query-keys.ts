export const SEARCH_QUERY_KEYS = {
  all: ["search"] as const,
  list: (filters: {
    page: number;
    limit: number;
    q?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
    min_rating?: number;
    in_stock?: boolean;
    has_free_shipping?: boolean;
    shop_id?: string;
    tags?: string;
    brand_id?: string;
    on_sale?: boolean;
    category_id?: string;
  }) => [...SEARCH_QUERY_KEYS.all, "list", filters],
};

export const PRODUCT_QUERY_KEYS = {
  all: ["product"] as const,
  list: (filters: {
    page: number;
    limit: number;
    q?: string | null;
    sort?: string | null;
    category_id?: string | null;
    subcategory_id?: string | null;
  }) => [...PRODUCT_QUERY_KEYS.all, "list", filters],
};
