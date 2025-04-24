import { DoubleButton, Input } from "@/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks";
import { Link } from "react-router";
import { ROUTES } from "@/utils/route-constants";

const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password is required and must be at least 8 characters long"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col gap-10">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email address *"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            type="password"
            placeholder="Password *"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <DoubleButton type="submit" loading={isPending}>
          LOGIN
        </DoubleButton>
      </form>
      <div className="flex flex-col gap-2 text-center">
        <div className="py-2 justify-end flex gap-1">
          <Link
            to={ROUTES.AUTH.FORGET_PASSWORD}
            className="py-2 px-3 text-xs font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <a
          href="mailto:customercare@plendify.com"
          className="py-2 px-3 text-xs group cursor-pointer"
        >
          Having trouble?{" "}
          <span className="group-hover:underline">
            customercare@plendify.com
          </span>
        </a>
      </div>
    </section>
  );
};
