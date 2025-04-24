import {
  Input,
  DoubleButton,
  // Modal,
  Text,
  Loader,
  CountrySelect,
  PlacesAutocomplete,
  PhoneInputField,
} from "@/components";

import {
  useFindAvailableAddresses,
  useShippingAddress,
} from "@/features/website";
import { ShipAddressForm } from "@/features/website/types";
import { shipAddressSchema } from "@/features/website/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetchUserById } from "../hooks";

export const AddressBook = () => {
  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data, isPending: isPendingFindAddresses } =
    useFindAvailableAddresses();
  const { data: user } = useFetchUserById();
  const findAvailableAddresses = data?.data;

  const { mutateShippingAddress, isPending } = useShippingAddress();

  const [country, setCountry] = React.useState("");
  const [, setAddress] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ShipAddressForm>({
    resolver: zodResolver(shipAddressSchema),
    defaultValues: {
      shipping_first_name: user?.name.split(" ")[0],
      shipping_last_name: user?.name.split(" ")[1],
    },
  });

  const onSubmit = (data: ShipAddressForm) => {
    mutateShippingAddress(data);
  };

  React.useEffect(() => {
    if (
      findAvailableAddresses &&
      findAvailableAddresses.shipping_addresses.length > 0 &&
      findAvailableAddresses.billing_addresses.length > 0
    ) {
      setValue("shipping_first_name", user?.name.split(" ")[0]);
      setValue("shipping_last_name", user?.name.split(" ")[1]);
    }
  }, [findAvailableAddresses, user]);

  return (
    <>
      {isPendingFindAddresses ? (
        <Loader />
      ) : findAvailableAddresses?.shipping_addresses.length === 0 ||
        findAvailableAddresses?.billing_addresses.length === 0 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <section className="flex flex-col gap-4">
            <Text variant="span" weight="extrabold">
              Delivery Address
            </Text>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name *"
                {...register("shipping_first_name")}
                error={errors.shipping_first_name}
              />
              <Input
                placeholder="Last Name *"
                {...register("shipping_last_name")}
                error={errors.shipping_last_name}
              />
              <div className="col-span-full flex flex-col gap-1">
                <CountrySelect country={country} setCountry={setCountry} />
              </div>
              <div className="col-span-full flex flex-col gap-1">
                <PlacesAutocomplete setAddress={setAddress} />
                <Text variant="span" className="text-xs text-grey-600 ml-4">
                  Start typing your street address or zip code for suggestions
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Controller
                  name="shipping_phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInputField
                      id={"shipping_phone"}
                      onChange={(value: any) => field.onChange(value)}
                      value={field?.value ?? ""}
                      error={errors.shipping_phone?.message}
                    />
                  )}
                />
                <Text variant="span" className="text-xs text-grey-600 ml-4">
                  E.g (123) 456-7890
                </Text>
              </div>
              <Input
                placeholder="Zip Code/Postal Code  *"
                {...register("shipping_postal_code")}
                error={errors.shipping_postal_code}
              />
              <div className="col-span-full flex flex-col gap-1">
                <Input
                  placeholder="Street Address, PO Box *"
                  {...register("shipping_address_line1")}
                  error={errors.shipping_address_line1}
                />
                <Text variant="span" className="text-xs text-grey-600 ml-4">
                  Eg. 3 Stripe Street
                </Text>
              </div>

              <div className="col-span-full flex flex-col gap-1">
                <Input
                  placeholder="Apartment/Unit (optional)"
                  {...register("shipping_address_line2")}
                  error={errors.shipping_address_line2}
                />
                <Text variant="span" className="text-xs text-grey-600 ml-4">
                  Please do not enter delivery instructions here
                </Text>
              </div>
              <Input
                placeholder="City/Town *"
                {...register("shipping_city")}
                error={errors.shipping_city}
              />
              <Input
                placeholder="State/Province *"
                {...register("shipping_state")}
                error={errors.shipping_state}
              />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <DoubleButton
              type="submit"
              loading={isPending}
              disabled={isPending}
              icon="mdi:arrow-right"
              iconPosition="right"
              className="flex justify-between items-center mt-4"
            >
              Update
            </DoubleButton>
            <div />
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Text variant="h4">Address</Text>
              <button
                // onClick={() => setIsModalOpen(true)}
                className="extra-bold text-lg underline"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Text variant="span" weight="extrabold">
                Delivery address
              </Text>
              <div className="flex flex-col gap-1">
                <Text variant="span" weight="normal">
                  {findAvailableAddresses?.shipping_addresses[0].first_name}{" "}
                  {findAvailableAddresses?.shipping_addresses[0].last_name}
                </Text>
                <Text variant="span" weight="normal">
                  {findAvailableAddresses?.shipping_addresses[0].address_line1}{" "}
                  {findAvailableAddresses?.shipping_addresses[0].address_line2}
                </Text>
                <Text variant="span" weight="normal">
                  {findAvailableAddresses?.shipping_addresses[0].city},{" "}
                  {findAvailableAddresses?.shipping_addresses[0].state},{" "}
                  {findAvailableAddresses?.shipping_addresses[0].postal_code}
                </Text>
                <Text variant="span" weight="normal">
                  {findAvailableAddresses?.shipping_addresses[0].country}
                </Text>
                <Text variant="span" weight="normal">
                  {findAvailableAddresses?.shipping_addresses[0].phone}
                </Text>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
