import { Modal, Input, DoubleButton, Text } from "@/components";
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

export const ModalLogin = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      className="max-w-[875px] w-full p-1"
      noTitle
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src="https://images.unsplash.com/photo-1623120594168-a6d35474043b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI2fHxjb3NtZXRpY3N8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <section className="flex flex-col gap-6 wrapper">
          <Text variant="h2" weight="medium">
            Shoppers love Plendify
          </Text>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                to={ROUTES.AUTH.RESET_PASSWORD}
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
      </div>
    </Modal>
  );
};
