import { axiosClient } from "@/config";
import {
  SEARCH_RESPONSE,
  AddToCartResponse,
  AllProductsResponse,
  PresignedUrlResponse,
  BatchSignedUrlResponse,
  AddToWishlistResponse,
  BillingAddressResponse,
  ShippingAddressResponse,
  RemoveFromWishlistResponse,
  FindProductByIdResponse,
  HomeTrendingProductsResponse,
  HomeNewArrivalsResponse,
  BeautyAndCosmeticsResponse,
  AuthenticFoodsResponse,
  RemoveFromCartResponse,
  CreateCheckoutSessionResponse,
  ProcessStripePaymentResponse,
  SelectShippingMethodResponse,
  UpdateBillingResponse,
  AvailableAddressesResponse,
  WishlistResponse,
  OtherProductsByCategoryIdResponse,
} from "../types";
// import { ENV_VARS } from "@/utils/constants";
import axios from "axios";
const getSearch = async (params: {
  page: number;
  limit: number;
  q?: string | null;
  category_id?: string | null;
  min_price?: number | null;
  max_price?: number | null;
  sort?: string | null;
  min_rating?: number | null;
  in_stock?: boolean | null;
  has_free_shipping?: boolean | null;
  shop_id?: string | null;
  tags?: string | null;
  brand_id?: string | null;
  on_sale?: boolean | null;
}) => {
  return axiosClient.get<SEARCH_RESPONSE>("/products/search", { params });
};

