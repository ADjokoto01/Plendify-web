import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postBillingAddress,
  createCheckoutSession,
  postShippingAddress,
  processStripePayment,
  putSelectShippingMethod,
  putUpdateBilling,
  getAvailableShippingMethods,
  getAvailableAddresses,
  putUpdateCheckoutSessionStatusToPayment,
  postConfirmCheckoutAddress,
  getCheckSessionCart,
} from "../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/route-constants";

export function useShippingAddress() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateShippingAddress, isPending } = useMutation({
    mutationFn: postShippingAddress,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["all-shipping-addresses"],
      });
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateShippingAddress, isPending };
}

export function useBillingAddress() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateBillingAddress, isPending } = useMutation({
    mutationFn: postBillingAddress,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateBillingAddress, isPending };
}

export function useConfirmCheckoutAddress() {
  // const queryClient = useQueryClient();

  const { mutateAsync: mutateConfirmCheckoutAddress, isPending } = useMutation({
    mutationFn: postConfirmCheckoutAddress,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateConfirmCheckoutAddress, isPending };
}

export function useCreateCheckoutSession(cart_id: string, currency: string) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createCheckoutSession({ cart_id, currency }),
    onSuccess: async (data: any) => {
      toast.success(data.message);
      navigate(`${ROUTES.CHECKOUT}?id=${data?.id}`);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useProcessStripePayment() {
  const { mutate, isPending } = useMutation({
    mutationFn: processStripePayment,
    onSuccess: async (data: any) => {
      // redirect to a new tab
      toast.success("Payment initiated");
      window.open(`${data.redirect_url}`, "_blank");
    },
    onError: (data: any) => {
      toast.error(data.error);
    },
  });

  return { mutate, isPending };
}

export function useSelectShippingMethod() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateSelectShippingMethod, isPending } = useMutation({
    mutationFn: putSelectShippingMethod,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateSelectShippingMethod, isPending };
}

export function useUpdateBilling() {
  const { mutate: mutateUpdateBilling, isPending } = useMutation({
    mutationFn: putUpdateBilling,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateUpdateBilling, isPending };
}

export function useUpdateCheckoutSessionStatusToPayment() {
  const { mutate: mutateUpdateCheckoutSessionStatusToPayment, isPending } =
    useMutation({
      mutationFn: putUpdateCheckoutSessionStatusToPayment,
      onSuccess: async (data: any) => {
        toast.success(data.message);
      },
      onError: (data: any) => {
        toast.error(data.message);
      },
    });

  return { mutateUpdateCheckoutSessionStatusToPayment, isPending };
}

export function useFindAvailableShippingMethods(
  cart_id: string,
  shipping_address_id: string
) {
  const { data, isPending } = useQuery<any>({
    queryKey: ["available-shipping-methods", cart_id, shipping_address_id],
    queryFn: () => getAvailableShippingMethods(cart_id, shipping_address_id),
    enabled: !!cart_id && !!shipping_address_id,
  });

  return { data, isPending };
}

export function useFindAvailableAddresses() {
  const { data, isPending } = useQuery({
    queryKey: ["all-shipping-addresses"],
    queryFn: getAvailableAddresses,
  });

  return { data, isPending };
}

export function useFindCheckSessionCartBySessionId(
  session_id: string,
  currency: string
) {
  const { data, isPending } = useQuery<any>({
    queryKey: ["check-session-cart", session_id],
    queryFn: () => getCheckSessionCart(session_id, currency),
    enabled: !!session_id && !!currency,
  });

  return { data, isPending };
}
