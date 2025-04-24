import { Input, Loader, Text } from "@/components";
import React, { useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, Icon } from "@/lib";
import { Link } from "react-router";
import { ROUTES } from "@/utils";

import {
  AmericanExpressLogo,
  CellulantLogo,
  FlutterWaveLogo,
  MasterCardLogo,
  PayPalLogo,
  StripeLogo,
  VisaLogo,
} from "@/assets/svgs/svgs";
import {
  AddressBillingAvailable,
  AddressFormCheckout,
  AddressShippingAvailable,
  PaymentForm,
  PromoCode,
} from "../components";

import {
  useBatchSignedUrl,
  useFindAvailableAddresses,
  useGetCartItems,
  useFindCheckSessionCartBySessionId,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../hooks";

import { StarRating } from "@/components";

import { useFetchUserById } from "@/features/user/hooks";
import { useSearchParams } from "react-router-dom";
const schema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export const Checkout = () => {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data, isLoading } = useGetCartItems(locationData?.data?.currency);
  const [activeAccordion, setActiveAccordion] = React.useState<number | null>(
    0
  );
  const [searchParams] = useSearchParams();
  const checkoutSessionId = searchParams.get("id");

  const { data: user } = useFetchUserById();
  const { data: findAvailableAddresseses } = useFindAvailableAddresses();
  const findAvailableAddresses = findAvailableAddresseses?.data;

  const { data: checkSessionCart } = useFindCheckSessionCartBySessionId(
    checkoutSessionId || "",
    locationData?.data?.currency || ""
  );

  const {
    register,
    // handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: user?.email || "",
    },
  });

  React.useEffect(() => {
    setValue("email", user?.email || "");
    if (
      findAvailableAddresses &&
      findAvailableAddresses?.shipping_addresses.length > 0 &&
      findAvailableAddresses?.billing_addresses.length > 0
    ) {
      setActiveAccordion(1);
    } else {
      setActiveAccordion(0);
    }
  }, [findAvailableAddresses, user?.email]);

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center flex flex-col items-center">
        <Text variant="h1" weight="extrabold" className="uppercase">
          Checkout
        </Text>
        <div className="flex items-center gap-2">
          <Text variant="span">
            ({data?.items.length} {data?.items.length > 1 ? "items" : "item"})
          </Text>
          <Text variant="span" weight="extrabold">
            {checkSessionCart?.display_currency}{" "}
            {checkSessionCart?.display_total || 0}
          </Text>
        </div>
      </div>
      <section className="grid md:grid-cols-2 gap-12">
        <div className="px-4 flex flex-col gap-10">
          <form className="flex flex-col gap-3">
            <Text variant="h4" weight="extrabold" className="uppercase">
              contact
            </Text>
            <Input
              disabled={!!user?.email}
              suffix={
                isValid ? (
                  <Icon
                    icon="hugeicons:checkmark-circle-03"
                    className="text-green-100"
                  />
                ) : (
                  <Icon
                    icon="hugeicons:cancel-circle"
                    className="text-semantics-red"
                  />
                )
              }
              placeholder="Enter your email address"
              {...register("email")}
              error={errors.email?.message}
              className={cn({
                "border-b-green-100": isValid,
              })}
              innerClassName={cn("border-b-2", {
                "border-b-green-100": isValid,
              })}
            />
          </form>
          <section className="border-t border-t-grey-100/50">
            <div className="flex flex-col gap-3 border-b border-b-grey-100/50 py-10">
              <div className="flex justify-between">
                <Text
                  variant="span"
                  weight="medium"
                  className={cn("uppercase text-grey-200", {
                    "text-black": activeAccordion === 0,
                  })}
                >
                  address
                </Text>
                {/* <button className="flex items-center gap-2">
                  <Icon icon="hugeicons:edit" />
                  <Text
                    onClick={() => setActiveAccordion(0)}
                    variant="p"
                    className="underline cursor-pointer"
                  >
                    Edit
                  </Text>
                </button> */}
              </div>

              {findAvailableAddresses?.shipping_addresses[0] ? (
                <>
                  <AddressShippingAvailable
                    findAvailableAddresses={findAvailableAddresses}
                  />
                  <AddressBillingAvailable
                    findAvailableAddresses={findAvailableAddresses}
                    sameAsShipping={true}
                  />
                </>
              ) : (
                <AddressFormCheckout setActiveAccordion={setActiveAccordion} />
              )}
            </div>

            <div className="flex flex-col gap-4 border-b border-b-grey-100/50 py-10">
              <div className="flex flex-col gap-5">
                <Text
                  variant="span"
                  weight="medium"
                  className={cn("uppercase text-grey-200", {
                    "text-black": activeAccordion === 1,
                  })}
                >
                  payment
                </Text>
                <div className="bg-grey-300 p-5">
                  <Text variant="span">
                    Payments are fully encrypted so that your payment details
                    are safe and secure.
                  </Text>
                </div>
              </div>

              {activeAccordion === 1 && <PaymentForm />}
            </div>
          </section>
          <div className="flex flex-wrap gap-2 items-center">
            <AmericanExpressLogo />
            <FlutterWaveLogo />
            <MasterCardLogo />
            <PayPalLogo />
            <VisaLogo />
            <CellulantLogo />
            <StripeLogo />
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-between">
              <Text variant="h4" weight="medium" className="uppercase">
                Order summary
              </Text>
              <Link
                to={ROUTES.CART}
                className="underline hover:bg-black hover:text-white hover:px-2 transition-all duration-300 uppercase text-black text-lg"
              >
                edit
              </Link>
            </div>

            <section className="border-t border-t-grey-100/50">
              <section className="py-4 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    {/* two decimal places */}
                    <Text variant="p" className="text-grey-200">
                      {data?.total_items}{" "}
                      {data?.total_items > 1 ? "items" : "item"}
                    </Text>
                    <Text variant="p" className="uppercase">
                      {checkSessionCart?.display_currency}{" "}
                      {checkSessionCart?.display_subtotal || 0}
                    </Text>
                  </div>

                  <div className="flex justify-between">
                    <Text variant="p" className="text-grey-200">
                      Shipping Fee
                    </Text>
                    <Text variant="p" className="uppercase">
                      {checkSessionCart?.display_currency}{" "}
                      {checkSessionCart?.display_shipping_cost || 0}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="p" className="text-grey-200">
                      Service Fee
                    </Text>
                    <Text variant="p" className="uppercase">
                      {checkSessionCart?.display_currency} 1
                    </Text>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Text variant="span">Total</Text>
                  <Text variant="span" weight="extrabold">
                    {checkSessionCart?.display_currency}{" "}
                    {checkSessionCart?.display_total || 0}
                  </Text>
                </div>
                <div className="border-b border-b-grey-100/50 pb-4">
                  <PromoCode subtotal={checkSessionCart?.display_subtotal} />
                </div>

                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="flex flex-col gap-4">
                    {data?.items.map((card: any) => (
                      <HorizontalCard key={card.id} {...card} />
                    ))}
                  </div>
                )}
              </section>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

