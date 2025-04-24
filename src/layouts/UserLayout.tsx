import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/utils/route-constants";
import { cn, Icon } from "@/lib";
import { Navbar, Text, Footer, Wrapper } from "@/components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores";

export const UserLayout = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { user } = useAuthStore();

  // hide shop if not seller

  const AUTH_LINKS = [
    {
      label: "Orders",
      href: ROUTES.USER.ORDERS,
      icon: "mdi:archive",
      show: user?.role === "user",
    },
    {
      label: "Personal details",
      href: ROUTES.USER.PERSONAL_DETAILS,
      icon: "mdi:account",
      show: true,
    },
    {
      label: "Purchases & Reviews",
      href: ROUTES.USER.PURCHASE_AND_REVIEWS,
      icon: "mdi:message-draw",
      show: user?.role === "seller",
    },
    {
      label: "Shop",
      href: ROUTES.USER.SHOP,
      icon: "mdi:store",
      show: user?.role === "seller",
    },
    {
      label: "List products",
      href: ROUTES.USER.LIST_PRODUCTS,
      icon: "mdi:package-variant-plus",
      show: user?.role === "seller",
    },
    // {
    //   label: "Address book",
    //   href: ROUTES.USER.ADDRESS_BOOK,
    //   icon: "mdi:map-marker",
    //   show: true,
    // },
    // {
    //   label: "Payment methods",
    //   href: ROUTES.USER.PAYMENT_METHODS,
    //   icon: "mdi:credit-card",
    //   show: true,
    // },
  ];

  return (
    <Wrapper>
      <Navbar />
      <div className="flex flex-col gap-12 w-[80%] mx-auto py-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={ROUTES.USER.ORDERS}>
                My Account
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium capitalize">
                {pathname.split("/").pop()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
          <div className="flex flex-col">
            {AUTH_LINKS.filter((link) => link.show).map((link) => (
              <div
                key={link.label}
                className={cn(
                  "flex items-center gap-2 p-4 border-b border-gray-200",
                  pathname === link.href &&
                    " border-black border-x border-t border-b-2"
                )}
                onClick={() => navigate(link.href)}
              >
                <Icon icon={link.icon} />
                <Text variant="p">{link.label}</Text>
              </div>
            ))}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};
