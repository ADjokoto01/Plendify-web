import {
  Avatar,
  Button,
  Card,
  DoubleButton,
  // DoubleButton,
  Loader,
  StarRating,
  Text,
} from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Icon } from "@/lib";
import { ROUTES } from "@/utils";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductById,
  useAddToCart,
  useBatchSignedUrl,
  useFetchOtherProductsByCategoryId,
  useFetchReviewsById,
  useGetPresignedUrl,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../hooks";
import { toast } from "react-toastify";
import { useFetchUserById } from "@/features/user";
import { ModalLogin } from "@/features/auth";

export function ProductDetailPage() {
  const { id } = useParams();
  const [openModal, setOpenModal] = React.useState(false);

  const [quantity, setQuantity] = React.useState(1);
  const [activeAccordion, setActiveAccordion] = React.useState(0);
  const { data: reviews, isLoading: isReviewsLoading } = useFetchReviewsById(
    id || ""
  );

  const { data: user } = useFetchUserById();
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );

  const { data } = useFetchProductById(id || "", locationData?.data?.currency);

  const navigate = useNavigate();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: mutateBatchSignedUrl, isPending: isBatchSignedUrlPending } =
    useBatchSignedUrl();
  const [productImagesMap, setProductImagesMap] = React.useState<string[]>([]);

  const handleAddToCart = () => {
    if (!user) {
      setOpenModal(true);
      return;
    }
    if (quantity > (data?.product.stock_quantity || 0)) {
      toast.error(
        `Quantity must be less than the stock quantity ${data?.product.stock_quantity}`
      );
      return;
    } else if (quantity > 0) {
      addToCart({ product_id: id || "", quantity });
    } else {
      toast.error("Quantity must be greater than 0");
    }
  };

  React.useEffect(() => {
    if (data) {
      const imageUrls = data.product.image_urls;

      // Pass the flattened array to get signed URLs
      mutateBatchSignedUrl(imageUrls as string[], {
        onSuccess: (response) => {
          // Assuming the response contains a mapping of original URLs to signed URLs
          const signedUrlsData = response.data.urls || {};

          setProductImagesMap(Object.values(signedUrlsData));
        },
      });
    }
  }, [data, mutateBatchSignedUrl]);

  const AccordionItems = [
    {
      title: "Description",
      content: data?.product?.description || "",
    },
    {
      title: "Product Details",
      content: data?.product?.product_details || "",
    },
    {
      title: "Product Instructions",
      content: data?.product?.product_instructions || "",
    },
  ];

  const { data: logoUrl } = useGetPresignedUrl(
    data?.product.shop_logo_url || ""
  );

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
              {data?.product.category_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isBatchSignedUrlPending && <Loader />}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              {productImagesMap.map((image, index) => (
                <div key={index} className="w-full max-w-[327px] h-[327px]">
                  <img
                    src={image}
                    alt={id || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Text variant="h3" weight="medium">
                Ratings and Reviews
              </Text>
              <section className="flex flex-col gap-4">
                {isReviewsLoading ? (
                  <Loader />
                ) : reviews?.data?.reviews.length > 0 ? (
                  <>
                    {reviews?.data?.reviews.map((review: any) => (
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                          <StarRating rating={Number(review.rating)} />
                          <Text variant="p" className="text-xs" weight="medium">
                            {review.user_name}
                          </Text>
                        </div>
                        <Text variant="p" className="text-xs">
                          {review.comment}
                        </Text>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="border p-5">
                    <Text variant="p" className="text-xs">
                      No reviews yet
                    </Text>
                  </div>
                )}
              </section>
            </div>
          </section>

          <div className="flex flex-col gap-3">
            <Text variant="h1" weight="extrabold">
              {data.product.name}
            </Text>
            <Text variant="p" weight="medium">
              {data.product.displayCurrency} {data.product.price}
            </Text>
            <StarRating
              rating={Number(data.product.average_rating)}
              showCount
              reviewCount={data.product.review_count}
            />
            <section className="border-t border-t-grey-100/50">
              <div className="border-b border-b-grey-100/50 text-grey-200 py-4 flex items-center gap-2">
                <Icon icon="hugeicons:truck" className="w-4 h-4" />
                <Text variant="p">Ships in: 2 - 5 Business Days</Text>
              </div>
              <div className="border-b border-b-grey-100/50 py-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-between">
                  <Text variant="h3" weight="normal">
                    Quantity{" "}
                    <span className="text-xs text-grey-200">
                      (Max {data?.product.stock_quantity})
                    </span>
                  </Text>
                  <div className="flex items-center">
                    {/* cant go below 0 */}
                    <button
                      onClick={() =>
                        setQuantity(quantity > 0 ? quantity - 1 : 0)
                      }
                      className="border bg-white-200 border-grey-100 h-10 w-10 flex justify-center items-center"
                    >
                      <Icon icon="mdi:minus" className="w-4 h-4" />
                    </button>
                    <Text
                      variant="p"
                      className="h-10 w-10 flex justify-center items-center"
                    >
                      {quantity}
                    </Text>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="border bg-white-200 border-grey-100 h-10 w-10 flex justify-center items-center"
                    >
                      <Icon icon="mdi:plus" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <DoubleButton
                    loading={isPending}
                    onClick={handleAddToCart}
                    doubleSize="lg"
                    className="ml-0"
                    size="lg"
                  >
                    Add to Cart
                  </DoubleButton>
                  <Button
                    variant="outline"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-none w-full cursor-pointer"
                    size="lg"
                    loading={isPending}
                    onClick={() => {
                      if (quantity > 0) {
                        if (!user) {
                          setOpenModal(true);
                          return;
                        }
                        addToCart({ product_id: id || "", quantity });
                        navigate(ROUTES.CART);
                      } else {
                        toast.error("Quantity must be greater than 0");
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
              <div className="py-4 flex flex-col">
                {AccordionItems.map((item, index) => (
                  <div className="flex flex-col gap-3 py-4 border-b border-b-grey-100/50">
                    <div className="flex items-center justify-between">
                      <Text variant="h3" weight="normal">
                        {item.title}
                      </Text>
                      <Icon
                        icon={
                          activeAccordion === index ? "mdi:minus" : "mdi:plus"
                        }
                        className="w-4 h-4"
                        onClick={() =>
                          setActiveAccordion(
                            activeAccordion === index ? -1 : index
                          )
                        }
                      />
                    </div>
                    {activeAccordion === index && (
                      <div className="flex flex-col gap-4">
                        <Text variant="p" weight="normal">
                          {item.content}
                        </Text>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Avatar src={logoUrl?.url} size="sm" />
                <Text variant="p" weight="normal">
                  {data.product.shop_name}
                </Text>
              </div>
            </section>
          </div>
        </div>
      )}
      <CardSection categoryId={data?.product.category_id || ""} />
      <ModalLogin isModalOpen={openModal} setIsModalOpen={setOpenModal} />
    </div>
  );
}

function CardSection({ categoryId }: { categoryId: string }) {
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data, isLoading } = useFetchOtherProductsByCategoryId(
    categoryId,
    locationData?.data?.currency
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Carousel className="flex flex-col gap-4">
            <div className="flex justify-between gap-4 items-center">
              <Badge>Other items to consider</Badge>
              <div className="flex gap-4">
                <CarouselPrevious className="relative top-0 left-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />

                <CarouselNext className="relative top-0 right-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />
              </div>
            </div>

            {/* show 4 cards at a time */}
            <CarouselContent className="flex">
              {data?.products.map((product) => (
                <CarouselItem key={product.id} className="max-w-[307px] w-full">
                  <Link to={`${ROUTES.PRODUCT_DETAIL}/${product.id}`}>
                    <Card {...product} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </>
      )}
    </>
  );
}
