import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { addListing, uploadListingImage } from "../service";

export function useAddListing() {
  const { mutateAsync: AddListing, isPending } = useMutation({
    mutationFn: addListing,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { AddListing, isPending };
}

export function useUploadListingImage() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadListingImage,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutateAsync, isPending };
}
