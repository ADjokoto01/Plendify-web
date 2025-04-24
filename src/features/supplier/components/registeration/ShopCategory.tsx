import { DoubleButton, Text } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { ShopPreferenceForm } from "../../pages";
import { useFindSubCategories, useGetCategories } from "@/features/website";

export const ShopCategory = ({
  isPending,
  setStep,
  isPendingAsLoggedInUser,
}: {
  isPending: boolean;
  setStep: (step: number) => void;
  isPendingAsLoggedInUser: boolean;
}) => {
  const {
    control,
    watch,
    trigger,
    // formState: { errors },
  } = useFormContext<ShopPreferenceForm>();

  const { data: categories } = useGetCategories();
  const { data: subCategories } = useFindSubCategories(watch("categories"));

  const handleSubmit = async () => {
    await trigger(["categories", "sub_categories"]);
  };

  const categoryOptions = categories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const subCategoryOptions = subCategories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <section className="flex flex-col gap-12">
      <div className="md:text-center">
        <Text variant="h1">Shop Category</Text>
        <Text variant="h6" weight="normal">
          Choose the category that best describes your shop.
        </Text>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-12">
        <div className="flex order-2 md:order-1 flex-col gap-[30px] py-4 md:py-10 md:border-y md:border-y-gray-100">
          <div className="flex flex-col gap-4">
            <Text variant="h6">Category</Text>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category *" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions?.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="sub_categories"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sub category *" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategoryOptions?.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex gap-4">
            <DoubleButton
              variant="outline"
              extraPropsDouble="bg-brand-primary"
              className="border-brand-primary bg-white text-brand-primary hover:bg-brand-primary hover:text-white rounded-none w-full cursor-pointer"
              icon="hugeicons:arrow-right"
              onClick={() => setStep(2)}
            >
              Back
            </DoubleButton>
            <DoubleButton
              type="submit"
              icon="hugeicons:arrow-right"
              loading={isPending || isPendingAsLoggedInUser}
              disabled={isPending || isPendingAsLoggedInUser}
              onClick={handleSubmit}
            >
              Submit
            </DoubleButton>
          </div>
        </div>
        <div className="py-4 md:py-10 order-1 md:order-2 flex flex-col gap-4 border-y border-y-gray-100 text-grey-200">
          <Text variant="h6" weight="normal">
            These core details help Plendify understand the most basic aspects
            of your listing, as well as how it meets our policies.
            <span className="text-black underline">
              {" "}
              Learn more about what types of items are allowed on Plendify.
            </span>
          </Text>
        </div>
      </div>
    </section>
  );
};
