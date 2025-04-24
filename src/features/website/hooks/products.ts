import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PRODUCT_QUERY_KEYS } from "../service/query-keys";
import {
  getProductById,
  addToCart,
  getAllProducts,
  getPresignedUrl,
  batchSignedUrl,
  addToWishlist,
  removeFromWishlist,
  getFindProductById,
  getWishlist,
  getBeautyAndCosmetics,
  getAuthenticFoods,
  getOtherProductsByCategoryId,
  getReviewsById,
} from "../service";
import { toast } from "react-toastify";
import { useDebounce } from "@uidotdev/usehooks";
import { usePaginationFilter } from "./usePaginationFilter";

export function useFetchProductById(id: string, currency: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id, currency),
    select: (data) => data.data,
    enabled: !!id && !!currency,
  });
}

export function useFetchReviewsById(id: string) {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsById(id),
    select: (data) => data,
    enabled: !!id,
  });
}

export function useFetchOtherProductsByCategoryId(
  categoryId: string,
  currency: string
) {
  return useQuery({
    queryKey: ["product", categoryId],
    queryFn: () => getOtherProductsByCategoryId(categoryId, currency),
    select: (data) => data.data,
    enabled: !!categoryId && !!currency,
  });
}

export function useFetchAllProducts(currency: string, category?: string) {
  const { page, limit, q, sort, subcategory_id } = usePaginationFilter();

  const debouncedSearch = useDebounce(q, 500);
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list({
      page,
      limit,
      q: debouncedSearch,
      sort,
      category_id: category || "",
      subcategory_id,
    }),
    queryFn: () =>
      getAllProducts(
        {
          page,
          limit,
          q: debouncedSearch,
          sort,
          category_id: category || "",
          subcategory_id,
        },
        currency
      ),
    select: (data) => data.data,
    enabled: !!currency,
  });
}

export function useFindProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getFindProductById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries();
      queryClient.invalidateQueries({ queryKey: ["cart/items"] });
    },
    onError: (data: any) => {
      toast.error(data.error);
    },
  });

  return { mutate, isPending };
}

export function useBatchSignedUrl() {
  const { mutate: mutateBatchSignedUrl, isPending } = useMutation({
    mutationFn: batchSignedUrl,
    // onSuccess: (data: any) => {
    //   toast(data.success);
    // },

    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate: mutateBatchSignedUrl, isPending };
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { mutate: mutateAddToWishlist, isPending } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },

    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate: mutateAddToWishlist, isPending };
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveFromWishlist, isPending } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },

    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate: mutateRemoveFromWishlist, isPending };
}

export function useGetPresignedUrl(key: string) {
  return useQuery({
    queryKey: ["presigned-url", key],
    queryFn: () => getPresignedUrl(key),
    select: (data) => data.data,
    enabled: !!key,
  });
}

export function useGetWishlist() {
  return useQuery<any>({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
    select: (data) => data,
  });
}

export function useGetBeautyAndCosmetics() {
  return useQuery({
    queryKey: ["beauty-and-cosmetics"],
    queryFn: getBeautyAndCosmetics,
    select: (data) => data.data,
  });
}

export function useGetAuthenticFoods() {
  return useQuery({
    queryKey: ["authentic-foods"],
    queryFn: getAuthenticFoods,
    select: (data) => data.data,
  });
}
