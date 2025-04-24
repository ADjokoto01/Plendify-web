import { DoubleButton, Input, Text } from "@/components";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgetPasswordRequest } from "@/features/auth/hooks";
import { ROUTES } from "@/utils";

const forgetPasswordSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { mutate, isPending } = useForgetPasswordRequest();

  const onSubmit = (data: ForgetPasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.AUTH.RESET_PASSWORD);
      },
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2">
        <Icon icon="hugeicons:arrow-left-02" className="w-4 h-4" />
        <Text className="hover:underline font-bold">Back</Text>
      </button>
      <section className="flex flex-col gap-10 max-w-[451px] w-full">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Text variant="h2" weight="medium">
              Forgot Password
            </Text>
            <Text variant="p" weight="normal">
              Enter your email address to receive a link to reset your password
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email address *"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <DoubleButton type="submit" loading={isPending}>
            SEND REQUEST LINK
          </DoubleButton>
        </form>
      </section>
    </div>
  );
};
