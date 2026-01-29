import { Link } from "react-router-dom";
import {
  useCartStore,
  getCartTotalItemCount,
  getCartSubtotal,
} from "../store/cartStore";

/**
 * Cart page: list items, quantity controls, subtotal, link to checkout.
 */
export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalCount = useCartStore(getCartTotalItemCount);
  const subtotal = useCartStore(getCartSubtotal);

  if (totalCount === 0) {
    return (
      <div className="w-full min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link
          to="/products"
          className="text-primary font-medium hover:underline"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-6 md:px-[80px] lg:px-[130px]">
      <h1 className="text-2xl md:text-3xl font-semibold text-primaryText mb-8">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-orange-900/10 bg-orange-50/30"
            >
              <Link
                to={`/products/${item.product.id}`}
                className="flex-shrink-0 w-full sm:w-24 aspect-[128/192] rounded-lg overflow-hidden bg-orange-100"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <Link
                    to={`/products/${item.product.id}`}
                    className="font-medium text-primaryText hover:text-primary line-clamp-2"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-primary font-medium mt-1">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-primaryText"
                    >
                      −
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-primaryText"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-semibold text-primaryText sm:ml-4">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24 p-6 rounded-xl border border-orange-900/10 bg-white shadow-sm">
            <h2 className="font-semibold text-lg text-primaryText mb-4">
              Order summary
            </h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal ({totalCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between font-semibold text-primaryText">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full text-center font-medium text-white bg-primary hover:bg-primaryHover rounded-md px-6 py-3 block transition-colors"
            >
              Proceed to checkout
            </Link>
            <Link
              to="/products"
              className="mt-3 w-full text-center font-medium text-primary block"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
