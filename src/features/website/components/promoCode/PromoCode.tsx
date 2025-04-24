import { usePromoCode } from "@/features";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Text } from "@/components";
import { Icon } from "@/lib";

const promoSchema = z.object({
  code: z.string().min(1),
});

type PromoSchema = z.infer<typeof promoSchema>;

export const PromoCode = ({ subtotal }: { subtotal: number }) => {
  const [openPromoCode, setOpenPromoCode] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromoSchema>({
    resolver: zodResolver(promoSchema),
  });
  const { mutate: applyPromoCode, isPending: isApplyingPromoCode } =
    usePromoCode();

  const onSubmit = (submittedData: PromoSchema) => {
    applyPromoCode({
      code: submittedData.code,
      subtotal: subtotal,
    });
  };
  return (
    <div>
      {" "}
      {!openPromoCode ? (
        <button
          onClick={() => setOpenPromoCode(!openPromoCode)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="hugeicons:discount" />
          <Text variant="p" className="underline">
            Use Promo Code
          </Text>
        </button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <Input
            placeholder="Enter promo code"
            {...register("code")}
            error={errors?.code?.message}
          />
          <button
            type="submit"
            disabled={isApplyingPromoCode}
            className="underline text-sm"
          >
            {isApplyingPromoCode ? "Applying..." : "Apply"}
          </button>
        </form>
      )}
    </div>
  );
};
