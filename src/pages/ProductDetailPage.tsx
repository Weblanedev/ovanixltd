import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "../store/productsStore";
import { useCartStore } from "../store/cartStore";

/**
 * Single product detail: image, title, description, price, Add to Cart.
 */
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const getProductById = useProductsStore((s) => s.getProductById);
  const fetchProductById = useProductsStore((s) => s.fetchProductById);
  const addItem = useCartStore((s) => s.addItem);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const product = id ? getProductById(id) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!id) return;
    if (product) return;
    setLoadingDetail(true);
    fetchProductById(id).finally(() => setLoadingDetail(false));
  }, [id, product, fetchProductById]);

  if (!id) {
    return (
      <div className="pt-24 px-6 text-center">
        <p className="text-gray-600">Invalid product.</p>
        <Link
          to="/products"
          className="text-primary font-medium mt-2 inline-block"
        >
          Back to products
        </Link>
      </div>
    );
  }

  if (!product && loadingDetail) {
    return (
      <div className="pt-24 px-6 flex justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 px-6 text-center">
        <p className="text-gray-600">Product not found.</p>
        <Link
          to="/products"
          className="text-primary font-medium mt-2 inline-block"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-20 pb-16 px-6 md:px-[80px] lg:px-[130px]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-shrink-0 w-full md:w-72">
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-[128/192] object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-semibold text-2xl md:text-3xl text-primaryText leading-tight">
            {product.title}
          </h1>
          {product.authors?.length ? (
            <p className="text-gray-600 text-sm">
              By {product.authors.join(", ")}
            </p>
          ) : null}
          <p className="text-primary font-semibold text-xl">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description || "No description available."}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className="text-base font-medium text-white bg-primary hover:bg-primaryHover rounded-md px-6 py-3 transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to="/products"
              className="text-base font-medium text-primary border border-primary rounded-md px-6 py-3 hover:bg-primary/5 transition-colors inline-flex items-center"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
