import {
  AmericanExpressLogo,
  MasterCardLogo,
  VisaLogo,
  PayPalLogo,
} from "@/assets/svgs/svgs";
import { DoubleButton, Text } from "@/components";
import { cn } from "@/lib";
import React from "react";
import {
  useProcessStripePayment,
  useSelectShippingMethod,
  useUpdateCheckoutSessionStatusToPayment,
  useFindAvailableAddresses,
  useConfirmCheckoutAddress,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../../hooks";
import { useFetchUserById } from "@/features/user";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "@/features/supplier";

export const PaymentForm = () => {
  const navigate = useNavigate();
  const [isClickedPaymentMethod, setIsClickedPaymentMethod] = React.useState<
    string | null
  >(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const { mutate: processStripePayment, isPending } = useProcessStripePayment();
  const {
    mutateConfirmCheckoutAddress,
    isPending: isPendingConfirmCheckoutAddress,
  } = useConfirmCheckoutAddress();
  const [searchParams] = useSearchParams();
  const checkoutSessionId = searchParams.get("id");
  const {
    mutateUpdateCheckoutSessionStatusToPayment,
    isPending: isPendingUpdateCheckoutSessionStatusToPayment,
  } = useUpdateCheckoutSessionStatusToPayment();
  const { mutateSelectShippingMethod } = useSelectShippingMethod();
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );

  const { data } = useFindAvailableAddresses();
  const findAvailableAddresses = data?.data;

  const { data: user } = useFetchUserById();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isClickedPaymentMethod === "paypal") {
      setIsClickedPaymentMethod("paypal");
    }
    if (isClickedPaymentMethod === "stripe") {
      setIsClickedPaymentMethod("stripe");

      processStripePayment(
        {
          checkout_session_id: checkoutSessionId || "",
          payment_type: "stripe_hosted_checkout",
          customer_email: user?.email,
          frontend_success_url: "",
          frontend_cancel_url: "",
          currency: locationData?.data?.currency || "USD",
        },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
          },
        }
      );
    }
  };

  async function handleClickStripe() {
    setIsClickedPaymentMethod("stripe");

    if (findAvailableAddresses) {
      mutateConfirmCheckoutAddress({
        checkout_session_id: checkoutSessionId || "",
        shipping_address_id:
          findAvailableAddresses?.shipping_addresses[0].id || "",
        billing_address_id:
          findAvailableAddresses?.billing_addresses[0].id || "",
      })
        .then((data) => {
          console.log("data man", data);
          mutateSelectShippingMethod({
            checkout_session_id: checkoutSessionId || "",
            shipping_address_id:
              findAvailableAddresses?.shipping_addresses[0].id || "",
            shipping_method_id: "dhl_N",
            currency: locationData?.data?.currency || "USD",
          });
        })
        .then(() => {
          setTimeout(() => {
            mutateUpdateCheckoutSessionStatusToPayment({
              checkout_session_id: checkoutSessionId || "",
            });
          }, 3000);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className={cn(
            "border p-4 flex flex-col gap-4 w-full cursor-pointer",
            {
              "border-b-2 border-b-green-100":
                isClickedPaymentMethod === "stripe",
            }
          )}
          onClick={handleClickStripe}
        >
          <div className="flex justify-between items-center w-full">
            <Text variant="span">Credit Card/Debit Card</Text>
            <div className="flex gap-2 items-center">
              <AmericanExpressLogo className="h-6" />

              <MasterCardLogo className="h-6" />

              <VisaLogo />
            </div>
          </div>
          {isClickedPaymentMethod === "stripe" && (
            <Text variant="span" className="text-left">
              You will be redirected to Stripe, where you can pay and complete
              your order.
            </Text>
          )}
        </button>
        <button
          type="button"
          className={cn(
            "border p-4 flex flex-col gap-4 w-full cursor-pointer",
            {
              "border-b-2 border-b-green-100":
                isClickedPaymentMethod === "paypal",
            }
          )}
          onClick={(e) => {
            e.preventDefault();
            setIsClickedPaymentMethod("paypal");
          }}
        >
          <div className="flex justify-between items-center w-full">
            <Text variant="span">Paypal</Text>
            <PayPalLogo className="h-6" />
          </div>
          {isClickedPaymentMethod === "paypal" && (
            <Text variant="span" className="text-left">
              You will be redirected to Paypal, where you can pay and complete
              your order.
            </Text>
          )}
        </button>
      </div>
      <div className="flex flex-col gap-4 max-w-[350px] w-full">
        <DoubleButton
          type="submit"
          disabled={!isClickedPaymentMethod}
          loading={
            isPending ||
            isPendingUpdateCheckoutSessionStatusToPayment ||
            isPendingConfirmCheckoutAddress
          }
          icon="hugeicons:arrow-right-04"
          iconPosition="right"
          className="text-white flex justify-between max-w-[309px]"
          extraPropsDouble="max-w-[309px] w-full"
          iconProps={{ width: "18" }}
        >
          Place Order
        </DoubleButton>
        <Text variant="span" onClick={() => navigate(ROUTES.TERMS_CONDITIONS)}>
          By clicking Place Order you agree to the{" "}
          <span className="underline">Terms & Conditions</span>
        </Text>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title="Successfully Placed Order"
        description="Thank you for placing an order. Your order is now being processed."
        successImage="https://plus.unsplash.com/premium_photo-1673977132978-c968944e449d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFBVUkNIQVNFfGVufDB8fDB8fHww"
        buttonText="Return to Home"
        route={ROUTES.HOME}
      />
    </form>
  );
};
