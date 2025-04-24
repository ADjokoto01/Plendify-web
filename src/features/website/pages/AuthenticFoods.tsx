import { Card, Loader, SimplePagination, Text } from "@/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { cn, Icon } from "@/lib";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { AUTHENTIC_FOODS_INFORMATION } from "@/data";

import {
  useFetchAllProducts,
  useFindSubCategories,
  usePaginationFilter,
  useGetVisitorsIP,
  useGetLocationFromIP,
  useGetCategories,
} from "../hooks";
import React from "react";

export function AuthenticFoodsPage() {
  const navigate = useNavigate();
  const {
    page,
    limit,
    setPage,
    sort,
    setSort,
    setSubCategoryId,
  } = usePaginationFilter();
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );

  const { data: categories, isLoading: isCategoriesLoading } = useGetCategories();
  const { data: allProducts, isLoading } = useFetchAllProducts(
    locationData?.data?.currency,
    categories?.categories[0].id
  );

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const { data: subCategories } = useFindSubCategories(
    categories?.categories[0].id || ""
  );

  const subCategoryOptions = subCategories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

 
  return (
    <main className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <Icon icon="hugeicons:arrow-left-02" className="w-4 h-4" />
            <Text className="hover:underline font-bold">Back</Text>
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTES.HOME}>Plendify</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  Authentic Foods
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="max-w-[1000px] w-full">
        <section className="flex items-end gap-2">
          <Text variant="h2" weight="medium">
            Authentic Foods
          </Text>
          <Text variant="span" weight="normal" className="text-grey-100">
            ({allProducts?.pagination.total || 0})
          </Text>
        </section>
        <Text variant="p" weight="normal">
          Authentic foods are traditional, culturally inspired dishes made with
          genuine ingredients and time-honored recipes, preserving their
          original flavors and heritage.
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-wrap gap-2">
            {subCategoryOptions?.map((card: any) => (
              // change background color when clicked
              <button
                key={card.value}
                className={cn(
                  "border rounded-full px-3 py-[10px] flex items-center gap-2 cursor-pointer",
                  selectedCategory === card.value &&
                    "bg-brand-primary border-brand-primary text-white"
                )}
                onClick={() => {
                  setSelectedCategory(card.value);
                  setSubCategoryId(card.value);
                }}
              >
                {/* <Avatar className="!w-10 !h-10" src={card.image} /> */}

                <Text variant="span" weight="normal">
                  {card.label}
                </Text>
              </button>
            ))}
          </div>

          <Select value={sort || ""} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="on_sale">On Sale</SelectItem>
                <SelectItem value="lowest_price">Lowest Price</SelectItem>
                <SelectItem value="highest_price">Highest Price</SelectItem>
                <SelectItem value="price_drop">Price Drop</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isLoading || isCategoriesLoading && <Loader />}
      
        {!isLoading && allProducts?.products.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <Text variant="p" weight="normal">
              No products found
            </Text>
          </div>
        )}

        {!isLoading && allProducts && allProducts?.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts?.products.map((card: any) => (
                <Link key={card.id} to={`${ROUTES.PRODUCT_DETAIL}/${card.id}`}>
                  <Card {...card} />
                </Link>
              ))}
            </div>
            <SimplePagination
              total={allProducts?.pagination.totalPages || 0}
              page={page}
              setPage={setPage}
              limit={limit}
            />
          </>
        )}
      </div>
    </main>
  );
}
