import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

interface OrderProcessingModalProps {
  show: boolean;
  onClose: () => void;
}

const COUNTDOWN_SECONDS = 5;

/**
 * Order processing overlay: spinner, message, 5s countdown, then clear cart, redirect, toast.
 */
export function OrderProcessingModal({
  show,
  onClose,
}: OrderProcessingModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const completedRef = useRef(false);
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clearCart);
  const showToast = useToastStore((s) => s.show);

  // Reset completion flag when modal opens
  useEffect(() => {
    if (show) completedRef.current = false;
  }, [show]);

  // Countdown timer
  useEffect(() => {
    if (!show) return;
    setSecondsLeft(COUNTDOWN_SECONDS);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  // When countdown reaches 0: clear cart, close, redirect, toast (once)
  useEffect(() => {
    if (!show || secondsLeft > 0 || completedRef.current) return;
    completedRef.current = true;
    clearCart();
    onClose();
    navigate("/", { replace: true });
    showToast("Order placed successfully");
  }, [show, secondsLeft, clearCart, onClose, navigate, showToast]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-processing-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <h2
          id="order-processing-title"
          className="text-xl font-semibold text-primaryText text-center"
        >
          Processing your order
        </h2>
        <p className="text-center text-gray-600 text-sm">
          A verification code will be sent to your email or phone before your
          card is charged.
        </p>
        <p className="text-primary font-medium">
          {secondsLeft > 0 ? `Redirecting in ${secondsLeft}s...` : "Done"}
        </p>
      </div>
    </div>
  );
}
