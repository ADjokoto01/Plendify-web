import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { addReview, createFeedback } from "../service";

export function useAddReview() {
  const { mutate, isPending } = useMutation({
    mutationFn: addReview,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },

    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useCreateFeedback() {
  const { mutate, isPending } = useMutation({
    mutationFn: createFeedback,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },

    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}
