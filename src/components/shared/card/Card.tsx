import React, { useRef } from "react";

import { StarRating, Text } from "@/components";
import { Icon, cn } from "@/lib";
import { useAddToWishlist, useBatchSignedUrl } from "@/features/website/hooks";
import { useAuthStore } from "@/stores";
import { ModalLogin } from "@/features";

export const Card = ({
  name,
  price,
  image_urls,
  average_rating,
  displayCurrency,
  display_currency,
  id,
  review_count,
}: any) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: mutateBatchSignedUrl } = useBatchSignedUrl();
  const { user } = useAuthStore();

  // Start cycling through images on hover
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

  const handleWishlistClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      setIsModalOpen(true);
    } else {
      setIsWishlisted(!isWishlisted);
      addToWishlist(
        { product_id: id, notes: "Wishlist item" },
        {
          onSuccess: () => {},
          onError: () => {
            setIsWishlisted(isWishlisted);
          },
        }
      );
    }
  };

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

  return (
    <div className="max-w-[274px] w-full p-1 hover:border hover:border-brand-primary transition-all duration-300 flex flex-col gap-4">
      <div
        className="h-[266px] relative cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {productImagesMap && productImagesMap.length > 0 && (
          <img
            src={productImagesMap[currentImageIndex]}
            loading="lazy"
            alt={`${name} - view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        <div
          className="absolute top-[14px] right-[14px] p-2 w-fit bg-white-100/30 rounded-full"
          onClick={(e) => handleWishlistClick(e, id)}
        >
          {!isWishlisted ? (
            <Icon
              icon="heroicons:heart"
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
          ) : (
            <Icon icon="mdi:heart" className="w-6 h-6 text-brand-primary" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="h4" weight="medium" className="line-clamp-1">
          {name}
        </Text>
        <StarRating
          rating={Number(average_rating)}
          showCount
          reviewCount={review_count}
        />
        <Text variant="h4" weight="medium">
          {display_currency || displayCurrency}
          {price}
        </Text>
      </div>
      <ModalLogin isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export const HorizontalCard = ({
  name,
  average_rating,
  price,
  image_urls,
  showHeart = false,
  className,
  imageClassName,
  quantity,
  displayCurrency,
}: any) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start cycling through images on hover
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
    <div
      className={cn(
        "w-full p-1 hover:border hover:border-brand-primary transition-all duration-300 flex gap-4",
        className
      )}
    >
      <div
        className={cn(
          "h-[266px] relative cursor-pointer overflow-hidden",
          imageClassName
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {image_urls.length > 0 && (
          <img
            src={image_urls[currentImageIndex]}
            loading="lazy"
            alt={`${name} - view ${currentImageIndex + 1}`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300"
            )}
          />
        )}
        {showHeart && (
          <div className="absolute top-[14px] right-[14px] p-2 w-fit bg-white-100/30 rounded-full">
            <Icon
              icon="heroicons:heart"
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="h4" weight="medium" className="line-clamp-1">
          {name}
        </Text>
        <StarRating rating={Number(average_rating)} />
        <Text variant="h4" weight="medium">
          {displayCurrency}
          {price}
        </Text>
        {quantity && (
          <Text variant="span" className="text-grey-100">
            Quantity: {quantity}
          </Text>
        )}
      </div>
    </div>
  );
};
