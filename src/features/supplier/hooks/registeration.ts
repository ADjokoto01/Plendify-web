import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  registerSupplier,
  getShop,
  uploadFile,
  updateShop,
  findProductsByShopId,
  deleteProduct,
  registerSupplierAsLoggedInUser,
  getReviewByShopId,
} from "../service";

export function useRegisterSupplierAsLoggedInUser() {
  const { mutate, isPending } = useMutation({
    mutationFn: registerSupplierAsLoggedInUser,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useGetReviewByShopId(shopId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["review-by-shop-id", shopId],
    queryFn: () => getReviewByShopId(shopId),
    select: (data: any) => data.data,
    enabled: !!shopId,
  });

  return { data, isLoading };
}

export function useRegisterSupplier() {
  const { mutate, isPending } = useMutation({
    mutationFn: registerSupplier,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useGetShop() {
  const { data, isLoading } = useQuery({
    queryKey: ["shop"],
    queryFn: getShop,
    select: (data: any) => data.data,
  });

  return { data, isLoading };
}

export function useUploadFile() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: async (data: any) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ["shop"] });
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateShop() {
  const { mutate, isPending } = useMutation({
    mutationFn: updateShop,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useFindProductsByShopId(shopId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["products", shopId],
    queryFn: () => findProductsByShopId(shopId),
    select: (data: any) => data.data,
  });

  return { data, isLoading };
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}
