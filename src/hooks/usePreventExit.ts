import { useEffect } from "react";

export function usePreventExit(shouldWarn: boolean) {
  useEffect(() => {
    if (!shouldWarn) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Chrome requires assignment to trigger dialog
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [shouldWarn]);
}
