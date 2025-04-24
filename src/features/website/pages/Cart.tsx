import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";

import { Card, DoubleButton, Loader, StarRating, Text } from "@/components";
import { cn, Icon } from "@/lib";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AmericanExpressLogo,
  CellulantLogo,
  FlutterWaveLogo,
  MasterCardLogo,
  PayPalLogo,
  StripeLogo,
  VisaLogo,
} from "@/assets/svgs/svgs";
import {
  useGetCartItems,
  useUpdateCartItem,
  useRemoveFromCart,
  useCreateCheckoutSession,
  useGetTrendingProducts,
  useBatchSignedUrl,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../hooks";

export const Cart = () => {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data, isLoading } = useGetCartItems(locationData?.data?.currency);

  const { mutate: createCheckoutSession, isPending } = useCreateCheckoutSession(
    data?.id,
    locationData?.data?.currency
  );

  const handleCheckout = () => {
    createCheckoutSession(data?.id, locationData?.data?.currency);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data && data?.items.length === 0 ? (
        <div className="flex justify-center items-center p-4 border">
          <Text variant="span">Your cart is empty</Text>
        </div>
      ) : (
        <main className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <Text variant="h1" weight="extrabold">
                  My Shopping Bag
                </Text>
                <div>
                  <div className="flex gap-1">
                    <Text variant="span">
                      Total ({data?.total_items} items)
                    </Text>
                    <Text variant="span" weight="extrabold">
                      {data?.displayCurrency}
                      {data?.subtotal}
                    </Text>
                  </div>
                  <Text variant="span" className="text-grey-200">
                    Items in your bag are not reserved — check out now to make
                    them yours.
                  </Text>
                </div>

                <div className="border border-grey-100/50 text-grey-200 p-4 flex items-center gap-2">
                  <Icon icon="hugeicons:truck" className="w-4 h-4" />
                  <Text variant="span">Ships in: 2 - 5 Business Days</Text>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {data?.items.map((card: any) => (
                  <HorizontalCard key={card.id} {...card} />
                ))}
              </div>
            </section>
            <section>
              <div>
                <div>
                  <Text variant="h1" weight="extrabold" className="uppercase">
                    Order summary
                  </Text>

                  <section className="border-t border-t-grey-100/50">
                    <section className="py-4 flex flex-col gap-5">
                      <div className="flex justify-between">
                        <Text variant="p" className="text-grey-200">
                          {data?.total_items} items
                        </Text>
                        <Text variant="p" className="uppercase">
                          {data?.displayCurrency}
                          {data?.subtotal}
                        </Text>
                      </div>

                      <div className="flex justify-between border-b border-b-grey-100/50 pb-7">
                        <DoubleButton
                          loading={isPending}
                          icon={"hugeicons:arrow-right-04"}
                          iconPosition="right"
                          className="text-white flex justify-between"
                          iconProps={{ width: "18" }}
                          onClick={handleCheckout}
                        >
                          Checkout
                        </DoubleButton>
                      </div>

                      <div className="flex flex-col gap-4">
                        <Text variant="span" className="uppercase">
                          Accepted Payment Methods
                        </Text>
                        <div className="flex flex-wrap gap-2 items-center">
                          <AmericanExpressLogo />
                          <FlutterWaveLogo />
                          <MasterCardLogo />
                          <PayPalLogo />
                          <VisaLogo />
                          <CellulantLogo />
                          <StripeLogo />
                        </div>
                      </div>
                    </section>
                  </section>
                </div>
              </div>
            </section>
          </div>
          <CardSection />
        </main>
      )}
    </>
  );
};

