import { useEffect, useState } from "react";

export function useIsMobile(breakpoint: number = 768): boolean {
  const getMatches = (): boolean =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches;

  const [isMobile, setIsMobile] = useState<boolean>(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media: MediaQueryList = window.matchMedia(
      `(max-width: ${breakpoint}px)`
    );

    const listener = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [breakpoint]);

  return isMobile;
}
