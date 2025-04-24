import { AnimatedSection, Button, Text } from "@/components";
import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/utils";
import { motion } from "framer-motion";
import { AccordionItems } from "@/data";
import {
  MasterCardIcon,
  GhanaEnterprisesAgencyIcon,
  DHL,
  Proxtera,
  AFCFTA,
} from "@/assets/svgs/svgs";
import { cn, Icon } from "@/lib";

const ORGANISATIONS = [
  {
    id: 1,
    name: "Proxtera",
    svg: <Proxtera />,
  },
  {
    id: 2,
    name: "Ghana Enterprises Agency",
    svg: <GhanaEnterprisesAgencyIcon />,
  },
  {
    id: 3,
    name: "DHL",
    svg: <DHL />,
  },
  {
    id: 4,
    name: "MasterCard",
    svg: <MasterCardIcon />,
  },
  {
    id: 5,
    name: "AFCFTA",
    svg: <AFCFTA />,
  },
];

const CAUSES = [
  {
    id: 1,
    title: "The Services Partner Program has you covered",
    paragraph: [
      "Amplify lead generation with support from Plendify sales and marketing teams",
      "Stay updated with Plendify technical training and resources",
      "Receive dialed-in expertise from a dedicated partner manager",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Find a Services Partner",
    paragraph: [
      "Our Services Partners help companies succeed with Plendify. Exclusive support and customized solutions maximize your investment in the connected apps platform.",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1707155465551-0d2b570926d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHNlcnZpY2UlMjBwYXJ0bmVyJTIwYnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
  },
];

export function Partners() {
  const navigate = useNavigate();
  const [activeCause, setActiveCause] = React.useState(CAUSES[0]);
  const [activeAccordion, setActiveAccordion] = React.useState(0);
  return (
    <section className="flex flex-col gap-12">
      <AnimatedSection>
        <div className="flex justify-between items-center gap-4">
          <section className="flex flex-col gap-6 max-w-[564px] w-full">
            <div className="flex flex-col gap-1">
              <Text variant="h1">
                Our Game-Changing{" "}
                <span className="text-brand-primary">Partners</span>
              </Text>
              <Text variant="h5" weight="normal">
                Joining forces with global trailblazers to supercharge African
                sellers and revolutionizing global trade!
              </Text>
            </div>
            <Button
              onClick={() => navigate(ROUTES.SEARCH)}
              className="w-fit cursor-pointer"
            >
              Become a Partner
            </Button>
          </section>

          <div className="hidden md:flex gap-6 max-w-[625px] jusitify-between w-full">
            <div className="w-full">
              <img
                src="https://plus.unsplash.com/premium_photo-1664301343632-f2c55a3dc519?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fHBhcnRuZXIlMjBidXNpbmVzc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="easter"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="h-[136px] flex gap-1 overflow-x-hidden items-center">
          <Text as="p" className="text-grey-400 max-w-[203px] w-full">
            Powerhouse Collaborations.
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
      </AnimatedSection>
      <AnimatedSection>
        <section>
          <div>
            <Text variant="h3" weight="normal" className="text-lg">
              What do you get in return?
            </Text>
            <p className="text-lg font-medium md:text-3xl">
              Boost your outcomes with partner benefits.
            </p>
          </div>
          <div className="pt-10 grid gap-4 lg:pt-20 lg:grid-cols-3 lg:gap-0">
            <div className="lg:wrapper flex flex-col gap-2 md:gap-6 lg:border-r lg:border-r-brand-primary">
              <p className="text-2xl font-bold md:text-3xl">
                Reach new audiences
              </p>
              <p>
                Expand your client base through the Plendify network. Tap into
                industry-leading organizations who rely on Plendify.
              </p>
            </div>
            <div className="lg:px-4 flex flex-col gap-2 md:gap-6 lg:border-r lg:border-r-brand-primary">
              <p className="text-2xl font-bold md:text-3xl">Drive revenue</p>
              <p>
                Increase your sales reach and expand existing deals. Provide
                clients with custom use cases for Plendify.
              </p>
            </div>
            <div className="lg:wrapper md:pl-4 flex flex-col gap-2 md:gap-6">
              <p className="text-2xl font-bold md:text-3xl">
                Advance your business
              </p>
              <p>
                Enhance your Plendify expertise with customized solutions. Lead
                innovation in the future of the connected apps platform.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <section className="flex flex-col gap-4">
          <Text variant="h1" weight="medium" className="text-5xl">
            Get full support
          </Text>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-[392px]">
              <img
                src={activeCause.image}
                alt={activeCause.title}
                className="h-full object-cover w-full"
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
                  <div className="text-left flex flex-col gap-4">
                    <Text variant="h2" weight="medium">
                      {cause.title}
                    </Text>
                    <div className="flex flex-col gap-2">
                      {cause.paragraph.map((paragraph) => (
                        <Text as="span">{paragraph}</Text>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <section className="flex flex-col gap-2 md:gap-4">
          <p className="text-2xl font-bold md:text-3xl">
            You have questions? We have answers.
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
    </section>
  );
}
