import {
  InstagramIcon,
  LinkedinIcon,
  Twitter,
  WhatsappIcon,
} from "@/assets/svgs/svgs";
import { Text } from "../text";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";

const COMPANY_LINKS = [
  {
    label: "Our Story",
    href: ROUTES.STORY,
  },
  // {
  //   label: "Careers",
  //   href: "/careers",
  // },
  {
    label: "Impact",
    href: ROUTES.IMPACT,
  },
  {
    label: "Partners",
    href: ROUTES.PARTNERS,
  },
  {
    label: "Shipping Fees",
    href: ROUTES.SHIPPING_FEES,
  },
];

const MARKETPLACE_LINKS = [
  // {
  //   label: "Sell",
  //   href: ROUTES.SELLERS.REGISTER,
  // },
  {
    label: "Become a Seller",
    href: ROUTES.SELLERS.HOME,
  },
];

const FINTECH_LINKS = [
  {
    label: "Terms & Conditions",
    href: ROUTES.TERMS_CONDITIONS,
  },
  {
    label: "Privacy Policy",
    href: ROUTES.PRIVACY_POLICY,
  },
  {
    label: "Shipping & Returns",
    href: ROUTES.SHIPPING_RETURNS,
  },
  {
    label: "Refund Policy",
    href: ROUTES.REFUND,
  },
];

const CONTACT_LINKS = [
  {
    label: "Digital Address: GL-116-2956",
    href: "#",
  },
  {
    label: "Address: 5th Floor Silver Star Tower Airport City, Accra Ghana",
    href: "#",
  },
];

const GIFT_CARDS_LINKS = [
  {
    label: "Give a Gift Today (Coming Soon)",
    href: "/gift-cards",
  },
];

export const Footer = () => {
  return (
    <div className="wrapper flex flex-col gap-12">
      <div className="bg-black text-white flex justify-between items-center p-4">
        <input
          placeholder="Enter your email for newsletter"
          className="placeholder:text-white text-white bg-transparent outline-none w-2/3"
        />
        <Text className="uppercase cursor-pointer hover:text-gray-300">
          Subscribe
        </Text>
      </div>

      <section className="flex justify-between w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          <div className="p-2 flex flex-col gap-3">
            <Text as="p" className="text-black font-medium">
              Company
            </Text>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {COMPANY_LINKS.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-2 flex flex-col gap-3">
            <Text as="p" className="text-black font-medium">
              Marketplace
            </Text>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {MARKETPLACE_LINKS.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-2 flex flex-col gap-3">
            <Text as="p" className="text-black font-medium">
              Policies
            </Text>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {FINTECH_LINKS.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-2 flex flex-col gap-3">
              <Text as="p" className="text-black font-medium">
                Contact Us
              </Text>
              <ul className="flex flex-col gap-2 text-sm text-gray-600">
                {CONTACT_LINKS.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2 flex flex-col gap-3">
              <Text as="p" className="text-black font-medium">
                Let's Chat
              </Text>
              <section className="flex gap-2">
                <div
                  onClick={() =>
                    window.open("https://wa.me/233501863453", "_blank")
                  }
                  className="cursor-pointer"
                >
                  <WhatsappIcon />
                </div>
                <div
                  onClick={() =>
                    window.open(
                      "https://x.com/plendify?t=GYcT_Yf5qPBzuCcvM8mC1g&s=08",
                      "_blank"
                    )
                  }
                  className="cursor-pointer"
                >
                  <Twitter />
                </div>
              </section>
            </div>
          </div>
        </div>
        <section className="flex flex-col gap-[10px]">
          <div className="p-2 flex flex-col gap-3">
            <Text as="p" className="text-black font-medium text-grey-200">
              Gift Cards
            </Text>
            <ul className="flex flex-col gap-2 text-sm">
              {GIFT_CARDS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-2 flex flex-col gap-3">
            <Text as="p" className="text-black font-medium text-grey-200">
              Social Media
            </Text>

            <Text as="p">Follow Plendify</Text>
          </div>
          <div className="p-2 flex-col gap-3 flex">
            <ul className="flex gap-4 text-sm items-center">
              <Link
                target="_blank"
                to="https://www.instagram.com/plendify"
                className="hover:underline"
              >
                <InstagramIcon />
              </Link>
              <Link
                target="_blank"
                to="https://www.linkedin.com/company/plendify"
                className="hover:underline"
              >
                <LinkedinIcon />
              </Link>
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
};