const getProductById = async (id: string, currency: string) => {
  return axiosClient.get(`/products/${id}`, {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const postShippingAddress = async (data: any) => {
  return axiosClient.post<ShippingAddressResponse>(
    "/checkout/addresses/shipping",
    data
  );
};

const postBillingAddress = async (data: any) => {
  return axiosClient.post<BillingAddressResponse>(
    "/checkout/addresses/billing",
    data
  );
};

const addToCart = async (data: { product_id: string; quantity: number }) => {
  return axiosClient.post<AddToCartResponse>("/cart/items", data);
};

const removeFromCart = async (cart_item_id: string) => {
  return axiosClient.delete<RemoveFromCartResponse>(
    `/cart/items/${cart_item_id}`
  );
};

const getAllProducts = async (
  params: {
    page: number;
    limit: number;
    q?: string | null;
    sort?: string | null;
    category_id?: string | null;
    subcategory_id?: string | null;
  },
  currency?: string | null
) => {
  return axiosClient.get<AllProductsResponse>("/products/search/advanced", {
    params,
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const getFindProductById = async (id: string) => {
  return axiosClient.get<FindProductByIdResponse>(`/products/${id}`);
};

const getPresignedUrl = async (key: string) => {
  return axiosClient.get<PresignedUrlResponse>(`/uploads/url/${key}`);
};

const batchSignedUrl = async (keys: string[]) => {
  return axiosClient.post<BatchSignedUrlResponse>("/uploads/url/batch", {
    keys,
  });
};

const getWishlist = async () => {
  return axiosClient.get<WishlistResponse>("/wishlists/items");
};

const addToWishlist = async (data: { product_id: string; notes: string }) => {
  return axiosClient.post<AddToWishlistResponse>(
    `/wishlists/${data.product_id}/items`,
    data
  );
};

const removeFromWishlist = async (item_id: string) => {
  return axiosClient.delete<RemoveFromWishlistResponse>(
    `/wishlists/items/${item_id}`
  );
};

const getHomeTrendingProducts = async (currency: string) => {
  return axiosClient.get<HomeTrendingProductsResponse>(
    "/home/trending-products",
    {
      headers: {
        "X-Currency-Preference": currency,
      },
    }
  );
};

const getHomeNewArrivals = async (currency: string) => {
  return axiosClient.get<HomeNewArrivalsResponse>("/home/new/arrivals", {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const getBeautyAndCosmetics = async () => {
  return axiosClient.get<BeautyAndCosmeticsResponse>(
    "/products/beauty-cosmetics"
  );
};

const getAuthenticFoods = async () => {
  return axiosClient.get<AuthenticFoodsResponse>("/products/authentic-foods");
};

const getAvailableShippingMethods = async (
  cart_id: string,
  shipping_address_id: string
) => {
  return axiosClient.get(
    `/checkout/shipping-methods?cart_id=${cart_id}&shipping_address_id=${shipping_address_id}`
  );
};

const getAvailableAddresses = async () => {
  return axiosClient.get<AvailableAddressesResponse>("/checkout/addresses/all");
};

const getCartItems = async (currency: string) => {
  return axiosClient.get("/cart", {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const updateCartItem = async (data: {
  cart_item_id: string;
  quantity: number;
}) => {
  return axiosClient.put(`/cart/items`, data);
};

const createCheckoutSession = async (data: {
  cart_id: string;
  currency: string;
}) => {
  return axiosClient.post<CreateCheckoutSessionResponse>(`/checkout`, data, {
    headers: {
      "X-Currency-Preference": data.currency,
    },
  });
};

const processStripePayment = async (data: {
  checkout_session_id: string;
  payment_type: string;
  customer_email: string;
  frontend_success_url: string;
  frontend_cancel_url: string;
  currency: string;
}) => {
  return axiosClient.post<ProcessStripePaymentResponse>(
    `/checkout/payment/process`,
    data,
    {
      headers: {
        "X-Currency-Preference": data.currency,
      },
    }
  );
};

const putSelectShippingMethod = async (data: {
  checkout_session_id: string;
  shipping_address_id: string;
  shipping_method_id: string;
  currency: string;
}) => {
  return axiosClient.put<SelectShippingMethodResponse>(
    `/checkout/${data.checkout_session_id}/shipping`,
    data,
    {
      headers: {
        "X-Currency-Preference": data.currency,
      },
    }
  );
};

const putUpdateBilling = async (data: {
  checkout_session_id: string;
  same_billing_address: boolean;
  billing_address_id: string;
}) => {
  if (data.same_billing_address) {
    return axiosClient.put<UpdateBillingResponse>(
      `checkout/${data.checkout_session_id}/billing`,
      {
        same_billing_address: true,
      }
    );
  } else {
    return axiosClient.put<UpdateBillingResponse>(
      `checkout/${data.checkout_session_id}/billing`,
      data
    );
  }
};

const putUpdateCheckoutSessionStatusToPayment = async (data: {
  checkout_session_id: string;
}) => {
  return axiosClient.put(
    `/checkout/${data.checkout_session_id}/update-status/payment`,
    data
  );
};

const postConfirmCheckoutAddress = async (data: {
  checkout_session_id: string;
  billing_address_id: string;
  shipping_address_id: string;
}) => {
  return axiosClient.put(
    `/checkout/${data.checkout_session_id}/addresses`,
    data
  );
};

const getCheckSessionCart = async (session_id: string, currency: string) => {
  return axiosClient.get(`/checkout/${session_id}`, {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const getOtherProductsByCategoryId = async (
  categoryId: string,
  currency: string
) => {
  return axiosClient.get<OtherProductsByCategoryIdResponse>(
    `/products/category/${categoryId}`,
    {
      headers: {
        "X-Currency-Preference": currency,
      },
    }
  );
};

const getReviewsById = async (id: string) => {
  return axiosClient.get(`/reviews/product/${id}`);
};

const getTrendingProducts = async (currency: string) => {
  return axiosClient.get("home/trending-products", {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

const getCategories = async () => {
  return axiosClient.get("categories/top-level");
};

const findSubCategories = async (categoryId: string) => {
  return axiosClient.get(`categories/${categoryId}/children`);
};

const applyPromoCode = async (data: { code: string; subtotal: number }) => {
  return axiosClient.post("/promo-codes/apply", data);
};

const getExchangeRate = async (currency: string) => {
  return axios.get(
    `https://v6.exchangerate-api.com/v6/c8dbc93547ac2955a7b4a6e4/latest/${currency}`
  );
};

const getVisitorsIP = async () => {
  return axios.get("https://api.ipify.org?format=json");
};

const getLocationFromIP = async (ipAddress: string) => {
  return axios.get(`https://ipapi.co/${ipAddress}/json/`);
};

const addReview = async (data: {
  product_id: string;
  rating: number;
  review: string;
}) => {
  return axiosClient.post("/reviews", data);
};

const createFeedback = async (data: {
  rating: number;
  title: string;
  feedback: string;
  category: string;
}) => {
  return axiosClient.post("/feedback/app", data);
};

export {
  getSearch,
  getProductById,
  postShippingAddress,
  addToCart,
  getAllProducts,
  getPresignedUrl,
  batchSignedUrl,
  addToWishlist,
  removeFromWishlist,
  getFindProductById,
  getWishlist,
  getHomeTrendingProducts,
  getHomeNewArrivals,
  getBeautyAndCosmetics,
  getAuthenticFoods,
  getCartItems,
  updateCartItem,
  removeFromCart,
  createCheckoutSession,
  postBillingAddress,
  processStripePayment,
  putSelectShippingMethod,
  putUpdateBilling,
  getAvailableShippingMethods,
  getAvailableAddresses,
  putUpdateCheckoutSessionStatusToPayment,
  getOtherProductsByCategoryId,
  getTrendingProducts,
  getCategories,
  findSubCategories,
  applyPromoCode,
  getExchangeRate,
  getVisitorsIP,
  getLocationFromIP,
  getReviewsById,
  addReview,
  postConfirmCheckoutAddress,
  getCheckSessionCart,
  createFeedback,
};
