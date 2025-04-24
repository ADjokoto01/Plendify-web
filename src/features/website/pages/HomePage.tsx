import {
  AnimatedSection,
  Button,
  Loader,
  SearchBox,
  StarRating,
  Text,
} from "@/components";
import thumbnail from "@/assets/images/thumbnail.webp";
import thumbnail1 from "@/assets/images/thumbnail-1.webp";
import thumbnail2 from "@/assets/images/thumbnail-2.webp";
import thumbnail3 from "@/assets/images/thumbnail-3.webp";
import thumbnail4 from "@/assets/images/thumbnail-4.webp";
import thumbnail5 from "@/assets/images/thumbnail-5.webp";
// import cosmetics1 from "@/assets/images/cosmetics-1.png";
// import cosmetics2 from "@/assets/images/cosmetics-2.png";
// import cosmetics3 from "@/assets/images/cosmetics-3.png";
// import cosmetics4 from "@/assets/images/cosmetics-4.png";
// import cosmetics5 from "@/assets/images/cosmetics-5.png";
import React from "react";

import { CardSection } from "../components";
import { FEATURED_SUPPLIERS } from "@/data";
import {
  CarouselPrevious,
  CarouselNext,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import {
  useHomeTrendingProducts,
  useHomeNewArrivals,
  usePaginationFilter,
  useGetVisitorsIP,
  useGetLocationFromIP,
} from "../hooks";
import { ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib";

export function HomePage() {
   const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );
  const { data: trendingProducts, isLoading } = useHomeTrendingProducts(
    locationData?.data?.currency
  );
  const { data: newArrivals, isLoading: isNewArrivalsLoading } =
    useHomeNewArrivals(locationData?.data?.currency);
  const navigate = useNavigate();
  const { q, setQ } = usePaginationFilter();

  const TESTIMONIALS = [
    {
      name: "Catherine",
      rating: 4.5,
      text: "I love Plendify! Their Customer Service was excellent and my packaged arrived earlier than expected. I highly recommend.",
      bg: "bg-brand-secondary",
    },
    {
      name: "Albert",
      rating: 4.5,
      text: "I am very much pleased with shopping on this platform. All my items were received as bought. Excellent packaging and great customer service. Plendify rocks!",
      bg: "bg-brand-tertiary",
    },
    {
      name: "John",
      rating: 4.5,
      text: "I am very much pleased with Plendify. I've used it to make a couple purchases and the process was easy both times. The app is easy to navigate and make payments.",
      bg: "bg-[#335CEB]",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <AnimatedSection>
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <section className="flex flex-col gap-6 max-w-[564px] w-full">
              <div className="flex flex-col gap-1">
                <Text variant="h5" weight="normal" className="text-grey-400">
                  Editors' Pick
                </Text>
                <Text variant="h2" weight="medium">
                  Essential Easter Finds
                </Text>
                <Text variant="h5" weight="normal">
                  Discover original pieces and perfect gifts for the holiday
                </Text>
              </div>
              <Button
                onClick={() => navigate(ROUTES.SEARCH)}
                className="w-fit cursor-pointer"
              >
                Shop these unique finds
              </Button>
            </section>

            <div className="hidden md:flex gap-6 max-w-[625px] jusitify-between w-full">
              <div className="lg:max-w-[300px] h-[300px] w-full">
                <img src={thumbnail} alt="easter" className="w-full h-full" />
              </div>
              <div className="lg:max-w-[300px] h-[300px] w-full">
                <img src={thumbnail1} alt="easter" className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 justify-between">
            <div className="lg:max-w-[300px] h-[300px] w-full">
              <img src={thumbnail2} alt="easter" className="w-full h-full" />
            </div>
            <div className="lg:max-w-[300px] h-[300px] w-full">
              <img src={thumbnail3} alt="easter" className="w-full h-full" />
            </div>
            <div className="lg:max-w-[300px] h-[300px] w-full">
              <img src={thumbnail4} alt="easter" className="w-full h-full" />
            </div>
            <div className="lg:max-w-[300px] h-[300px] w-full">
              <img src={thumbnail5} alt="easter" className="w-full h-full" />
            </div>
          </div>
        </section>
      </AnimatedSection>
      {isNewArrivalsLoading ? (
        <Loader />
      ) : (
        <CardSection badge="New Arrivals" cards={newArrivals?.newArrivals} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <CardSection
          badge="Trending Now"
          cards={trendingProducts?.trendingProducts}
          slice={4}
        />
      )}
      <AnimatedSection>
        <Carousel className="flex flex-col gap-4 overflow-x-hidden py-6">
          <div className="flex lg:justify-end gap-4">
            <CarouselPrevious className="relative top-0 left-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />

            <CarouselNext className="relative top-0 right-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <section className="flex flex-col gap-6 lg:max-w-[348px] w-full">
              <div className="flex flex-col gap-1">
                <Text variant="h5" weight="normal" className="text-grey-400">
                  Editors' Pick
                </Text>
                <p className="text-[52px] leading-[60px] font-medium">
                  Shoppers love Plendify
                </p>
                <Text className="text-sm md:text-base">
                  Join thousands of happy customers shopping authentic African
                  treasures with Plendify—rated 4+ on Trustpilot for quality and
                  fast delivery!
                </Text>
              </div>
            </section>
            <CarouselContent className="flex gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.name}
                  className={cn(
                    "flex flex-col p-5 md:p-8 rounded-4xl basis-52 md:basis-1/2 lg:basis-1/3 text-white",
                    testimonial.bg,
                    index === 0 && "ml-[20%] md:ml-4"
                  )}
                >
                  <div className="flex flex-col gap-8">
                    <StarRating
                      rating={testimonial.rating}
                      className="text-white"
                      showCount={false}
                    />
                    <p className="pb-8 max-w-[190px] w-full md:max-w-full text-sm md:text-base">
                      {testimonial.text}
                    </p>
                  </div>
                  <Text variant="h5" weight="normal">
                    {testimonial.name}
                  </Text>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </AnimatedSection>

      <div className="flex flex-col gap-4">
        <Text variant="h3" weight="normal">
          Featured Suppliers
        </Text>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 relative h-[1000px] overflow-hidden">
          <div className="relative h-[1000px] overflow-hidden">
            <motion.div
              animate={{ y: [0, "-50%"] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex flex-col gap-4 max-w-[267px] w-full absolute"
            >
              {[
                ...FEATURED_SUPPLIERS[0].image,
                ...FEATURED_SUPPLIERS[0].image,
              ].map((image, index) => (
                <img
                  key={`${image.url}-${index}`}
                  src={image.url}
                  alt={image.alt}
                  className={image.size}
                />
              ))}
            </motion.div>
          </div>

          <div className="relative h-[1000px] overflow-hidden">
            <motion.div
              animate={{ y: ["-50%", 0] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex flex-col gap-4 max-w-[267px] w-full absolute"
            >
              {[
                ...FEATURED_SUPPLIERS[1].image,
                ...FEATURED_SUPPLIERS[1].image,
              ].map((image, index) => (
                <img
                  key={`${image.url}-${index}`}
                  src={image.url}
                  alt={image.alt}
                  className={image.size}
                />
              ))}
            </motion.div>
          </div>

          <div className="relative hidden md:flex h-[1000px] overflow-hidden">
            <motion.div
              animate={{ y: [0, "-50%"] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex flex-col gap-4 max-w-[267px] w-full absolute"
            >
              {[
                ...FEATURED_SUPPLIERS[2].image,
                ...FEATURED_SUPPLIERS[2].image,
              ].map((image, index) => (
                <img
                  key={`${image.url}-${index}`}
                  src={image.url}
                  alt={image.alt}
                  className={image.size}
                />
              ))}
            </motion.div>
          </div>

          <div className="relative hidden md:flex h-[1000px] overflow-hidden">
            <motion.div
              animate={{ y: ["-50%", 0] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
              }}
              className="flex flex-col gap-4 max-w-[267px] w-full absolute"
            >
              {[
                ...FEATURED_SUPPLIERS[3].image,
                ...FEATURED_SUPPLIERS[3].image,
              ].map((image, index) => (
                <img
                  key={`${image.url}-${index}`}
                  src={image.url}
                  alt={image.alt}
                  className={image.size}
                />
              ))}
            </motion.div>
          </div>
          {/* More columns could go here */}

          {/* Bottom overlay positioned correctly */}
          <div className="absolute left-0 right-0 bottom-0 h-[118px] bg-white/50" />
        </section>
      </div>
      <AnimatedSection>
        <section className="pt-10 md:py-20 max-w-[1000px] flex flex-col gap-8 justify-center items-center mx-auto relative">
          <p className="text-2xl md:text-3xl font-extrabold text-center">
            Unearth one-of-a-kind treasures on Plendify, crafted with passion
            and premium ingredients to inspire joy in every detail.
          </p>
          <SearchBox
            value={q || ""}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                navigate(`${ROUTES.SEARCH}?q=${q}`);
              }
            }}
            className="max-w-[524px] w-full mx-auto"
            placeholder="Search for products"
          />

          {/* <img
            src={cosmetics1}
            alt="cosmetics"
            className="absolute hidden lg:block -left-40 top-5 h-[138px]"
          />

          <img
            src={cosmetics3}
            alt="cosmetics"
            className="absolute hidden lg:block -left-80 top-[40%] h-[138px]"
          />

          <img
            src={cosmetics2}
            alt="cosmetics"
            className="absolute hidden lg:block right-[5%] top-[70%] h-[138px]"
          />

          <img
            src={cosmetics4}
            alt="cosmetics"
            className="absolute hidden lg:block -right-40 top-5 h-[138px]"
          />

          <img
            src={cosmetics5}
            alt="cosmetics"
            className="absolute hidden lg:block -right-80 top-[40%] h-[138px]"
          /> */}
        </section>
      </AnimatedSection>
    </div>
  );
}
