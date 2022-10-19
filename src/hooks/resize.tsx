import { useState, useEffect } from "react";

export const useResize = () => {
  const [widthPixel, setWidthPixel] = useState<number>(window.innerWidth);
  const [heightPixel, setHeightPixel] = useState<number>(window.innerWidth);

  useEffect(() => {
    const resizeFunc = () => {
      setWidthPixel(() => window.innerWidth);
      setHeightPixel(() => window.innerHeight);
    };
    window.addEventListener("resize", resizeFunc);

    return () => window.removeEventListener("resize", resizeFunc);
  }, []);

  return { width: widthPixel, height: heightPixel };
};
