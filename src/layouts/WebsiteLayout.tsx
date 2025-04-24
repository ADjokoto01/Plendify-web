import { Footer, Navbar, Wrapper } from "@/components";
import { Outlet } from "react-router-dom";
export const WebsiteLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="w-[80%] md:w-[80%] mx-auto py-20">
        <Outlet />
      </div>
      <Footer />
    </Wrapper>
  );
};
