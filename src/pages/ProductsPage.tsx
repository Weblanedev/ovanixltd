import { useEffect } from "react";
import { useProductsStore } from "../store/productsStore";
import { ProductCard } from "../components/ProductCard";

/**
 * Product listing: fetches books from API, displays responsive grid.
 */
export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div id="products" className="w-full min-h-screen flex flex-col">
      <section className="flex relative overflow-hidden bg-primary/30 flex-col-reverse md:flex-row min-h-[50vh] px-6 md:px-[80px] lg:px-[130px] items-center justify-center md:justify-between gap-6 py-12 border-b border-orange-900/10">
        <div className="text-black flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
          <h1 className="font-medium md:font-semibold text-3xl sm:text-4xl md:text-5xl leading-snug text-primaryText">
            Find the right E-Book for You
          </h1>
          <p className="text-primaryText max-w-md">
            Remote Access and Support Solutions for Individuals, Teams, and
            Businesses
          </p>
          <a
            href="#products-grid"
            className="text-base font-medium text-white bg-primary hover:bg-primaryHover rounded-md px-7 py-4 inline-flex items-center justify-center gap-2"
          >
            Explore Products
          </a>
        </div>
        <img
          src="https://149502452.v2.pressablecdn.com/wp-content/uploads/2021/05/the-best-startup-books.jpg"
          alt="Books"
          className="w-full max-w-md h-64 md:h-72 object-cover rounded-xl shadow-lg"
        />
      </section>

      <section
        id="products-grid"
        className="flex bg-white w-full flex-col px-6 md:px-[80px] lg:px-[130px] py-10 md:py-14"
      >
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-center">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600 py-12">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
