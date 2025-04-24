import {
  DoubleButton,
  Input,
  Loader,
  Modal,
  PhoneInputField,
  Text,
} from "@/components";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useFetchUserById, useUpdateUser } from "../hooks";
import { ChangePassword } from "../components";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  birthday: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;
export const PersonalDetails = () => {
  const { data: userDetails, isLoading } = useFetchUserById();
  const {
    mutate: updateUser,
    isPending,
    isModalOpen,
    setIsModalOpen,
  } = useUpdateUser();

  const firstName = userDetails?.name.split(" ")[0];
  const lastName = userDetails?.name.split(" ")[1];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  React.useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("phoneNumber", userDetails?.phone);
    setValue("birthday", userDetails?.birthday);
  }, [
    firstName,
    lastName,
    setValue,
    userDetails?.phone,
    userDetails?.birthday,
  ]);

  const onSubmit = (data: any) => {
    updateUser({
      id: userDetails?.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phone,
      birthday: data.birthday,
    });
    reset();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Text variant="h4">Personal Details</Text>
            <div className="border border-grey-100 p-4">
              <Text variant="h4" weight="normal">
                Details
              </Text>

              <div className="flex flex-col gap-3 py-4 border-t-grey-100 border-t">
                <Text variant="p">{userDetails?.name}</Text>
                <div className="max-w-[150px] w-full">
                  <DoubleButton onClick={() => setIsModalOpen(true)}>
                    Edit
                  </DoubleButton>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
              className="w-[596px]"
              title="Edit Personal Details"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-16 pt-8 border-t border-t-grey-100"
              >
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="First Name *"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                    disabled
                  />
                  <Input
                    placeholder="Last Name *"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                    disabled
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInputField
                        id={"business_phone"}
                        onChange={(value: any) => field.onChange(value)}
                        value={field?.value ?? ""}
                        error={errors.phoneNumber?.message}
                      />
                    )}
                  />
                  <Input
                    type="date"
                    placeholder="Birthday (mm/dd/yyyy) (optional) "
                    {...register("birthday")}
                    error={errors.birthday?.message}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <DoubleButton
                    type="button"
                    variant="secondary"
                    className="text-brand-primary bg-white border border-brand-primary"
                    extraPropsDouble="bg-brand-primary"
                    onClick={() => setIsModalOpen(false)}
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
          <ChangePassword />
        </section>
      )}
    </>
  );
};
