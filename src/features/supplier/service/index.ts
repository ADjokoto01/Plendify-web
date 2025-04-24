import { axiosClient } from "@/config";

const registerSupplier = async (data: any) => {
  return axiosClient.post("/seller/shop/apply/guest", data);
};

const getShop = async () => {
  return axiosClient.get("/shops/me");
};

const uploadFile = async (formData: FormData) => {
  return axiosClient.post("/uploads", formData);
};

const updateShop = async (data: any) => {
  return axiosClient.put("/seller/shop", data);
};

const findProductsByShopId = async (shopId: string) => {
  return axiosClient.get(`/products/shop/${shopId}`);
};

const deleteProduct = async (productId: string) => {
  return axiosClient.delete(`/products/${productId}`);
};

const addListing = async (data: any) => {
  return axiosClient.post("/products", data);
};

const uploadListingImage = async (formData: FormData) => {
  return axiosClient.post("/uploads", formData);
};

const registerSupplierAsLoggedInUser = async (data: any) => {
  return axiosClient.post("/seller/shop/apply", data);
};

const getReviewByShopId = async (shopId: string) => {
  return axiosClient.get(`reviews/shop/${shopId}`);
};

const myPurchases = async (currency: string) => {
  return axiosClient.get("purchases/my-purchases", {
    headers: {
      "X-Currency-Preference": currency,
    },
  });
};

export {
  registerSupplier,
  getShop,
  uploadFile,
  updateShop,
  findProductsByShopId,
  deleteProduct,
  addListing,
  uploadListingImage,
  registerSupplierAsLoggedInUser,
  getReviewByShopId,
  myPurchases,
};
