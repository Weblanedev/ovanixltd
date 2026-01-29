import { Link } from "react-router-dom";
import { useCartStore, getCartTotalItemCount } from "../store/cartStore";

/**
 * Navbar cart link with item count badge.
 */
export function CartIcon() {
  const totalCount = useCartStore((state) => getCartTotalItemCount(state));

  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center justify-center p-2 text-primaryText hover:text-primary transition-colors"
      aria-label={`Cart, ${totalCount} items`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-white text-xs font-medium px-1">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </Link>
  );
}
