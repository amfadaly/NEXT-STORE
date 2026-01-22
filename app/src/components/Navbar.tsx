"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineSearch, HiMenuAlt3, HiX, HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search Modal state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length > 1) {
        try {
          const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
          const data = await res.json();
          setSearchResults(data.products || []);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-16 flex items-center">
      <div className="main-container">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
              NEXT<span className="text-blue-600">STORE</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm">
              Categories
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-2 md:space-x-4">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition">
              <HiOutlineSearch size={22} />
            </button>

            <Link href="/profile" className="hidden sm:block p-2 text-gray-600 hover:bg-gray-50 rounded-full transition">
              <HiOutlineUser size={22} />
            </Link>

            <Link href="/cart" className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition">
              <HiOutlineShoppingBag size={22} />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* <ThemeToggle /> */}

            <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-gray-900">
              <HiMenuAlt3 size={26} />
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setIsSearchOpen(false)} />

          <div className="relative h-[400px] w-full max-w-md mt-10 mb-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="p-3 border-b flex items-center gap-2">
              <HiOutlineSearch className="text-gray-400 ml-2" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent outline-none text-sm py-2 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearchOpen(false)} className="p-1 text-black hover:text-gray-500 transition cursor-pointer">
                <HiX size={18} />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider italic">Results Found</p>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-2 hover:bg-blue-50/50 rounded-xl transition group mt-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={product.thumbnail} className="w-full h-full object-cover" alt={product.title} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-800 line-clamp-1">{product.title}</span>
                          <span className="text-xs text-blue-600 font-bold">${product.price}</span>
                        </div>
                      </div>
                      <HiArrowRight
                        size={14}
                        className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mr-2"
                      />
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <div className="p-10 text-center">
                  <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-xs text-gray-400">Start typing to search products...</p>
                </div>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="bg-gray-50 p-2 text-center border-t">
                <Link
                  href="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase"
                >
                  View All Shop
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 p-8 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-xl font-extrabold text-black uppercase tracking-widest">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full text-black hover:text-blue-600 transition">
              <HiX size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-lg font-bold">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-900 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="text-gray-900 hover:text-blue-600 transition">
              Shop
            </Link>
            <Link href="/categories" onClick={() => setIsOpen(false)} className="text-gray-900 hover:text-blue-600 transition">
              Categories
            </Link>
            <hr className="border-gray-100" />
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 flex items-center gap-3 font-medium hover:text-blue-600 transition"
            >
              <HiOutlineUser size={22} /> Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
