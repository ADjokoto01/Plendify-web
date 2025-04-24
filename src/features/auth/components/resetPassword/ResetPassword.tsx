import { DoubleButton, Text } from "@/components";

import { Input } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPassword } from "@/features";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Icon } from "@/lib";
const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordSchema) => {
    const { password } = data;
    mutate({ password, token: token as string });
  };

  return (
    <section className="flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2">
        <Icon icon="hugeicons:arrow-left-02" className="w-4 h-4" />
        <Text className="hover:underline font-bold">Back</Text>
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[451px] w-full"
      >
        <div>
          <Text variant="h2" weight="medium">
            Reset Password
          </Text>
          <Text variant="p" weight="normal">
            Enter your new password
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="New Password *"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            placeholder="Confirm Password *"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <DoubleButton type="submit" loading={isPending}>
          RESET PASSWORD
        </DoubleButton>
      </form>
    </section>
  );
};
