"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingBag, HiOutlineHeart, HiStar, HiLockClosed } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState } from "../redux/store";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  discountPercentage?: number;
}

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // جلب المستخدم من السلايس الموحد (cart)
  const user = useSelector((state: RootState) => state.cart.user);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        const data = await res.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Please login first to add items to your cart.");
      router.push("/login");
      return;
    }

    dispatch(addToCart(product));
  };

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl text-black font-bold">New Arrivals</h2>
          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
        </div>
        <Link
          href="/shop"
          className="text-sm font-bold text-blue-600 hover:underline bg-white px-5 py-2 rounded-2xl border border-blue-50 transition-all hover:bg-blue-50"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl border border-gray-100 p-3 hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-gray-400 hover:text-red-500 transition-all shadow-sm">
                  <HiOutlineHeart size={18} />
                </button>
              </div>
            </Link>

            <div className="mt-4 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center text-yellow-500 gap-0.5">
                  <HiStar size={14} />
                  <span className="text-gray-400 text-xs font-medium">({product.rating})</span>
                </div>
              </div>

              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors cursor-pointer">
                  {product.title}
                </h3>
              </Link>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-lg font-black text-gray-900">${product.price}</span>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all active:scale-90 shadow-lg ${
                    user ? "bg-gray-900 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  title={!user ? "Login to add to cart" : "Add to Cart"}
                >
                  {user ? <HiOutlineShoppingBag size={20} /> : <HiLockClosed size={20} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
