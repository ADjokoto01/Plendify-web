import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return <>{children}</>;
}