function CardSection() {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data: trendingProducts, isLoading } = useGetTrendingProducts(
    locationData?.data?.currency
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <Badge className="uppercase">Top picks for you</Badge>
            <div className="flex gap-4 items-center">
              <CarouselPrevious className="relative top-4 md:top-0 left-0 disabled:bg-grey-100 h-10 w-10 rounded-full md:flex md:items-center md:justify-center" />

              <CarouselNext className="relative top-4 md:top-0 right-0 disabled:bg-grey-100 h-10 w-10 rounded-full md:flex md:items-center md:justify-center" />
            </div>
          </div>

          {/* show 4 cards at a time */}
          <CarouselContent className="flex">
            {trendingProducts?.data?.trendingProducts.map((product: any) => (
              <CarouselItem key={product.id} className="max-w-[307px] w-full">
                <Link to={`${ROUTES.PRODUCT_DETAIL}/${product.id}`}>
                  <Card
                    {...product}
                    displayCurrency={product.display_currency}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
}

const HorizontalCard = (cart: {
  id: string;
  price: string | number;
  product_id: string;
  product_image: string;
  product_name: string;
  quantity: number;
  image_url: string;
  shop_id: string;
  shop_name: string;
  stock_quantity: number;
  subtotal: number;
  displayCurrency: string;
  display_currency?: string;
  className?: string;
  imageClassName?: string;
  removeItem?: () => void;
  rating?: number;
}) => {
  const {
    id,
    quantity,
    price,
    // product_id,
    image_url,
    // product_image,
    displayCurrency,
    display_currency,
    product_name,
    stock_quantity,
    rating,
    className,
    imageClassName,
  } = cart;

  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);
  const { mutate: updateCartItem, isPending } = useUpdateCartItem();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: mutateBatchSignedUrl } = useBatchSignedUrl();
  const [quantityData, setQuantityData] = React.useState(quantity);

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Start cycling through images on hover
  const handleMouseEnter = () => {
    if (image_url.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Create a new interval to cycle through images
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image_url.length);
    }, 1000); // Change image every 1 second
  };

  // Stop cycling through images when mouse leaves
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Optionally reset to first image
    setCurrentImageIndex(0);
  };

  React.useEffect(() => {
    // if quantity changes, update the quantity

    if (quantity !== quantityData) {
      updateCartItem({
        cart_item_id: id,
        quantity: quantityData,
      });
    }
  }, [quantityData]);

  React.useEffect(() => {
    if (image_url) {
      const imageUrls = image_url;

      // Pass the flattened array to get signed URLs
      mutateBatchSignedUrl(imageUrls as unknown as string[], {
        onSuccess: (response) => {
          // Assuming the response contains a mapping of original URLs to signed URLs
          const signedUrlsData = response.data.urls || {};

          setProductImagesMap(Object.values(signedUrlsData));
        },
      });
    }
  }, [image_url, mutateBatchSignedUrl]);

  const handleRemoveItem = () => {
    removeFromCart(id);
  };

  return (
    <form className={cn("w-full border flex", className)}>
      <div
        className={cn(
          "h-[200px] max-w-[200px] w-full cursor-pointer overflow-hidden",
          imageClassName
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {productImagesMap.length > 0 && (
          <img
            src={productImagesMap[currentImageIndex]}
            loading="lazy"
            alt={`${product_name} - view ${currentImageIndex + 1}`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300"
            )}
          />
        )}
      </div>
      <div className="flex flex-col justify-between py-4 px-4 w-full">
        <div className="flex justify-between w-full">
          <div>
            <Text variant="h4" weight="medium" className="line-clamp-1">
              {product_name}
            </Text>
            <StarRating rating={rating || 0} />
            <Text variant="h4" weight="medium">
              {display_currency || displayCurrency}
              {price}
            </Text>
            <Text variant="span" className="text-grey-200">
              {stock_quantity} in stock
            </Text>
          </div>
          {isRemoving || isPending ? (
            <div className="flex justify-end">
              <Loader size={24} height="h-10 w-10" />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRemoveItem}
              className="w-10 h-10 flex justify-end cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <Select
          value={quantityData?.toString() || "1"}
          onValueChange={(value) => setQuantityData(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[...Array(stock_quantity)].map((_, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};
