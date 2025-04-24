import { DoubleButton, Input, Text, PhoneInputField } from "@/components";
import { useFormContext, Controller } from "react-hook-form";
import { ShopPreferenceForm } from "../../pages";
export const ShopBusinessInfo = ({
  setStep,
}: {
  setStep: (step: number) => void;
}) => {
  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<ShopPreferenceForm>();

  const getNestedError = (field: string) => {
    const addressErrors = errors.business_address as
      | Record<string, any>
      | undefined;
    return addressErrors && addressErrors[field];
  };

  const handleContinue = async () => {
    const isValid = await trigger([
      "business_email",
      "business_phone",
      "business_address.address_line1",
      "business_address.address_line2",
      "business_address.city",
      "business_address.state",
      "business_address.postal_code",
      "tax_id",
    ]);
    if (isValid) {
      setStep(3);
    }
  };
  return (
    <section className="flex flex-col gap-12">
      <div className="md:text-center">
        <Text variant="h1">Shop Information</Text>
        <Text variant="h6" weight="normal">
          Fill in the details below to create your shop.
        </Text>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-12">
        <section className="flex order-2 md:order-1 flex-col gap-12 py-4 md:py-10 md:border-y md:border-y-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <Text variant="h6" className="col-span-full">
              Business info
            </Text>
            <Input
              placeholder="Business email *"
              {...register("business_email")}
              error={errors.business_email}
            />

            <Controller
              name="business_phone"
              control={control}
              render={({ field }) => (
                <PhoneInputField
                  id={"business_phone"}
                  onChange={(value: any) => field.onChange(value)}
                  value={field?.value ?? ""}
                  error={errors.business_phone?.message}
                />
              )}
            />
            <div className="col-span-full">
              <Input
                placeholder="Address line 1 *"
                {...register("business_address.address_line1")}
                error={getNestedError("address_line1")}
              />
            </div>

            <Input
              className="col-span-full"
              placeholder="Address line 2 (optional)"
              {...register("business_address.address_line2")}
              error={getNestedError("address_line2")}
            />
            <Input
              placeholder="City *"
              {...register("business_address.city")}
              error={getNestedError("city")}
            />
            <Input
              placeholder="State/Province *"
              {...register("business_address.state")}
              error={getNestedError("state")}
            />
            <Input
              placeholder="Zip Code/Postal code *"
              {...register("business_address.postal_code")}
              error={getNestedError("postal_code")}
            />
            <Input
              placeholder="Tax ID (optional)"
              {...register("tax_id")}
              error={errors.tax_id}
            />
          </div>

          <div className="flex gap-4">
            <DoubleButton
              variant="outline"
              extraPropsDouble="bg-brand-primary"
              className="border-brand-primary bg-white text-brand-primary hover:bg-brand-primary hover:text-white rounded-none w-full cursor-pointer"
              onClick={() => setStep(1)}
            >
              Back
            </DoubleButton>
            <DoubleButton onClick={handleContinue}>
              Save and Continue
            </DoubleButton>
          </div>
        </section>
        <div className="py-4 md:py-10 order-1 md:order-2 flex flex-col gap-4 border-y border-y-gray-100 text-grey-200">
          <Text variant="h6" weight="normal">
            Tell us about the details of your shop. add more details later.
          </Text>
        </div>
      </div>
    </section>
  );
};
