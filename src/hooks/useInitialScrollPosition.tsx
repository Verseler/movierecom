import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useInitialScrollPosition = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return {};
};

export default useInitialScrollPosition;
