import { useCallback } from "react";

import { parseAsInteger, useQueryState, parseAsBoolean } from "nuqs";

export function usePaginationFilter() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );
  const [q, setQ] = useQueryState("q");
  const [category_id, setCategoryId] = useQueryState("category_id");
  const [subcategory_id, setSubCategoryId] = useQueryState("sub_category_id");
  const [min_price, setMinPrice] = useQueryState("min_price", parseAsInteger);
  const [max_price, setMaxPrice] = useQueryState("max_price", parseAsInteger);
  const [sort, setSort] = useQueryState("sort");
  const [min_rating, setMinRating] = useQueryState(
    "min_rating",
    parseAsInteger
  );
  const [in_stock, setInStock] = useQueryState("in_stock", parseAsBoolean);
  const [has_free_shipping, setHasFreeShipping] = useQueryState(
    "has_free_shipping",
    parseAsBoolean
  );
  const [shop_id, setShopId] = useQueryState("shop_id");
  const [tags, setTags] = useQueryState("tags");
  const [brand_id, setBrandId] = useQueryState("brand_id");
  const [on_sale, setOnSale] = useQueryState("on_sale", parseAsBoolean);
  /**
   * wrapper around setters that resets page to whenever they are called
   */
  const withResetPage = useCallback(
    <T extends (...args: any[]) => any>(setter: T) => {
      return (...args: Parameters<T>) => {
        setPage(1);
        setter(...args);
      };
    },
    [setPage]
  );

  return {
    page,
    setPage,
    limit,
    setLimit: withResetPage(setLimit),
    q,
    setQ: withResetPage(setQ),
    category_id,
    setCategoryId: withResetPage(setCategoryId),
    subcategory_id,
    setSubCategoryId: withResetPage(setSubCategoryId),
    min_price,
    setMinPrice: withResetPage(setMinPrice),
    max_price,
    setMaxPrice: withResetPage(setMaxPrice),
    sort,
    setSort: withResetPage(setSort),
    min_rating,
    setMinRating: withResetPage(setMinRating),
    in_stock,
    setInStock: withResetPage(setInStock),
    has_free_shipping,
    setHasFreeShipping: withResetPage(setHasFreeShipping),
    shop_id,
    setShopId: withResetPage(setShopId),
    tags,
    setTags: withResetPage(setTags),
    brand_id,
    setBrandId: withResetPage(setBrandId),
    on_sale,
    setOnSale: withResetPage(setOnSale),
  };
}
