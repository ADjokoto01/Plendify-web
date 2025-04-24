import { getCategories, findSubCategories } from "../service";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useQuery<any>({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data,
  });
}

export function useFindSubCategories(categoryId: string) {
  return useQuery<any>({
    queryKey: ["sub-categories", categoryId],
    queryFn: () => findSubCategories(categoryId),
    select: (data) => data.data,
    enabled: !!categoryId,
  });
}
