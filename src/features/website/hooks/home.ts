import { useQuery } from '@tanstack/react-query';
import { getHomeTrendingProducts, getHomeNewArrivals } from '../service';

export function useHomeTrendingProducts(currency: string) {
  return useQuery({
    queryKey: ["home/trending-products"],
    queryFn: () => getHomeTrendingProducts(currency),
    select: (data) => data.data,
    enabled: !!currency,
  });
}

export function useHomeNewArrivals(currency: string) {
  return useQuery({
    queryKey: ["home/new-arrivals"],
    queryFn: () => getHomeNewArrivals(currency),
    select: (data) => data.data,
    enabled: !!currency,
  });
}
