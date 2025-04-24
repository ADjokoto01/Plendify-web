import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import { getSearch } from '../service';
import { SEARCH_QUERY_KEYS } from '../service/query-keys';
import { usePaginationFilter } from './usePaginationFilter';

export function useSearch() {
  const {
    page,
    limit,
    q,
    category_id,
    min_price,
    max_price,
    sort,
    min_rating,
    in_stock,
    has_free_shipping,
    shop_id,
    tags,
    brand_id,
    on_sale,
  } = usePaginationFilter();

  const debouncedSearch = useDebounce(q, 500);

  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.list({
      page,
      limit,
      q: debouncedSearch || undefined,
      category_id: category_id || undefined,
      min_price: min_price || undefined,
      max_price: max_price || undefined,
      sort: sort || undefined,
      min_rating: min_rating || undefined,
      in_stock: in_stock || undefined,
      has_free_shipping: has_free_shipping || undefined,
      shop_id: shop_id || undefined,
      tags: tags || undefined,
      brand_id: brand_id || undefined,
      on_sale: on_sale || undefined,
    }),
    queryFn: () =>
      getSearch({
        page,
        limit,
        q: debouncedSearch,
        category_id: category_id || undefined,
        min_price: min_price || undefined,
        max_price: max_price || undefined,
        sort: sort || undefined,
        min_rating: min_rating || undefined,
        in_stock: in_stock || undefined,
        has_free_shipping: has_free_shipping || undefined,
        shop_id: shop_id || undefined,
        tags: tags || undefined,
        brand_id: brand_id || undefined,
        on_sale: on_sale || undefined,
      }),
    select: (data) => data.data,
    enabled: !!debouncedSearch,
  });
}
