import { useQuery } from '@tanstack/react-query';
import { PURCHASE_QUERY_KEYS } from '../services/query-keys';

import { getAllPurchases } from '../services';

export function useFetchAllPurchases() {
  return useQuery({
    queryKey: PURCHASE_QUERY_KEYS.list(),
    queryFn: () => getAllPurchases(),
    select: (data) => data.data,
  });
}
