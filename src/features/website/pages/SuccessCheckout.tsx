import { Input, Button, Modal, Text } from "@/components";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateFeedback } from "../hooks/reviews";
import { cn } from "@/lib";
import { FilledStar } from "@/assets/svgs/svgs";
// import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const reviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  feedback: z.string().min(1, "Feedback is required"),
  category: z.string().min(1, "Category is required"),
});

type ReviewSchema = z.infer<typeof reviewSchema>;

export const SuccessCheckout = () => {
  const [rating, setRating] = React.useState(5);

  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const { mutate, isPending } = useCreateFeedback();
  const onSubmit = (data: ReviewSchema) => {
    mutate(
      {
        ...data,
        rating,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="p-1 grid md:grid-cols-2 items-center">
      <div className="flex flex-col gap-2">
        <Text variant="h1">Thank you for your purchase!</Text>
        <Text variant="p">
          Your order has been placed successfully. You can view your order
          details in the order history.
        </Text>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhcHB5JTIwY3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D"
          alt="success"
          className="w-full h-full object-cover"
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        className="w-[600px]"
      >
        <Text>Leave a review</Text>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <StarRating rating={rating} setRating={setRating} className="mb-4" />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Input
            {...register("title")}
            placeholder="Leave a title for this app *"
            error={errors.title?.message}
          />
          <Input
            type="textarea"
            {...register("feedback")}
            placeholder="Leave a review for this app *"
            error={errors.feedback?.message}
          />

          <Button type="submit" disabled={isPending} loading={isPending}>
            Submit
          </Button>
        </form>
      </Modal>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

// Modified StarRating component with click functionality
type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
  className?: string;
  showCount?: boolean;
  reviewCount?: string;
};

function StarRating({
  rating,
  setRating,
  className,
  showCount,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={i}
            type="button"
            onClick={() => setRating(starValue)}
            className="focus:outline-none"
          >
            <FilledStar
              className={cn(
                isFilled ? "text-brand-primary" : "text-gray-100",
                "w-4 h-4",
                className
              )}
            />
          </button>
        );
      })}
      {showCount && (
        <Text variant="span" className="pt-[2px]">
          ({reviewCount})
        </Text>
      )}
    </div>
  );
}
