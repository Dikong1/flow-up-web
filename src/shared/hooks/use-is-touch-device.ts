import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
   const [isTouchDevice, setIsTouchDevice] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(pointer: coarse)");

      const update = () => {
         setIsTouchDevice(
            mediaQuery.matches || navigator.maxTouchPoints > 0
         );
      };

      update();
      mediaQuery.addEventListener("change", update);

      return () => mediaQuery.removeEventListener("change", update);
   }, []);

   return isTouchDevice;
};