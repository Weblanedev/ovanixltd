import { useEffect } from "react";
import { useToastStore } from "../store/toastStore";

/**
 * Global success/notification toast. Auto-hides after 4 seconds.
 */
export function Toast() {
  const { message, visible, hide } = useToastStore();

  useEffect(() => {
    if (!visible || !message) return;
    const t = setTimeout(hide, 4000);
    return () => clearTimeout(t);
  }, [visible, message, hide]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-primary text-white rounded-lg shadow-lg font-medium transition-all duration-300"
    >
      {message}
    </div>
  );
}
