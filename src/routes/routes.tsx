import ErrorPage from "@/components/shared/error/ErrorPage";
import { AuthPage, ForgetPassword, ResetPassword } from "@/features/auth";
import {
  AuthenticFoodsPage,
  BeautyAndCosmeticsPage,
  Cart,
  Checkout,
  HomePage,
  Impact,
  ProductDetailPage,
  SearchPage,
  Wishlist,
  StoryPage,
  TermsConditionsPage,
  PrivacyPolicyPage,
  ShippingReturnsPage,
  RefundPage,
  SuccessCheckout,
  Partners,
  ShippingFees,
} from "@/features/website/pages";
import { Orders, PersonalDetails, AddressBook } from "@/features/user/pages";
import { AuthLayout, WebsiteLayout, UserLayout } from "@/layouts";
import { ROUTES } from "@/utils";
import { type RouteObject } from "react-router-dom";
import {
  ListProducts,
  SellerRegisteration,
  SellersHome,
  AddListing,
  PurchaseAndReview,
} from "@/features/supplier/pages";
import { Shop } from "@/features/supplier/components";

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    errorElement: <ErrorPage />,
    element: <WebsiteLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.STORY,
        element: <StoryPage />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTES.BEAUTY_AND_COSMETICS,
        element: <BeautyAndCosmeticsPage />,
      },
      {
        path: ROUTES.AUTHENTIC_FOODS,
        element: <AuthenticFoodsPage />,
      },
      {
        path: ROUTES.IMPACT,
        element: <Impact />,
      },
      {
        path: `${ROUTES.PRODUCT_DETAIL}/:route/:id`,
        element: <ProductDetailPage />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.WISHLIST,
        element: <Wishlist />,
      },
      {
        path: ROUTES.TERMS_CONDITIONS,
        element: <TermsConditionsPage />,
      },
      {
        path: ROUTES.PRIVACY_POLICY,
        element: <PrivacyPolicyPage />,
      },
      {
        path: ROUTES.SHIPPING_RETURNS,
        element: <ShippingReturnsPage />,
      },
      {
        path: ROUTES.REFUND,
        element: <RefundPage />,
      },
      {
        path: ROUTES.SUCCESS_CHECKOUT,
        element: <SuccessCheckout />,
      },
      {
        path: ROUTES.PARTNERS,
        element: <Partners />,
      },
      {
        path: ROUTES.SHIPPING_FEES,
        element: <ShippingFees />,
      },
    ],
  },
  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.AUTH.ROOT,
        element: <AuthPage />,
      },
      {
        path: ROUTES.AUTH.FORGET_PASSWORD,
        element: <ForgetPassword />,
      },
      {
        path: ROUTES.AUTH.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: ROUTES.USER.ACCOUNT,
    element: <UserLayout />,
    children: [
      {
        path: ROUTES.USER.ORDERS,
        element: <Orders />,
      },
      {
        path: ROUTES.USER.PERSONAL_DETAILS,
        element: <PersonalDetails />,
      },
      {
        path: ROUTES.USER.ADDRESS_BOOK,
        element: <AddressBook />,
      },
      {
        path: ROUTES.USER.SHOP,
        element: <Shop />,
      },
      {
        path: ROUTES.USER.LIST_PRODUCTS,
        element: <ListProducts />,
      },
      {
        path: ROUTES.USER.PURCHASE_AND_REVIEWS,
        element: <PurchaseAndReview />,
      },
    ],
  },
  {
    path: ROUTES.SELLERS.HOME,
    element: <WebsiteLayout />,
    children: [
      { path: ROUTES.SELLERS.HOME, element: <SellersHome /> },
      { path: ROUTES.SELLERS.REGISTER, element: <SellerRegisteration /> },
      { path: ROUTES.SELLERS.ADD_LISTING, element: <AddListing /> },
    ],
  },
];
