import { axiosClient } from "@/config";
import { LoginResponse, RegisterResponse } from "../types";

const login = async (data: { email: string; password: string }) => {
  return axiosClient.post<LoginResponse>("/auth/login", data);
};

const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return axiosClient.post<RegisterResponse>("/auth/register", data);
};

const forgetPasswordRequest = async (data: { email: string }) => {
  return axiosClient.post<{
    status: string;
    message: string;
  }>("/auth/forgot-password", data);
};

const resetPassword = async (data: { password: string; token: string }) => {
  return axiosClient.post<{
    status: string;
    message: string;
  }>("/auth/reset-password", data);
};

export { login, register, forgetPasswordRequest, resetPassword };
