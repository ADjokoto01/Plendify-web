import {
  CountrySelect,
  Input,
  Loader,
  PhoneInputField,
  Text,
} from "@/components";
import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";

import { Controller, useFormContext } from "react-hook-form";

import { useFetchUserById } from "@/features/user/hooks";

export const BillingForm = ({
  billingCountry,
  setBillingCountry,
  billingCountryError,
  billingAddress,
  setBillingAddress,
}: {
  billingCountry: string;
  setBillingCountry: (country: string) => void;
  billingCountryError: string | null;
  billingAddress: string;
  setBillingAddress: (address: string) => void;
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS,
    libraries: ["places"],
  });

  const { data: user } = useFetchUserById();

  const form = useFormContext();

  React.useEffect(() => {
    form.setValue("billing_first_name", user?.name.split(" ")[0] || "");
    form.setValue("billing_last_name", user?.name.split(" ")[1] || "");
  }, [user?.name]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-4">
        <Text variant="span" weight="extrabold">
          Billing Address
        </Text>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full flex flex-col gap-1">
            <PlacesAutocomplete
              setAddress={setBillingAddress}
              billingAddress={billingAddress}
            />
            <Text variant="span" className="text-xs text-grey-600 ml-4">
              Start typing your street address or zip code for suggestions
            </Text>
          </div>
          <div className="col-span-full flex flex-col gap-1">
            <CountrySelect
              error={billingCountryError || undefined}
              country={billingCountry}
              setCountry={setBillingCountry}
            />
          </div>
          <Input
            placeholder="First Name *"
            {...form.register("billing_first_name")}
            error={form.formState.errors.billing_first_name}
          />
          <Input
            placeholder="Last Name *"
            {...form.register("billing_last_name")}
            error={form.formState.errors.billing_last_name}
          />

          <div className="col-span-full flex flex-col gap-1">
            <Input
              placeholder="Second line of address (optional)"
              {...form.register("billing_address_line2")}
              error={form.formState.errors.billing_address_line2}
            />
            <Text variant="span" className="text-xs text-grey-600 ml-4">
              Eg. 3 Stripe Street
            </Text>
          </div>
          <Input
            placeholder="City/Town *"
            {...form.register("billing_city")}
            error={form.formState.errors.billing_city}
          />
          <Input
            placeholder="State/Province *"
            {...form.register("billing_state")}
            error={form.formState.errors.billing_state}
          />
          <Input
            placeholder="Zip Code/Postal Code *"
            {...form.register("billing_postal_code")}
            error={form.formState.errors.billing_postal_code}
          />
          <div className="flex flex-col gap-1">
            <Controller
              name="billing_phone"
              control={form.control}
              render={({ field }) => (
                <PhoneInputField
                  id={"billing_phone"}
                  onChange={(value: any) => field.onChange(value)}
                  value={field?.value ?? ""}
                  error={form.formState.errors.billing_phone?.message as string}
                />
              )}
            />
            <Text variant="span" className="text-xs text-grey-600 ml-4">
              E.g (123) 456-7890
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlacesAutocomplete = ({
  setAddress,
  billingAddress,
}: {
  setAddress: (address: string) => void;
  billingAddress: string;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    setAddress(address);

    clearSuggestions();
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        disabled={!ready}
        className="combobox-input placeholder:text-grey-600 border py-2 px-4 w-full h-12 focus-within:border-b-2 !outline-0"
        placeholder={
          billingAddress
            ? "Second line of address (optional)"
            : "First line of address *"
        }
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="bg-white focus:bg-brand-primary focus:text-white relative flex w-full cursor-default items-center gap-2 hover:bg-brand-primary hover:text-white rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
              >
                <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
