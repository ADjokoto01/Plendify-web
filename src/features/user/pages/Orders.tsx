import { Loader, Text } from "@/components";
import { useFindMyPurchases } from "@/features/supplier/hooks";
import {
  useBatchSignedUrl,
  useGetLocationFromIP,
  useGetVisitorsIP,
} from "@/features/website";
import { cn } from "@/lib";
import React from "react";
import { format } from "date-fns";

export const Orders = () => {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data, isLoading } = useFindMyPurchases(
    locationData?.data?.currency || ""
  );
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && data?.purchases?.length === 0 ? (
        <div className="border p-5">
          <Text variant="p">No Purchases made</Text>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data?.purchases.map((purchase: any, index: number) => (
            <PurchaseHorizontalCard key={index} {...purchase} />
          ))}
        </div>
      )}
    </div>
  );
};

const PurchaseHorizontalCard = ({
  products,
  className,
  imageClassName,
  payment_details,
  formattedTotal,
}: any) => {
  const [productImagesMap, setProductImagesMap] = React.useState<any>([]);
  const { mutate: mutateBatchSignedUrl, isPending } = useBatchSignedUrl();

  React.useEffect(() => {
    if (products[0]?.image_url) {
      const imageUrls = products[0]?.image_url;

      // Pass the flattened array to get signed URLs
      mutateBatchSignedUrl([imageUrls] as string[], {
        onSuccess: (response) => {
          // Assuming the response contains a mapping of original URLs to signed URLs
          const signedUrlsData = response.data.urls || {};

          setProductImagesMap(Object.values(signedUrlsData));
        },
      });
    }
  }, [products[0]?.image_url, mutateBatchSignedUrl]);
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className={cn("w-full p-1 flex gap-4", className)}>
          <div
            className={cn(
              "h-[266px] relative cursor-pointer overflow-hidden",
              imageClassName
            )}
          >
            <img
              src={productImagesMap}
              loading="lazy"
              alt="product-image"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <div>
              <Text variant="h4" weight="medium" className="line-clamp-1">
                {products?.name}
              </Text>
              <Text variant="p">
                Payment Date:{" "}
                {format(new Date(payment_details.payment_date), "MM/dd/yyyy")}
              </Text>

              <Text variant="p">Quantity: {products[0]?.quantity}</Text>
              <Text variant="p">{payment_details?.payment_method}</Text>

              <Text variant="p">Status: {payment_details.status}</Text>
            </div>

            <Text variant="h4" weight="medium">
              {formattedTotal}
            </Text>
          </div>
        </div>
      )}
    </>
  );
};