function HorizontalCard({
  price,
  product_name,
  quantity,
  image_url,
  stock_quantity,
  displayCurrency,
  display_currency,
  rating,
}: any) {
  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);

  const { mutate: mutateBatchSignedUrl } = useBatchSignedUrl();

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Start cycling through images on hover
  const handleMouseEnter = () => {
    if (image_url.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Create a new interval to cycle through images
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image_url.length);
    }, 1000); // Change image every 1 second
  };

  // Stop cycling through images when mouse leaves
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Optionally reset to first image
    setCurrentImageIndex(0);
  };

  React.useEffect(() => {
    if (image_url) {
      const imageUrls = image_url;

      // Pass the flattened array to get signed URLs
      mutateBatchSignedUrl(imageUrls as unknown as string[], {
        onSuccess: (response) => {
          // Assuming the response contains a mapping of original URLs to signed URLs
          const signedUrlsData = response.data.urls || {};

          setProductImagesMap(Object.values(signedUrlsData));
        },
      });
    }
  }, [image_url, mutateBatchSignedUrl]);
  return (
    <form className={cn("w-full border flex")}>
      <div
        className={cn(
          "h-[200px] max-w-[200px] w-full cursor-pointer overflow-hidden"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {productImagesMap.length > 0 && (
          <img
            src={productImagesMap[currentImageIndex]}
            loading="lazy"
            alt={`${product_name} - view ${currentImageIndex + 1}`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300"
            )}
          />
        )}
      </div>
      <div className="flex flex-col justify-between py-4 px-4 w-full">
        <div className="flex justify-between w-full">
          <div>
            <Text variant="h4" weight="medium" className="line-clamp-1">
              {product_name}
            </Text>
            <StarRating rating={rating || 0} />
            <Text variant="h4" weight="medium">
              {display_currency || displayCurrency} {price}
            </Text>
            <Text variant="span" className="text-grey-200">
              {stock_quantity} in stock
            </Text>
          </div>
        </div>
        <Text variant="span" className="text-grey-200">
          {quantity}
        </Text>
      </div>
    </form>
  );
}
