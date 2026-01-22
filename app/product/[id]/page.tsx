"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiStar, HiOutlineShoppingBag, HiArrowLeft, HiCheckCircle, HiLockClosed } from "react-icons/hi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState } from "../../src/redux/store";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.cart.user);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.thumbnail);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first to add items to your cart!");
      router.push("/login");
      return;
    }
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) return <div className="text-center py-24 font-bold text-black italic animate-pulse">Loading Product Details...</div>;
  if (!product) return <div className="text-center py-24 text-black font-bold">Product not found!</div>;

  return (
    <main className="main-container py-12 max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all mb-8 font-bold group">
        <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Images Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-600 p-8 flex items-center justify-center shadow-inner">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-full object-contain hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-24 flex-shrink-0 rounded-[1.5rem] border-2 transition-all p-2 bg-white shadow-sm ${
                  activeImage === img ? "border-blue-600 scale-105 shadow-md" : "border-transparent hover:border-gray-200"
                }`}
              >
                <img src={img} className="w-full h-full object-contain" alt="gallery" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-600 font-black uppercase tracking-widest text-xs bg-blue-50 px-4 py-1.5 rounded-full">
              {product.brand}
            </span>
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">{product.title}</h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center text-yellow-500 gap-1.5 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100">
              <HiStar size={22} />
              <span className="font-black text-lg leading-none">{product.rating}</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <span className="text-green-600 font-bold flex items-center gap-1.5 text-lg">
              <HiCheckCircle size={24} /> {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-xl font-medium">{product.description}</p>

          <div className="bg-white p-10 rounded-[3rem] border-2 border-gray-100 shadow-gray-100/50">
            <div className="flex items-end gap-3 mb-10">
              <span className="text-2xl md:text-5xl font-black text-gray-900 leading-none">${product.price}</span>
              <span className="text-gray-300 line-through mb-1 text-xl font-bold">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] shadow-lg shadow-blue-100 ${
                user ? "bg-blue-600 text-white hover:bg-black" : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {user ? (
                <>
                  <HiOutlineShoppingBag size={28} />
                  Add to Cart
                </>
              ) : (
                <>
                  <HiLockClosed size={28} />
                  Login to Buy
                </>
              )}
            </button>

            {!user && (
              <p className="text-center text-sm text-gray-400 mt-4 font-bold">🔒 You must be logged in to complete your purchase</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
