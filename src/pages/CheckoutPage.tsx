import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCartStore,
  getCartSubtotal,
  getCartTotalItemCount,
} from "../store/cartStore";
import { OrderProcessingModal } from "../components/OrderProcessingModal";
import {
  isValidCardNumber,
  isValidCvv,
  isValidExpiry,
  formatCardNumber,
  formatExpiry,
} from "../lib/validation";

/**
 * Checkout: delivery + payment form (UI only). Place Order opens processing modal.
 */
export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(getCartSubtotal);
  const totalCount = useCartStore(getCartTotalItemCount);

  const [showOrderModal, setShowOrderModal] = useState(false);

  // Delivery
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  // Payment (UI only)
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const fullNameValid = fullName.trim().length >= 2;
  const addressValid = address.trim().length >= 5;
  const phoneOrEmailValid = phoneOrEmail.trim().length >= 5;
  const nameOnCardValid = nameOnCard.trim().length >= 2;
  const cardNumberValid = isValidCardNumber(cardNumber);
  const cvvValid = isValidCvv(cvv);
  const expiryValid = isValidExpiry(expiry);

  const allValid =
    fullNameValid &&
    addressValid &&
    phoneOrEmailValid &&
    nameOnCardValid &&
    cardNumberValid &&
    cvvValid &&
    expiryValid;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setShowOrderModal(true);
  };

  if (totalCount === 0 && !showOrderModal) {
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
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        <div className="flex-1 space-y-8">
          <section>
            <h2 className="text-xl font-medium text-primaryText mb-4">
              Delivery details
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="font-medium text-primaryText block mb-1">
                  Full name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                  required
                />
                {fullName && !fullNameValid && (
                  <p className="text-red-600 text-sm mt-1">
                    At least 2 characters
                  </p>
                )}
              </label>
              <label className="block">
                <span className="font-medium text-primaryText block mb-1">
                  Delivery address <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, city, postcode"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                  required
                />
                {address && !addressValid && (
                  <p className="text-red-600 text-sm mt-1">
                    At least 5 characters
                  </p>
                )}
              </label>
              <label className="block">
                <span className="font-medium text-primaryText block mb-1">
                  Phone or email <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="+1 234 567 8900 or email@example.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                  required
                />
                {phoneOrEmail && !phoneOrEmailValid && (
                  <p className="text-red-600 text-sm mt-1">
                    At least 5 characters
                  </p>
                )}
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primaryText mb-4">
              Payment 
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="font-medium text-primaryText block mb-1">
                  Name on card <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                  required
                />
                {nameOnCard && !nameOnCardValid && (
                  <p className="text-red-600 text-sm mt-1">
                    At least 2 characters
                  </p>
                )}
              </label>
              <label className="block">
                <span className="font-medium text-primaryText block mb-1">
                  Card number (16 digits){" "}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                  required
                />
                {cardNumber && !cardNumberValid && (
                  <p className="text-red-600 text-sm mt-1">Exactly 16 digits</p>
                )}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-medium text-primaryText block mb-1">
                    Expiry (MM/YY) <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                    required
                  />
                  {expiry && !expiryValid && (
                    <p className="text-red-600 text-sm mt-1">Valid MM/YY</p>
                  )}
                </label>
                <label className="block">
                  <span className="font-medium text-primaryText block mb-1">
                    CVV (3 digits) <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="123"
                    maxLength={3}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-primaryText"
                    required
                  />
                  {cvv && !cvvValid && (
                    <p className="text-red-600 text-sm mt-1">3 digits</p>
                  )}
                </label>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24 p-6 rounded-xl border border-orange-900/10 bg-orange-50/30">
            <h2 className="font-semibold text-lg text-primaryText mb-4">
              Order summary
            </h2>
            <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex justify-between text-sm text-primaryText"
                >
                  <span className="line-clamp-1 flex-1 mr-2">
                    {item.product.title} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-orange-900/10 pt-4 flex justify-between font-semibold text-primaryText">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={!allValid}
              className="mt-6 w-full font-medium text-white bg-primary hover:bg-primaryHover rounded-md px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              Place Order
            </button>
            <Link
              to="/cart"
              className="mt-3 w-full text-center font-medium text-primary block text-sm"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </form>

      <OrderProcessingModal
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </div>
  );
}
