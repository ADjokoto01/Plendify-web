import { DoubleButton, Input, Modal, Text } from "@/components";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgetPasswordRequest } from "@/features";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";
import { useAuthStore } from "@/stores";

const forgetPasswordSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export const ChangePassword = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: user?.email,
    },
  });

  const { mutate, isPending } = useForgetPasswordRequest();

  const onSubmit = (data: ForgetPasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.AUTH.RESET_PASSWORD);
        logout();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-grey-100 p-4">
        <Text variant="h4" weight="normal">
          Password
        </Text>

        <div className="flex flex-col gap-3 py-4 border-t-grey-100 border-t">
          <div className="max-w-[150px] w-full">
            <DoubleButton onClick={() => setIsPasswordModalOpen(true)}>
              Reset Password
            </DoubleButton>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isPasswordModalOpen}
        closeModal={() => setIsPasswordModalOpen(false)}
        className="w-[596px]"
        title="Reset Password"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-16 pt-8 border-t border-t-grey-100"
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email *"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DoubleButton
              type="button"
              variant="secondary"
              className="text-brand-primary bg-white border border-brand-primary"
              extraPropsDouble="bg-brand-primary"
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
  );
};
