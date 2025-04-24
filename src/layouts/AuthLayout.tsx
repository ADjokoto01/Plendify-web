import PlendifyLogo from "@/assets/images/plendify-logo.png";

import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/route-constants";
import { FEATURED_SUPPLIERS } from "@/data/Card";
import { motion } from "framer-motion";

export const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden">
      <nav className="border-b border-b-grey-100 h-[76px] flex items-center">
        <figure
          className="wrapper cursor-pointer"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <img src={PlendifyLogo} alt="Plendify Logo" />
        </figure>
      </nav>
      <div className="md:pl-[120px] h-screen justify-center flex flex-col  md:grid md:grid-cols-2 md:gap-10 md:justify-between">
        <div className="pt-[30%]">
          <Outlet />
        </div>
        <section className="hidden md:grid grid-cols-3 gap-6 relative h-[1000px] overflow-hidden">
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

          <div className="relative h-[1000px] overflow-hidden">
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
        </section>
      </div>
    </div>
  );
};
