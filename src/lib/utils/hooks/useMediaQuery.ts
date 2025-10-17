import { useEffect, useState, useRef } from "react";

import isClient from "../isClient";

function useMediaQuery(query: any, defaultState = true) {
  const mediaQuery = useRef<any>(null);
  const [matches, setMatches] = useState(defaultState);

  useEffect(() => {
    function onChange() {
      setMatches(
        mediaQuery.current ? mediaQuery.current.matches : defaultState
      );
    }

    if (isClient) {
      mediaQuery.current = window.matchMedia(query);

      if (mediaQuery.current.addListener) {
        mediaQuery.current.addListener(onChange);
      } else if (mediaQuery.current.addEventListener) {
        mediaQuery.current.addEventListener("change", onChange);
      }

      setMatches(mediaQuery.current.matches);
    }

    return () => {
      if (mediaQuery.current) {
        if (mediaQuery.current.removeListener) {
          mediaQuery.current.removeListener(onChange);
        } else if (mediaQuery.current.removeEventListener) {
          mediaQuery.current.removeEventListener("change", onChange);
        }
      }
    };
  }, [query, defaultState]);

  return matches;
}

export { useMediaQuery };
