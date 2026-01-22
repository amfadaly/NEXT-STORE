"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineTrash, HiMinus, HiPlus, HiArrowLeft } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removeFromCart, updateQuantity } from "../src/redux/store";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export default function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items as CartItem[]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (!mounted) {
    return (
      <div className="main-container py-24 text-center">
        <div className="animate-pulse text-xl font-bold text-gray-400">Loading your cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="main-container py-24 text-center">
        <div className="mb-6 flex justify-center text-6xl">🛒</div>
        <h2 className="text-3xl font-black text-black mb-4">Your cart is empty!</h2>
        <p className="text-gray-500 mb-10">Looks like you haven't added any products yet.</p>
        <Link
          href="/shop"
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="main-container py-12">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/shop" className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-100">
          <HiArrowLeft size={20} />
        </Link>
        <h1 className="text-4xl font-black text-black">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 md:p-6 bg-white border border-gray-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-28 h-28 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden p-2">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-lg text-black line-clamp-1">{item.title}</h3>
                <p className="font-black text-blue-600 mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center text-black border-2 gap-5 px-5 py-2 rounded-2xl border-gray-100 bg-gray-50">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, type: "dec" }))}
                  className="p-1 hover:bg-black rounded-lg hover:text-white transition cursor-pointer border border-transparent hover:border-black"
                >
                  <HiMinus />
                </button>
                <span className="font-black text-lg min-w-[20px] text-center">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, type: "inc" }))}
                  className="p-1 hover:bg-black rounded-lg hover:text-white transition cursor-pointer border border-transparent hover:border-black"
                >
                  <HiPlus />
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition group"
              >
                <HiOutlineTrash size={26} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] h-fit shadow-2xl shadow-gray-100/60 sticky top-24">
          <h2 className="text-2xl font-black text-black mb-8">Summary</h2>

          <div className="space-y-5 border-b border-gray-100 pb-8 mb-8">
            <div className="flex justify-between text-gray-500 font-bold">
              <span>Subtotal</span>
              <span className="text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 font-bold">
              <span>Shipping</span>
              <span className="text-green-600 font-black italic">FREE</span>
            </div>
          </div>

          <div className="flex justify-between text-3xl font-black mb-10">
            <span className="text-black">Total</span>
            <span className="text-blue-600">${subtotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full block text-center bg-gray-900 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-gray-300 hover:bg-blue-600 transition-all active:scale-95"
          >
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  );
}
