import { axiosClient } from "@/config";
import { AllPurchasesResponse, PersonalDetailsResponse } from "../types";

const getAllPurchases = async () => {
  return axiosClient.get<AllPurchasesResponse>("/purchases/my-purchases");
};

const getPersonalDetails = async () => {
  return axiosClient.get<PersonalDetailsResponse>("/users/me");
};

const getUserById = async (id: string) => {
  return axiosClient.get<any>(`/users/${id}`);
};

const updateUser = async (data: any) => {
  return axiosClient.put(`/users/${data.id}`, {
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phoneNumber,
    birthday: data.birthday,
  });
};

const updateUserPassword = async (data: {
  token: string;
  password: string;
}) => {
  return axiosClient.post<{
    status: string;
    message: string;
  }>(`/auth/reset-password`, data);
};

export {
  getAllPurchases,
  getPersonalDetails,
  getUserById,
  updateUser,
  updateUserPassword,
};
