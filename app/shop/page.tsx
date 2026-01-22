"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingBag, HiOutlineHeart, HiStar, HiSearch, HiFilter, HiSortAscending, HiLockClosed } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState } from "../src/redux/store";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
}

export default function ShopPage() {
  // --- State Management ---
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.cart.user);

  // --- Fetch Data ---
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- Filter & Sort Logic ---
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy, products]);

  // --- Handlers ---
  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Sorry, you must login first to add products to your cart!");
      router.push("/login");
      return;
    }
    dispatch(addToCart(product));
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="font-bold text-gray-600">Loading Our Store...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50/30 py-12">
      <div className="main-container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Our Store</h1>
            <p className="text-gray-500 text-sm font-medium">Showing {filteredProducts.length} products</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 text-black focus:ring-blue-50/50 outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-black py-3 px-10 rounded-2xl focus:outline-none focus:border-blue-500 cursor-pointer font-bold text-sm h-full shadow-sm"
              >
                <option value="default">Default Sorting</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <HiSortAscending className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl mr-2 shrink-0 shadow-lg">
            <HiFilter size={18} />
            <span className="font-bold text-sm">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[2.5rem] border border-gray-100 p-4 hover:shadow-2xl transition-all duration-500 flex flex-col relative"
            >
              {/* Product Image Box */}
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square rounded-[2rem] bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 p-4"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-400 hover:text-red-500 transition-all shadow-sm">
                    <HiOutlineHeart size={20} />
                  </button>
                </div>
              </Link>

              {/* Product Details */}
              <div className="mt-5 flex-grow px-2 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center text-yellow-500 gap-0.5">
                    <HiStar size={16} />
                    <span className="text-gray-400 text-xs font-bold">{product.rating}</span>
                  </div>
                </div>

                <Link href={`/product/${product.id}`}>
                  <h3 className="text-md font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-4 min-h-[2.5rem]">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-2xl font-black text-gray-900">${product.price}</span>

                  {/* Action Button (Add to Cart / Lock) */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all active:scale-90 shadow-xl ${
                      user
                        ? "bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                    title={!user ? "Login Required" : "Add to Cart"}
                  >
                    {user ? <HiOutlineShoppingBag size={24} /> : <HiLockClosed size={24} className="opacity-70" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-2xl text-gray-800 font-black mb-2">No results found</p>
            <p className="text-gray-400 mb-6">Try changing your filters or search keywords.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-black transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
