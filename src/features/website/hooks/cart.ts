import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  getTrendingProducts,
  applyPromoCode,
} from "../service";

import { toast } from "react-toastify";

export function useGetCartItems(currency: string) {
  return useQuery<any>({
    queryKey: ["cart/items"],
    queryFn: () => getCartItems(currency),
    select: (data) => data,
    enabled: !!currency,
  });
}

export function useGetTrendingProducts(currency: string) {
  return useQuery<any>({
    queryKey: ["home/trending"],
    queryFn: () => getTrendingProducts(currency),
    select: (data) => data,
    enabled: !!currency,
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: async () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries();
    },
    onError: (data: any) => {
      toast.error(data);
    },
  });

  return { mutate, isPending };
}

export function usePromoCode() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: applyPromoCode,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: async () => {
      toast.success("Product removed from cart");
      queryClient.invalidateQueries();
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });
  return { mutate, isPending };
}
