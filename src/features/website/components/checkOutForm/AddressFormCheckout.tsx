import {
  CountrySelect,
  DoubleButton,
  Input,
  Loader,
  PhoneInputField,
  PlacesAutocomplete,
  Text,
} from "@/components";
import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFindAvailableShippingMethods,
  useBillingAddress,
  useSelectShippingMethod,
  useShippingAddress,
  // useUpdateBilling,
  useFindAvailableAddresses,
  useGetCartItems,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../../hooks";

import { useSearchParams } from "react-router-dom";
import { BillingForm } from "./BillingForm";
import { z } from "zod";
import { shipAddressSchema } from "../../types/common";
import { toast } from "react-toastify";

type ShippingAddressForm = z.infer<typeof shipAddressSchema>;

export const AddressFormCheckout = ({
  setActiveAccordion,
}: {
  setActiveAccordion: (activeAccordion: number) => void;
}) => {
  const [searchParams] = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const [addressError, setAddressError] = React.useState<string | null>(null);
  const { data, isPending: isPendingFindAddresses } =
    useFindAvailableAddresses();
  const findAvailableAddresses = data?.data;
  const checkoutSessionId = searchParams.get("id");
  const [address, setAddress] = React.useState("");
  const [billingAddress, setBillingAddress] = React.useState(
    findAvailableAddresses?.billing_addresses[0]?.address_line1 || ""
  );
  const [country, setCountry] = React.useState("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS,
    libraries: ["places"],
  });
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data: cart, isLoading: cartLoading } = useGetCartItems(
    locationData?.data?.currency
  );
  const { mutateBillingAddress, isPending } = useBillingAddress();
  const { mutateShippingAddress, isPending: isPendingShipping } =
    useShippingAddress();
  const { mutateSelectShippingMethod } = useSelectShippingMethod();
  const shippingAddressId = findAvailableAddresses?.shipping_addresses?.[0]?.id;
  const { data: availableShippingMethods, isPending: isLoading } =
    useFindAvailableShippingMethods(cart?.id, shippingAddressId || "");

  console.log("availableShippingMethods", availableShippingMethods);
  console.log("isLoading", isLoading);

  const [billingCountry, setBillingCountry] = React.useState("");
  const [billingCountryError, setBillingCountryError] = React.useState<
    string | null
  >(null);

  const form = useForm<ShippingAddressForm>({
    resolver: zodResolver(shipAddressSchema),
    defaultValues: {
      shipping_billingAndDeliveryAddressAreTheSame: true,
    },
  });

  React.useEffect(() => {
    if (findAvailableAddresses) {
      const shippingAddress = findAvailableAddresses?.shipping_addresses[0];
      form.reset({
        shipping_first_name: shippingAddress?.first_name || "",
        shipping_last_name: shippingAddress?.last_name || "",
        shipping_address_line1: shippingAddress?.address_line1 || "",
        shipping_address_line2: shippingAddress?.address_line2 || "",
        shipping_city: shippingAddress?.city || "",
        shipping_state: shippingAddress?.state || "",
        shipping_postal_code: shippingAddress?.postal_code || "",
        shipping_phone: shippingAddress?.phone || "",
        shipping_billingAndDeliveryAddressAreTheSame: true,
      });
      setCountry(shippingAddress?.country || "");
      setAddress(shippingAddress?.address_line1 || "");
      setBillingAddress(shippingAddress?.address_line1 || "");
    }
  }, [findAvailableAddresses]);

  if (loadError) return <div>Error loading maps</div>;

  const onSubmit = async (data: any) => {
    if (address === "") {
      setAddressError("Address is required");
      return;
    }
    if (!data.shipping_billingAndDeliveryAddressAreTheSame) {
      if (country === "") {
        setError("Country is required");
        return;
      }
      if (billingCountry === "") {
        setBillingCountryError("Country is required");
        return;
      }
    }

    if (data.shipping_billingAndDeliveryAddressAreTheSame) {
      try {
        const {
          shipping_first_name,
          shipping_last_name,
          shipping_address_line2,
          shipping_city,
          shipping_state,
          shipping_postal_code,
          shipping_phone,
        } = data;

        const payload = {
          checkout_session_id: checkoutSessionId,
          first_name: shipping_first_name,
          last_name: shipping_last_name,
          address_line1: address,
          address_line2: shipping_address_line2,
          city: shipping_city,
          state: shipping_state,
          postal_code: shipping_postal_code,
          country: country,
          phone: shipping_phone,
        };
        // resolve reject
        mutateBillingAddress(payload);

        await new Promise((resolve) => {
          mutateShippingAddress(payload).then((data) => {
            mutateSelectShippingMethod({
              checkout_session_id: checkoutSessionId || "",
              shipping_address_id: data.data.shipping_address.id,
              shipping_method_id: "dhl_EXPRESS",
              currency: locationData?.data?.currency || "USD",
            });
            // mutateUpdateBilling({
            //   checkout_session_id: checkoutSessionId || '',
            //   same_billing_address: true,
            //   billing_address_id: data.data.billing_address.id,
            // });

            setActiveAccordion(1);
            resolve(data);
          });
        }).catch((error) => {
          toast.error(error as string);
        });
      } catch (error) {
        toast.error(error as string);
      }
    } else {
      try {
        const {
          shipping_first_name,
          shipping_last_name,
          shipping_address_line2,
          shipping_city,
          shipping_state,
          shipping_postal_code,
          shipping_phone,
          billing_first_name,
          billing_last_name,
          billing_address_line2,
          billing_city,
          billing_state,
          billing_postal_code,
          billing_phone,
        } = data;

        const ShippingAddressPayload = {
          checkout_session_id: checkoutSessionId,
          first_name: shipping_first_name,
          last_name: shipping_last_name,
          address_line1: address,
          address_line2: shipping_address_line2,
          city: shipping_city,
          state: shipping_state,
          postal_code: shipping_postal_code,
          country: country,
          phone: shipping_phone,
        };

        const BillingAddressPayload = {
          checkout_session_id: checkoutSessionId,
          first_name: billing_first_name,
          last_name: billing_last_name,
          address_line1: billingAddress,
          address_line2: billing_address_line2,
          city: billing_city,
          state: billing_state,
          postal_code: billing_postal_code,
          country: billingCountry,
          phone: billing_phone,
        };

        mutateBillingAddress(BillingAddressPayload);

        await new Promise((resolve) => {
          mutateShippingAddress(ShippingAddressPayload).then((data) => {
            mutateSelectShippingMethod({
              checkout_session_id: checkoutSessionId || "",
              shipping_address_id: data.data.shipping_address.id,
              shipping_method_id: "dhl_STANDARD",
              currency: locationData?.data?.currency || "USD",
            });

            setActiveAccordion(1);
            resolve(data);
          });
        });
      } catch (error) {
        toast.error(error as string);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {cartLoading || !isLoaded ? (
          <Loader />
        ) : (
          <>
            <section className="flex flex-col gap-4">
              <Text variant="span" weight="extrabold">
                Delivery Address
              </Text>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name *"
                  {...form.register("shipping_first_name")}
                  error={form.formState.errors.shipping_first_name}
                  disabled={
                    !!findAvailableAddresses?.shipping_addresses[0]?.first_name
                  }
                />
                <Input
                  placeholder="Last Name *"
                  {...form.register("shipping_last_name")}
                  error={form.formState.errors.shipping_last_name}
                  disabled={
                    !!findAvailableAddresses?.shipping_addresses[0]?.last_name
                  }
                />
                <div className="col-span-full flex flex-col gap-1">
                  <CountrySelect
                    error={error || undefined}
                    country={country}
                    setCountry={setCountry}
                  />
                </div>
                <div className="col-span-full flex flex-col gap-1">
                  <PlacesAutocomplete
                    setAddress={setAddress}
                    error={addressError || undefined}
                  />
                  <Text variant="span" className="text-xs text-grey-600 ml-4">
                    Start typing your street address or zip code for suggestions
                  </Text>
                </div>
                <div className="flex flex-col gap-1">
                  <Controller
                    name="shipping_phone"
                    control={form.control}
                    render={({ field }) => (
                      <PhoneInputField
                        id={"shipping_phone"}
                        onChange={(value: any) => field.onChange(value)}
                        value={field?.value ?? ""}
                        error={form.formState.errors.shipping_phone?.message}
                      />
                    )}
                  />
                  <Text variant="span" className="text-xs text-grey-600 ml-4">
                    E.g (123) 456-7890
                  </Text>
                </div>
                <Input
                  placeholder="Zip Code / Postal Code *"
                  {...form.register("shipping_postal_code")}
                  error={form.formState.errors.shipping_postal_code}
                />
                {/* <div className="col-span-full flex flex-col gap-1">
                  <Input
                    placeholder="First line of address *"
                    {...form.register("shipping_address_line1")}
                    error={form.formState.errors.shipping_address_line1}
                  />
                  <Text variant="span" className="text-xs text-grey-600 ml-4">
                    Eg. 3 Stripe Street
                  </Text>
                </div> */}

                <div className="col-span-full flex flex-col gap-1">
                  <Input
                    placeholder="Second line of address (optional)"
                    {...form.register("shipping_address_line2")}
                    error={form.formState.errors.shipping_address_line2}
                  />
                  <Text variant="span" className="text-xs text-grey-600 ml-4">
                    Eg. 3 Stripe Street
                  </Text>
                </div>
                <Input
                  placeholder="City/Town *"
                  {...form.register("shipping_city")}
                  error={form.formState.errors.shipping_city}
                />
                <Input
                  placeholder="State/Province *"
                  {...form.register("shipping_state")}
                  error={form.formState.errors.shipping_state}
                />
              </div>

              {/* let it be already checked */}
              <Controller
                control={form.control}
                name="shipping_billingAndDeliveryAddressAreTheSame"
                render={({ field }) => (
                  <div className="flex items-center space-x-2" {...field}>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="terms"
                      className="text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Billing and delivery address are the same
                    </label>
                  </div>
                )}
              />
            </section>

            {!form.watch("shipping_billingAndDeliveryAddressAreTheSame") && (
              <BillingForm
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                billingCountry={billingCountry}
                setBillingCountry={setBillingCountry}
                billingCountryError={billingCountryError}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <DoubleButton
                type="submit"
                loading={
                  isPending || isPendingShipping || isPendingFindAddresses
                }
                icon="mdi:arrow-right"
                iconPosition="right"
                className="flex justify-between items-center mt-4"
              >
                Next
              </DoubleButton>
              <div />
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};
