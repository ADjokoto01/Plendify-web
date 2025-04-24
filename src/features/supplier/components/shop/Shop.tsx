import {
  Avatar,
  CountrySelect,
  FileUpload,
  Input,
  Loader,
  Modal,
  PhoneInputField,
  Text,
} from "@/components";
import { DoubleButton } from "@/components";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { useGetShop, useUpdateShop } from "../../hooks";

import {
  useFindSubCategories,
  useGetCategories,
  useGetPresignedUrl,
} from "@/features";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const shopSchema = z.object({
  name: z.string().min(1, "Shop Name is required"),
  description: z.string().min(1, "Shop Description is required"),
  business_phone: z.string().min(1, "Business Phone is required"),
  business_email: z.string().email("Invalid business email address"),
  business_address: z.string().min(1, "Business Address is required"),
  categories: z.string().min(1, "Category is required"),
  sub_categories: z.string().min(1, "Sub Category is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(1, "Postal Code is required"),
  tax_id: z.string().optional(),
});

type ShopSchema = z.infer<typeof shopSchema>;

export const Shop = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const { data, isLoading } = useGetShop();
  const [country, setCountry] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const { data: logoUrl } = useGetPresignedUrl(data?.shop?.logo_url || "");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ShopSchema>({
    resolver: zodResolver(shopSchema),
  });

  const { mutate, isPending } = useUpdateShop();

  React.useEffect(() => {
    if (data?.shop) {
      setValue("name", data?.shop?.name);
      setValue("description", data?.shop?.description);
      setValue("business_phone", data?.shop?.contact_phone);
      setValue("business_email", data?.shop?.contact_email);
      setValue("business_address", data?.shop?.address);
      setValue("categories", data?.shop?.categories);
      setValue("sub_categories", data?.shop?.sub_categories);
      setValue("city", data?.shop?.city);
      setValue("state", data?.shop?.state);
      setValue("postal_code", data?.shop?.postal_code);
      setValue("tax_id", data?.shop?.tax_id);
    }
  }, [data?.shop]);

  const onSubmit = (data: ShopSchema) => {
    if (country === "") {
      setError("Country is required");
      return;
    }
    mutate(data);
  };

  const { data: categories } = useGetCategories();
  const { data: subCategories } = useFindSubCategories(watch("categories"));

  const categoryOptions = categories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const subCategoryOptions = subCategories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col gap-4">
          <FileUpload />
          <div className="flex flex-col gap-4">
            <div className="border border-grey-100 p-4">
              <div className="flex justify-between items-center">
                <Text variant="h4" weight="bold">
                  Shop Details
                </Text>
                <Text
                  onClick={() => setIsPasswordModalOpen(true)}
                  variant="h4"
                  className="underline"
                  weight="bold"
                >
                  Edit
                </Text>
              </div>

              <div className="flex flex-col gap-3 py-4 border-t-grey-100 border-t">
                <div className="flex items-center gap-1 bg-grey-300 p-5">
                  <Text variant="p">
                    Last updated:{" "}
                    {format(new Date(data?.shop?.updated_at), "MMM d, yyyy")}
                  </Text>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    <Avatar src={logoUrl?.url} />
                    <div>
                      <Text variant="p" weight="normal">
                        {data?.shop?.name}
                      </Text>
                      <Text variant="p" weight="normal">
                        Created by: {data?.shop?.user_name}
                      </Text>
                    </div>
                  </div>
                  <Text variant="p">{data?.shop?.contact_email}</Text>
                  <Text variant="p">{data?.shop?.contact_phone}</Text>
                  <Text variant="p">{data?.shop?.description}</Text>
                  <Text variant="p">
                    Total Sales: {data?.shop?.total_sales}
                  </Text>
                  <Text variant="p">Location: {data?.shop?.location}</Text>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isPasswordModalOpen}
              closeModal={() => setIsPasswordModalOpen(false)}
              className="w-[596px]"
              title="Shop Details"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-16 pt-8 border-t border-t-grey-100"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Shop Name *"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <Controller
                    name="business_phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInputField
                        id={"phone"}
                        onChange={(value: any) => field.onChange(value)}
                        value={field?.value ?? ""}
                        error={errors.business_phone?.message}
                      />
                    )}
                  />

                  <Input
                    type="textarea"
                    placeholder="Shop Description *"
                    className="col-span-full"
                    {...register("description")}
                    error={errors.description?.message}
                  />

                  <Input
                    placeholder="Business Email *"
                    {...register("business_email")}
                    error={errors.business_email?.message}
                  />

                  <Input
                    placeholder="Business Address *"
                    {...register("business_address")}
                    error={errors.business_address?.message}
                  />

                  <Input
                    placeholder="Business Address 2 (optional)"
                    {...register("business_address")}
                    error={errors.business_address?.message}
                  />

                  <Input
                    placeholder="City *"
                    {...register("city")}
                    error={errors.city?.message}
                  />

                  <Input
                    placeholder="State/Province *"
                    {...register("state")}
                    error={errors.state?.message}
                  />

                  <Input
                    placeholder="Zip Code/Postal Code *"
                    {...register("postal_code")}
                    error={errors.postal_code?.message}
                  />

                  <CountrySelect
                    error={error}
                    country={country}
                    setCountry={setCountry}
                  />

                  <Input
                    placeholder="Tax ID (optional)"
                    {...register("tax_id")}
                    error={errors.tax_id?.message}
                  />

                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                <div className="grid grid-cols-2 gap-4">
                  <DoubleButton
                    variant="outline"
                    extraPropsDouble="bg-brand-primary"
                    className="border-brand-primary bg-white text-brand-primary hover:bg-brand-primary hover:text-white rounded-none w-full cursor-pointer"
                    onClick={() => setIsPasswordModalOpen(false)}
                  >
                    Cancel
                  </DoubleButton>
                  <DoubleButton loading={isPending} type="submit">
                    Save
                  </DoubleButton>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};
