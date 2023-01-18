import { useEffect, useState } from "react";

const useIsIntersecting = (ref: any) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.999, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return isIntersecting;
};

export default useIsIntersecting;
