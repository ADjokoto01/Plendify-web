import { Text, Button, AnimatedSection, DoubleButton } from "@/components";
import Shoes from "@/assets/images/shoes.webp";
import Pomade from "@/assets/images/pomade.webp";
import CollectionPomade from "@/assets/images/collection-pomade.webp";
import AfterCare from "@/assets/images/after-care.webp";
import Tube from "@/assets/images/tube.webp";
import SellerFooterImage from "@/assets/images/seller-footer-image.webp";
import React from "react";
import { Icon } from "@/lib";
import { AccordionItems } from "@/data";
import {
  CarouselPrevious,
  CarouselNext,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";

export const SellersHome = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = React.useState(0);
  return (
    <div className="flex flex-col gap-10">
      <AnimatedSection>
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-6 max-w-[564px] w-full">
              <div>
                <Text variant="h2" weight="medium">
                  Captivate new <br />
                  <span className="text-brand-primary">
                    Global Customers
                  </span>{" "}
                  with Plendify.
                </Text>
                <Text variant="span">
                  Grow your business, push creative boundaries and build lasting
                  connections – all in one place.
                </Text>
              </div>
              <Button
                onClick={() => navigate(ROUTES.SELLERS.REGISTER)}
                className="w-fit cursor-pointer"
              >
                Get Started
              </Button>
            </div>

            <div className="w-full hidden lg:block lg:max-w-[300px] h-[300px]">
              <img
                src={Shoes}
                alt="shoes"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="hidden lg:flex justify-between gap-4 items-center">
            <div className="w-full lg:max-w-[300px] h-[300px]">
              <img
                src={Tube}
                alt="tube"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full hidden lg:block max-w-[300px] h-[300px]">
              <img
                src={Pomade}
                alt="pomade"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full hidden lg:block max-w-[300px] h-[300px]">
              <img
                src={CollectionPomade}
                alt="collection pomade"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full lg:max-w-[300px] h-[300px]">
              <img
                src={AfterCare}
                alt="after care"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <section>
          <div>
            <Text variant="h3" weight="normal" className="text-lg">
              What do you want to achieve?
            </Text>
            <p className="text-lg font-medium md:text-3xl">
              Get results that matter throughout the customer journey.
            </p>
          </div>
          <div className="pt-10 grid gap-4 lg:pt-20 lg:grid-cols-3 lg:gap-0">
            <div className="lg:wrapper flex flex-col gap-2 md:gap-6 lg:border-r lg:border-r-brand-primary">
              <p className="text-2xl font-bold md:text-3xl">Grow awareness</p>
              <p>
                Share content and try different formats such as posts, Stories
                and Reels to get the word out about your business.
              </p>
            </div>
            <div className="lg:px-4 flex flex-col gap-2 md:gap-6 lg:border-r lg:border-r-brand-primary">
              <p className="text-2xl font-bold md:text-3xl">
                Get new customers.
              </p>
              <p>
                Encourage people to purchase a product or service by clicking
                through to your website or visiting the physical location of
                your business.
              </p>
            </div>
            <div className="lg:wrapper md:pl-4 flex flex-col gap-2 md:gap-6">
              <p className="text-2xl font-bold md:text-3xl">
                Build relationships.
              </p>
              <p>
                Grow your community by encouraging subscriptions, appointments
                and questions through conversations on Direct.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

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
                  How it works
                </Text>
                <Text variant="h1" className="text-[52px] font-medium">
                  Create a great listing
                </Text>
                <Text variant="h5" weight="normal">
                  Here’s three ways to set yourself up for success.
                </Text>
              </div>
            </section>
            <CarouselContent className="flex gap-6">
              <CarouselItem className="flex ml-4 flex-col gap-8 bg-brand-secondary p-8 rounded-4xl max-w-[250px] lg:max-w-[362px] w-full text-white">
                <div className="flex flex-col gap-8">
                  <Text variant="h3" weight="medium">
                    Write a standout title
                  </Text>
                </div>
                <Text variant="h4" weight="normal">
                  We’ll recommend search terms that buyers often use, so be sure
                  to add these in the title.
                </Text>
              </CarouselItem>
              <CarouselItem className="flex flex-col gap-8 bg-brand-tertiary p-8 rounded-4xl max-w-[250px] lg:max-w-[362px] w-full text-white">
                <div className="flex flex-col gap-8">
                  <Text variant="h3" weight="medium">
                    Take high-quality photos
                  </Text>
                </div>
                <Text variant="h4" weight="normal">
                  Snap your items from multiple angles in a well-lit place, and
                  capture any blemishes for transparency.
                </Text>
              </CarouselItem>
              <CarouselItem className="flex lg:h-[298px] flex-col gap-8 bg-[#335CEB] p-8 rounded-4xl max-w-[250px] lg:max-w-[362px] w-full text-white">
                <div className="flex flex-col gap-8">
                  <Text variant="h3" weight="medium">
                    Set the right price
                  </Text>
                </div>
                <Text variant="h4" weight="normal">
                  We will recommend a price based on recent sales of similar
                  items.
                </Text>
              </CarouselItem>
            </CarouselContent>
          </div>
        </Carousel>
      </AnimatedSection>
      <AnimatedSection>
        <section className="flex flex-col gap-2 md:gap-6">
          <p className="text-2xl font-bold md:text-3xl">
            Frequently Asked Questions
          </p>
          <div className="py-4 flex flex-col">
            {AccordionItems.map((item, index) => (
              <div className="flex flex-col gap-3 py-4 border-b border-b-grey-100/50">
                <div className="flex items-center justify-between">
                  <Text variant="h3" weight="normal">
                    {item.title}
                  </Text>
                  <Icon
                    icon={activeAccordion === index ? "mdi:minus" : "mdi:plus"}
                    className="w-4 h-4"
                    onClick={() =>
                      setActiveAccordion(activeAccordion === index ? -1 : index)
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
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <div className="relative w-full">
          <div>
            <img src={SellerFooterImage} alt="" className="w-full" />
          </div>
          <div className="hidden lg:max-w-[596px] w-full bg-white shadow-2xl p-6 lg:flex flex-col gap-4 absolute top-[10%] lg:top-1/4 left-[10%]">
            <p className="text-2xl md:text-4xl font-medium">
              You've got this. <br /> We've got your back
            </p>
            <div>
              <DoubleButton
                onClick={() => navigate(ROUTES.SELLERS.REGISTER)}
                className=" cursor-pointer"
              >
                LIST AN ITEM
              </DoubleButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
