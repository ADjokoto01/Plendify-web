import { Card, Loader, SimplePagination, Text } from "@/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Icon } from "@/lib";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/utils";
import AuthenticFoods from "@/assets/images/authentic-foods.webp";
import Cosmetics from "@/assets/images/cosmetics.webp";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useFetchAllProducts,
  useGetVisitorsIP,
  useGetLocationFromIP,
  usePaginationFilter,
} from "../hooks";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const navigate = useNavigate();
  const { page, limit, setPage, setQ, setSort, sort } = usePaginationFilter();
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data: allProducts, isLoading } = useFetchAllProducts(
    locationData?.data?.currency
  );

  React.useEffect(() => {
    setQ(q);
  }, [q]);

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
                  Search Page
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex gap-4">
          <Link to={ROUTES.BEAUTY_AND_COSMETICS} className="relative">
            <img src={Cosmetics} alt="Cosmetics" />
            {/* be in the middle of the image */}
            <Text
              variant="span"
              weight="bold"
              className="text-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            >
              Beauty and Cosmetics
            </Text>
          </Link>
          <Link to={ROUTES.AUTHENTIC_FOODS} className="relative">
            <img src={AuthenticFoods} alt="Authentic Foods" />
            <Text
              variant="span"
              weight="bold"
              className="text-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            >
              Authentic Foods
            </Text>
          </Link>
        </div>
      </div>
      <section className="flex items-end gap-2">
        <Text variant="h1" weight="extrabold">
          Search results for {q}
        </Text>
        <Text variant="span" weight="normal" className="text-grey-100">
          [{isLoading ? 0 : allProducts?.pagination?.total}]
        </Text>
      </section>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
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
        {allProducts?.products.length === 0 && (
          <div className="border p-4">
            <Text variant="span">No Search Results found</Text>
          </div>
        )}
        {isLoading && <Loader />}
        {!isLoading && allProducts && allProducts?.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts?.products.map((card) => (
                <Link
                  key={card.id}
                  to={`${ROUTES.PRODUCT_DETAIL}/search/${card.id}`}
                >
                  <Card {...card} />
                </Link>
              ))}
            </div>
            <SimplePagination
              total={allProducts?.pagination?.totalPages || 0}
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
