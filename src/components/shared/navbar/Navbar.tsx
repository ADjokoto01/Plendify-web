import { Separator } from "@/components/ui/separator";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils";
import PlendifyLogo from "@/assets/images/plendify-logo.png";
import { SearchBox } from "@/components/searchBox";

import { Icon } from "@/lib";
// import { Avatar } from '@/components/avatar';
import { Text } from "../text";
import {
  usePaginationFilter,
  useGetWishlist,
  useGetCartItems,
  useGetLocationFromIP,
  useGetVisitorsIP,
} from "@/features/website";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Avatar } from "@/components/avatar";
import { useAuthStore } from "@/stores";
import { Hamburger } from "@/assets/svgs/svgs";
import { useFetchUserById } from "@/features/user";
export const Navbar = () => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const { q, setQ } = usePaginationFilter();
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );

  const { data: wishlist, isLoading } = useGetWishlist();
  const { data: cart, isLoading: cartLoading } = useGetCartItems(
    locationData?.data?.currency || ""
  );
  const { data: user } = useFetchUserById();

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.ROOT);
  };

  return (
    <section>
      <div className=" flex gap-1 py-2 border-b border-b-grey-100/50">
        <div className="wrapper flex items-center gap-2 ">
          <div className="pr-[14px] flex items-center gap-2 border-r border-r-grey-100/50">
            <Link
              to={ROUTES.HOME}
              className={cn(
                "hover:underline",
                currentPath === ROUTES.HOME ? "font-medium" : "text-grey-200"
              )}
            >
              For Shoppers
            </Link>
          </div>
          <Separator
            orientation="vertical"
            className="h-full w-[2px] bg-grey-100"
          />
          <Link
            to={ROUTES.SELLERS.HOME}
            className={cn(
              "hover:underline",
              currentPath === ROUTES.SELLERS.HOME
                ? "font-medium"
                : "text-grey-200"
            )}
          >
            For Sellers
          </Link>
        </div>
      </div>
      <div className="wrapper flex items-center justify-between py-3">
        <section className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="rounded-[20px] h-10 w-[52px] bg-brand-primary flex items-center justify-center text-white lg:hidden">
                <Hamburger />
              </SheetTrigger>
              <SheetContent className="bg-white px-6 py-12" side="left">
                <button
                  onClick={() => navigate(ROUTES.SEARCH)}
                  className="flex justify-between group items-center gap-4 pb-4 border-b border-b-grey-100"
                >
                  <Link
                    to={ROUTES.SEARCH}
                    className={cn(
                      "group-hover:underline",
                      currentPath === ROUTES.SEARCH
                        ? "font-medium"
                        : "text-grey-200"
                    )}
                  >
                    Categories
                  </Link>
                  <Icon
                    icon="mdi:chevron-right"
                    className="h-6 w-6 group-hover:translate-x-1 transition-all duration-300"
                  />
                </button>

                <button
                  onClick={() => navigate(ROUTES.IMPACT)}
                  className="flex justify-between group items-center gap-4 pb-4 border-b border-b-grey-100"
                >
                  <Link
                    to={ROUTES.IMPACT}
                    className={cn(
                      "hover:underline",
                      currentPath === ROUTES.IMPACT
                        ? "font-medium"
                        : "text-grey-200"
                    )}
                  >
                    Impact
                  </Link>
                  <Icon
                    icon="mdi:chevron-right"
                    className="h-6 w-6 group-hover:translate-x-1 transition-all duration-300"
                  />
                </button>
              </SheetContent>
            </Sheet>

            <button
              className="cursor-pointer hidden md:block"
              onClick={() => navigate(ROUTES.HOME)}
            >
              <img src={PlendifyLogo} alt="Plendify Logo" />
            </button>
            <button
              className="cursor-pointer block md:hidden w-10 h-10 rounded-full"
              onClick={() => navigate(ROUTES.HOME)}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk09LUX3HqdCmqautJgLjxyvLcVwpKFtiuPQ&s"
                alt="Plendify Logo rounded-full"
                className="w-full h-full rounded-full"
              />
            </button>
          </div>

          <Link
            to={ROUTES.SEARCH}
            className={cn(
              "hover:underline hidden lg:block",
              currentPath === ROUTES.SEARCH ? "font-medium" : "text-grey-200"
            )}
          >
            Categories
          </Link>
          <Link
            to={ROUTES.IMPACT}
            className={cn(
              "hover:underline hidden lg:block",
              currentPath === ROUTES.IMPACT ? "font-medium" : "text-grey-200"
            )}
          >
            Impact
          </Link>
        </section>
        <SearchBox
          placeholder="Search for products"
          className="max-w-[300px] lg:max-w-[524px] w-full hidden md:block"
          value={q || ""}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              navigate(`${ROUTES.SEARCH}?q=${q}`);
            }
          }}
        />
        <div className="flex gap-2">
          <div
            onClick={() => navigate(ROUTES.WISHLIST)}
            className="flex items-center justify-center h-10 w-10 relative cursor-pointer"
          >
            <Icon icon="mdi:favorite-outline" className="h-6 w-6" />
            {!isLoading && wishlist?.items.length > 0 && (
              <div className="absolute -top-[15%] left-[50%] bg-brand-primary/90 text-white rounded-full w-[22px] h-[22px] flex items-center justify-center text-xs">
                {wishlist?.items.length}
              </div>
            )}
          </div>
          <div
            onClick={() => navigate(ROUTES.CART)}
            className="flex items-center justify-center h-10 w-10 relative cursor-pointer"
          >
            <Icon icon="mdi:marketplace-outline" className="h-6 w-6" />
            {!cartLoading && cart?.items.length > 0 && (
              <div className="absolute -top-[15%] left-[50%] bg-brand-primary/90 text-white rounded-full w-[22px] h-[22px] flex items-center justify-center text-xs">
                {cart?.items.length}
              </div>
            )}
          </div>

          <Popover>
            <PopoverTrigger>
              <div className="flex items-center justify-center h-10 w-10 relative cursor-pointer bg-black text-white rounded-full">
                <Icon icon="mdi:account" className="h-6 w-6" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white flex flex-col gap-6 p-6 w-[300px]">
              {user && (
                <div className="flex items-center gap-2">
                  <Avatar className="!w-10 !h-10 rounded-full" />
                  <div>
                    <Text variant="span" weight="medium">
                      {user?.name}
                    </Text>

                    <Text
                      variant="p"
                      className="hover:underline cursor-pointer"
                      onClick={() => navigate(ROUTES.USER.PERSONAL_DETAILS)}
                    >
                      View your profile
                    </Text>
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "border-t border-t-grey-100 pt-4 pb-4 flex flex-col gap-5",
                  !user && "border-none"
                )}
              >
                {!user && (
                  <div
                    onClick={() => navigate(ROUTES.AUTH.ROOT)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon icon="mdi:login" className="h-6 w-6" />
                    <Text variant="p">Login</Text>
                  </div>
                )}
                {user?.role === "seller" && (
                  <div
                    onClick={() => navigate(ROUTES.USER.SHOP)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon icon="mdi:store" className="h-6 w-6" />
                    <Text variant="p">My Shop</Text>
                  </div>
                )}
                {user && (
                  <>
                    <div
                      onClick={() => navigate(ROUTES.USER.ORDERS)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon icon="mdi:message-draw" className="h-6 w-6" />
                      <Text variant="p">Purchases & Reviews</Text>
                    </div>

                    {user?.role !== "seller" && (
                      <div
                        onClick={() => navigate(ROUTES.SELLERS.REGISTER)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Icon icon="mdi:shopping" className="h-6 w-6" />
                        <Text variant="p">Become a Seller</Text>
                      </div>
                    )}

                    {user?.role !== "user" && (
                      <div
                        onClick={() => navigate(ROUTES.USER.PERSONAL_DETAILS)}
                        className="flex items-center gap-2"
                      >
                        <Icon icon="mdi:settings" className="h-6 w-6" />
                        <Text variant="p">Settings</Text>
                      </div>
                    )}
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon icon="mdi:logout" className="h-6 w-6" />
                      <Text variant="p">Logout</Text>
                    </div>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="wrapper md:hidden flex items-center justify-center py-3 border-t border-t-grey-100/50">
        <SearchBox
          placeholder="Search for products"
          className="max-w-[300px] lg:max-w-[524px] w-full"
          value={q || ""}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              navigate(`${ROUTES.SEARCH}?q=${q}`);
            }
          }}
        />
      </div>
      <div className="bg-brand-primary text-white py-2 text-center">
        <Text as="p">
          Use promo code <span className="font-bold">MARCHFUN</span> to get 10%
          off
        </Text>
      </div>
    </section>
  );
};
