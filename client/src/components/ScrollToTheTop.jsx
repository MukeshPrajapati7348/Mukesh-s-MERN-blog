import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTheTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTheTop;
