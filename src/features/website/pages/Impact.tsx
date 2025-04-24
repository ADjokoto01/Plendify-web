import { Text, AnimatedSection, Button } from "@/components";
import { Icon } from "@/lib";

import {
  MasterCardIcon,
  KingsRansomFoundationIcon,
  GhanaEnterprisesAgencyIcon,
  UnitedWayIcon,
  HFFGIcon,
} from "@/assets/svgs/svgs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import {
  CarouselPrevious,
  CarouselNext,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IMPACT_REPORTS } from "@/data";

import { ROUTES } from "@/utils";
import { useNavigate } from "react-router";
const CAUSES = [
  {
    id: 1,
    title: "Christianity (40%)",
    paragraph:
      "Spreading the Gospel through churches and ministries globally, sharing hope with every soul.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNocmlzdGlhbml0eXxlbnwwfDB8MHx8fDA%3D",
    icon: "hugeicons:church",
  },
  {
    id: 2,
    title: "Healthcare (30%)",
    paragraph:
      "Providing medical care and essentials like medication,PPEs, and medical equipment reflecting Christ’s compassion for the hurting. (Luke 10:34)",
    image:
      "https://plus.unsplash.com/premium_photo-1682130171029-49261a5ba80a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhbHRoY2FyZSUyMGJsYWNrfGVufDB8MHwwfHx8MA%3D%3D",
    icon: "hugeicons:healtcare",
  },
  {
    id: 3,
    title: "Education (30%)",
    paragraph:
      "Empowering youth with skills and learning, from rural classrooms to vocational training—because knowledge transforms lives. ",
    image:
      "https://plus.unsplash.com/premium_photo-1682284079705-dd1631f76f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGVkdWNhdGlvbnxlbnwwfDB8MHx8fDA%3D",
    icon: "hugeicons:global-education",
  },
];

const ORGANISATIONS = [
  {
    id: 1,
    name: "MasterCard",
    svg: <MasterCardIcon />,
  },
  {
    id: 2,
    name: "Kings Ransom Foundation",
    svg: <KingsRansomFoundationIcon />,
  },
  {
    id: 3,
    name: "Ghana Enterprises Agency",
    svg: <GhanaEnterprisesAgencyIcon />,
  },
  {
    id: 4,
    name: "United Way",
    svg: <UnitedWayIcon />,
  },
  {
    id: 5,
    name: "HFFG",
    svg: <HFFGIcon />,
  },
];
export const Impact = () => {
  const [activeCause, setActiveCause] = React.useState(CAUSES[0]);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12">
      <AnimatedSection>
        <div className="h-[389px] w-full">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1544476301-66914d9e95aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFwcHklMjBibGFjayUyMGNoaWxkcmVuJTIwaW4lMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="happy children"
            className="w-full h-full object-cover"
          />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Text as="span" className="text-grey-400">
              Social Impact
            </Text>
            <Text variant="h1" weight="medium" className="text-5xl">
              Our Commitment: Giving Back 10% of Profits
            </Text>
            <Text as="span">
              Every year, we dedicate 10% of our net profits to three causes
              close to God’s heart:
            </Text>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-full">
              <img
                src={activeCause.image}
                alt={activeCause.title}
                className="h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              {CAUSES.map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => setActiveCause(cause)}
                  className={cn(
                    "flex gap-2 py-6 px-5 border cursor-pointer",
                    activeCause.id === cause.id &&
                      "border-b-2 border-b-brand-primary"
                  )}
                >
                  <div className="h-10 w-10 flex-shrink-0  rounded-full bg-brand-primary text-white flex items-center justify-center">
                    <Icon icon={cause.icon} className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <Text variant="h2" weight="medium">
                      {cause.title}
                    </Text>
                    <Text as="span">{cause.paragraph}</Text>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="h-[136px] flex gap-1 overflow-x-hidden items-center">
            <Text as="p" className="text-grey-400 max-w-[203px] w-full">
              We work with organisations in these sectors.
            </Text>
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: [0, "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                  },
                }}
                className="flex gap-10"
              >
                {[...ORGANISATIONS, ...ORGANISATIONS].map(
                  (organisation, index) => (
                    <div
                      key={`${organisation.id}-${index}`}
                      className="flex gap-10"
                    >
                      {organisation.svg}
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between gap-4 items-center">
            <Text as="span" className="text-grey-400">
              Impact Reports
            </Text>
            <div className="flex gap-4">
              <CarouselPrevious className="relative top-0 left-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />

              <CarouselNext className="relative top-0 right-0 disabled:bg-grey-100 h-10 w-10 rounded-full flex items-center justify-center" />
            </div>
          </div>

          <CarouselContent className="flex gap-6 ml-4">
            {IMPACT_REPORTS.map((report) => (
              <CarouselItem
                key={report.id}
                className="flex flex-col justify-between p-1 hover:border hover:border-brand-primary gap-4 max-w-[370px] w-full"
              >
                <div className="h-[208px] w-full">
                  <img
                    loading="lazy"
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Text variant="h2" weight="medium">
                    {report.title}
                  </Text>
                  <Text variant="h5" weight="normal">
                    {report.paragraph}
                  </Text>
                </div>
                <Text variant="h5" weight="normal">
                  {report.author}
                </Text>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </AnimatedSection>

      <AnimatedSection>
        <div className="flex flex-col gap-4 bg-brand-primary text-white p-5 md:p-10 text-center justify-center items-center">
          <p className="text-lg md:text-5xl font-medium">
            A Business with a Heart for Impact. Where Profit Meets Purpose
          </p>
          <p className="text-base md:text-lg">
            We’re a business, rooted in faith and driven by a mission to honour
            God and bless the world. Inspired by Matthew 6:33—“Seek first the
            kingdom of God”—we’re here to make a difference, one purchase at a
            time.
          </p>

          <Button
            className="bg-white text-brand-primary w-fit rounded-none hover:bg-white/90 cursor-pointer"
            onClick={() => navigate(ROUTES.HOME)}
            size="lg"
          >
            Shop Now
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};
