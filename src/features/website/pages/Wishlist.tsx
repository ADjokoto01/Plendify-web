import React, { useRef } from "react";
import {
  useBatchSignedUrl,
  useGetWishlist,
  useRemoveFromWishlist,
} from "../hooks/products";
import { Icon } from "@/lib";
import { StarRating } from "@/components/starRating";
import { Loader, Text } from "@/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/utils";
export const Wishlist = () => {
  const { data, isLoading } = useGetWishlist();

  return (
    <div className="flex flex-col gap-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.HOME}>Plendify</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium capitalize">
              Saved
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-end gap-1">
        <Text variant="h1" weight="extrabold">
          Saved
        </Text>
        <Text variant="p" weight="medium" className="text-grey-500 text-xs">
          [{data?.items.length} items]
        </Text>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.items.map((item: any) => (
            <WishlistItemCards key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

const WishlistItemCards = ({
  name,
  price,
  image_urls,
  average_rating,
  product_price,
  displayCurrency,
  id,
  review_count,
}: any) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { mutate: mutateBatchSignedUrl } = useBatchSignedUrl();
  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  React.useEffect(() => {
    if (image_urls) {
      const imageUrls = image_urls;

      // Pass the flattened array to get signed URLs
      mutateBatchSignedUrl(imageUrls as string[], {
        onSuccess: (response) => {
          // Assuming the response contains a mapping of original URLs to signed URLs
          const signedUrlsData = response.data.urls || {};

          setProductImagesMap(Object.values(signedUrlsData));
        },
      });
    }
  }, [image_urls, mutateBatchSignedUrl]);

  const handleRemoveWishlistClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(id);
    setIsWishlisted(!isWishlisted);
  };

  const handleMouseEnter = () => {
    if (image_urls.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Create a new interval to cycle through images
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image_urls.length);
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
  return (
    <div className="max-w-[274px] w-full p-1 hover:border hover:border-brand-primary transition-all duration-300 flex flex-col gap-4">
      <div
        className="h-[266px] relative cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {productImagesMap.length > 0 && (
          <img
            src={productImagesMap[currentImageIndex]}
            loading="lazy"
            alt={`${name} - view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        <div
          className="absolute top-[14px] right-[14px] p-2 w-fit bg-brand-primary rounded-full"
          onClick={(e) => handleRemoveWishlistClick(e, id)}
        >
          <Icon
            icon="heroicons:heart-solid"
            className="w-6 h-6 text-white"
            strokeWidth={1.5}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="h4" weight="medium" className="line-clamp-1">
          {name}
        </Text>
        <StarRating
          showCount
          reviewCount={review_count}
          rating={Number(average_rating)}
        />
        <Text variant="h4" weight="medium">
          {displayCurrency} {price || product_price}
        </Text>
      </div>
    </div>
  );
};
