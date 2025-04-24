import { Loader, StarRating, Text } from "@/components";
import { cn, Icon } from "@/lib";
import React from "react";
import {
  useFindProductsByShopId,
  useGetShop,
  useDeleteProduct,
} from "../hooks/registeration";
import { useBatchSignedUrl } from "@/features/website";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";
export const ListProducts = () => {
  const { data: shopData } = useGetShop();
  const { data, isLoading } = useFindProductsByShopId(shopData?.shop?.id || "");

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center gap-2 text-brand-primary h-[375px] max-w-[375px] w-full border border-dashed border-brand-primary rounded-lg">
            <Link to={ROUTES.SELLERS.ADD_LISTING}>
              <Icon icon="mdi:plus-circle" className="h-6 w-6 mx-auto" />
              <Text variant="span">Add a listing</Text>
            </Link>
          </div>
          {data.products.map((product: any) => (
            <Card className="max-w-[375px]" key={product.id} {...product} />
          ))}
        </div>
      )}
    </>
  );
};

export const Card = ({
  name,
  average_rating,
  price,
  image_urls,
  review_count,
  displayCurrency,
  id,
  className,
}: any) => {
  const { mutate: mutateDeleteProduct } = useDeleteProduct();
  function handleDelete(e: React.MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    mutateDeleteProduct(id);
  }

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const { mutate: mutateBatchSignedUrl } = useBatchSignedUrl();
  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);

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
    <div
      className={cn(
        "max-w-[274px] w-full p-1 hover:border hover:border-brand-primary transition-all duration-300 flex flex-col gap-4",
        className
      )}
    >
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
          className="absolute top-[14px] right-[14px] p-2 w-fit bg-white rounded-full"
          onClick={(e) => handleDelete(e, id)}
        >
          <Icon
            icon="heroicons:trash"
            className="w-6 h-6 text-semantics-red"
            strokeWidth={1.5}
          />
        </div>
        {/* <div
          className="absolute top-[14px] left-[14px] p-2 w-fit bg-white-100/30 rounded-full"
          onClick={(e) => handleDelete(e, id)}
        >
          <Icon
            icon="heroicons:pencil"
            className="w-6 h-6 text-white"
            strokeWidth={1.5}
          />
        </div> */}
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
          {displayCurrency}
          {price}
        </Text>
      </div>
    </div>
  );
};
