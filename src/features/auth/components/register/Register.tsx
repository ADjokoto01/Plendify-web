import { DoubleButton, Input, Text } from "@/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks";
import { Link } from "react-router";

const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export const Register = () => {
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <section className="flex flex-col gap-10">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="First Name *"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            placeholder="Last Name *"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
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
          CREATE ACCOUNT
        </DoubleButton>
      </form>
      <div className="flex flex-col gap-2 text-center">
        <div className="py-2 justify-center flex gap-1 items-center">
          <Text className="text-[#434654] py-2 px-3 text-xs">
            Already have an account?
          </Text>
          <Link
            to="/signup"
            className="py-2 px-3 text-xs font-medium hover:underline"
          >
            Login
          </Link>
        </div>
        <div>
          <Text className="text-[#434654] !text-[10px]">
            By continuing, you agree to our{" "}
            <span className="underline">Terms of services</span> and{" "}
            <span className="underline">Privacy policy</span>
          </Text>
          <Text className="text-[#434654] !text-[10px]">
            Having trouble? plendify@gmail.com
          </Text>
        </div>
      </div>
    </section>
  );
};
