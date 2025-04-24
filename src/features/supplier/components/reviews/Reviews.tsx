import { useGetReviewByShopId, useGetShop } from "../../hooks";
import { Loader, Text } from "@/components";

export const Reviews = () => {
  const { data: shop } = useGetShop();
  const { data, isLoading } = useGetReviewByShopId(shop?.shop?.id);

  return (
    <main>
      {isLoading && <Loader />}
      {!isLoading && data?.reviews?.length === 0 ? (
        <div className="border p-5">
          <Text variant="p">No Reviews Yet</Text>
        </div>
      ) : (
        <div>
          <Text variant="p">Reviews</Text>
        </div>
      )}
    </main>
  );
};
