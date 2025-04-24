import { Text } from "@/components";
import CircularProgress from "@/components/circularProgress/CircularProgress";
import {
  ShopPreference,
  ShopBusinessInfo,
  ShopCategory,
  SuccessModal,
} from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import {
  useRegisterSupplier,
  useRegisterSupplierAsLoggedInUser,
} from "../hooks";
import { useGetLocationFromIP, useGetVisitorsIP } from "@/features/website";
import { useFetchUserById } from "@/features/user";
import { ROUTES } from "@/utils";

export const schema = z.object({
  applicant_first_name: z
    .string()
    .min(1, { message: "First name is required" }),
  applicant_last_name: z.string().min(1, { message: "Last name is required" }),
  applicant_email: z.string().email({ message: "Invalid email address" }),
  applicant_phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  shop_name: z.string().min(1, { message: "Shop name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  business_email: z
    .string()
    .email({ message: "Invalid business email address" }),
  business_phone: z.string().min(10, {
    message: "Business phone number must be at least 10 characters",
  }),
  business_address: z.object({
    address_line1: z.string().min(1, { message: "Address line 1 is required" }),
    address_line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1, { message: "State is required" }),
    postal_code: z.string().min(1, { message: "Postal code is required" }),
  }),
  tax_id: z.string().optional(),
  categories: z.string().min(1, { message: "Category is required" }),
  sub_categories: z.string().min(1, { message: "Sub category is required" }),
});

export type ShopPreferenceForm = z.infer<typeof schema>;

export const SellerRegisteration = () => {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const [country, setCountry] = React.useState<string>(
    locationData?.data?.country || ""
  );
  const [step, setStep] = React.useState<number>(1);
  const { mutate, isPending } = useRegisterSupplier();
  const { mutate: mutateAsLoggedInUser, isPending: isPendingAsLoggedInUser } =
    useRegisterSupplierAsLoggedInUser();
  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    React.useState<boolean>(false);

  const { data: user } = useFetchUserById();

  const form = useForm<ShopPreferenceForm>({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (user) {
      form.setValue("applicant_first_name", user.name.split(" ")[0]);
      form.setValue("applicant_last_name", user.name.split(" ")[1]);
      form.setValue("applicant_email", user.email);
      form.setValue("applicant_phone", user.phone);
    }
  }, [user]);

  const handleSubmit = (data: ShopPreferenceForm) => {
    if (user) {
      const {
        business_address,
        shop_name,
        description,
        business_email,
        business_phone,
        tax_id,
      } = data;
      mutateAsLoggedInUser(
        {
          business_address: {
            ...business_address,
            country: country,
          },
          shop_name,
          description,
          business_email,
          business_phone,
          tax_id,
          categories: [data.categories],
          sub_categories: [data.sub_categories],
        },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
          },
        }
      );
    } else {
      mutate(
        {
          ...data,
          business_address: {
            ...data.business_address,
            country: country,
          },
          categories: [data.categories],
          sub_categories: [data.sub_categories],
        },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        {/* if first step 25% */}
        {step === 1 && <CircularProgress step={step} percentage={33} />}
        {/* if second step 50% */}
        {step === 2 && <CircularProgress step={step} percentage={66} />}
        {/* if third step 75% */}
        {step === 3 && <CircularProgress step={step} percentage={100} />}
        <div className="flex flex-col gap-2">
          <Text variant="h6" className="text-brand-primary">
            {step === 1
              ? "Shop preferences"
              : step === 2
              ? "Shop business info"
              : "Shop category"}
          </Text>
          <p className="text-[#6E6E6E] text-xs">
            {step}/{step === 1 ? 3 : step === 2 ? 3 : 3}
          </p>
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {step === 1 && (
            <ShopPreference
              setStep={setStep}
              country={country}
              setCountry={setCountry}
            />
          )}
          {step === 2 && <ShopBusinessInfo setStep={setStep} />}
          {step === 3 && (
            <ShopCategory
              setStep={setStep}
              isPending={isPending}
              isPendingAsLoggedInUser={isPendingAsLoggedInUser}
            />
          )}
        </form>
      </FormProvider>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title="Successfully Registered"
        description="Thank you for registering as a seller. Submission of your application is underway. You will receive an email once it is approved."
        successImage="https://images.unsplash.com/photo-1647377501273-c0776045bc09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlbGxlcnxlbnwwfHwwfHx8MA%3D%3D"
        buttonText="Go to Home"
        route={ROUTES.HOME}
      />
    </div>
  );
};
