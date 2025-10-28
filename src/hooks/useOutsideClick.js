import { useEffect, useRef } from "react";


export function useOutsideClick(handlerFunc, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
//        console.log("Clicked outside modal");
        handlerFunc();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [handlerFunc, listenCapturing]);

  return ref;
}