import {
  CountrySelect,
  DoubleButton,
  Input,
  PhoneInputField,
  Text,
} from "@/components";
import { useFormContext, Controller } from "react-hook-form";
import { ShopPreferenceForm } from "../../pages";
import React from "react";

export const ShopPreference = ({
  setStep,
  country,
  setCountry,
}: {
  country: string;
  setCountry: (country: string) => void;
  setStep: (step: number) => void;
}) => {
  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<ShopPreferenceForm>();
  const [error, setError] = React.useState<string>("");

  const handleContinue = async () => {
    const isValid = await trigger(["shop_name", "description"]);
    if (country === "") {
      setError("Country is required");
    }
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <section className="flex flex-col gap-12">
      <div className="md:text-center">
        <Text variant="h1">Shop preferences</Text>
        <Text variant="h6" weight="normal">
          Let's get started! Tell us about you and your shop.
        </Text>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-12">
        <div className="flex order-2 md:order-1 flex-col gap-[30px] py-4 md:py-10 md:border-y md:border-y-gray-100">
          <div className="flex flex-col gap-4">
            <Text variant="h6">Seller Details</Text>

            <div className="col-span-full flex flex-col gap-1">
              <CountrySelect
                error={error}
                country={country}
                setCountry={setCountry}
                disabled={country !== ""}
              />
            </div>

            <Input
              type="textarea"
              placeholder="Shop Description *"
              {...register("description")}
              error={errors.description}
            />

            <Input
              placeholder="First name *"
              {...register("applicant_first_name")}
              error={errors.applicant_first_name}
            />

            <Input
              placeholder="Last name *"
              {...register("applicant_last_name")}
              error={errors.applicant_last_name}
            />

            <Input
              placeholder="Email *"
              {...register("applicant_email")}
              error={errors.applicant_email}
            />

            <Controller
              name="applicant_phone"
              control={control}
              render={({ field }) => (
                <PhoneInputField
                  id={"phone"}
                  onChange={(value: any) => field.onChange(value)}
                  value={field?.value ?? ""}
                  error={errors.applicant_phone?.message}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Text variant="h6">Shop</Text>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Shop name *"
                {...register("shop_name")}
                error={errors.shop_name}
              />
              <div className="flex flex-col gap-1 px-4 text-grey-600">
                <Text variant="span">Between 4-20 characters</Text>
                <Text variant="span">
                  No special characters, spaces, or accented letters
                </Text>
              </div>
            </div>
          </div>
          <DoubleButton icon="hugeicons:arrow-right" onClick={handleContinue}>
            Save and Continue
          </DoubleButton>
        </div>
        <div className="py-4 md:py-10 order-1 md:order-2 flex flex-col gap-4 border-y border-y-gray-100 text-grey-200">
          <Text variant="h6" weight="normal">
            Tell us where your shop’s based. Don’t see your country? We may not
            be available there right now, but stay tuned.
            <span className="text-black underline"> Learn more</span>
          </Text>
          <Text variant="h6" weight="normal">
            Don’t sweat it! You can just draft a name now and change it later.
            We find sellers often draw inspiration from what they sell, their
            style, pretty much anything goes.
          </Text>
        </div>
      </div>
    </section>
  );
};
