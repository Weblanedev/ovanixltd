import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

/**
 * Reusable product card: image, title, price, Add to Cart, link to detail.
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-xl bg-orange-50/50 text-orange-900 overflow-hidden border border-orange-900/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-[128/192] w-full overflow-hidden bg-orange-100/50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-medium text-base leading-tight line-clamp-2">
          {product.title}
        </h3>
        <p className="text-primary font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded-md px-4 py-2.5 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
