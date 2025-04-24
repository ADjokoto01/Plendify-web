import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPersonalDetails,
  getUserById,
  updateUser,
  updateUserPassword,
} from "../services";
import { useAuthStore } from "@/stores";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";
import React from "react";
export function useFetchPersonalDetails() {
  return useQuery({
    queryKey: ["personal-details"],
    queryFn: getPersonalDetails,
    select: (data) => data.data,
  });
}

export function useFetchUserById() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["user-details", user?.id],
    queryFn: () => getUserById(user?.id || ""),
    select: (data) => data.data.user,
    enabled: !!user?.id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => updateUser(data),
    onSuccess: async (data: any) => {
      toast.success(data.status);
      queryClient.invalidateQueries();
      setIsModalOpen(false);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending, isModalOpen, setIsModalOpen };
}

export function useUpdateUserPassword() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      navigate(ROUTES.AUTH.ROOT);
      logout();
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}
