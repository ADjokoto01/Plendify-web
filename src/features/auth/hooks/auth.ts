import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import {
  login,
  register,
  forgetPasswordRequest,
  resetPassword,
} from "../service";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";
import { useAuthStore } from "@/stores";

export function useLogin() {
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data: any) => {
      toast.success("Login successful");

      authenticate(data.data);
      navigate(ROUTES.HOME);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useRegister() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: async (data: any) => {
      toast.success(data.data.message);
      navigate(ROUTES.HOME);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useForgetPasswordRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordRequest,
    onSuccess: async (data: any) => {
      toast.success(data.message);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}

export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data: any) => {
      toast.success(data.message);
      navigate(ROUTES.AUTH.ROOT);
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  return { mutate, isPending };
}
