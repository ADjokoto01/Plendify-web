import { useQuery } from "@tanstack/react-query";
import { myPurchases } from "../service";

export function useFindMyPurchases(currency: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["my-products"],
    queryFn: () => myPurchases(currency),
    select: (data: any) => data.data,
    enabled: !!currency,
  });

  return { data, isLoading };
}
