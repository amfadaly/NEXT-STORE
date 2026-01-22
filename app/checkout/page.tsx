"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { HiLockClosed, HiCreditCard } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert("🎉 Order Placed Successfully! Thank you for shopping.");
      router.push("/");
    }, 2000);
  };

  if (!mounted) return null;

  if (cartItems.length === 0) {
    return (
      <div className="main-container py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Your cart is empty!</h2>
        <Link href="/shop" className="text-blue-600 font-bold underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="main-container py-12">
      <h1 className="text-4xl font-black text-black mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                required
                type="text"
                placeholder="Phone Number"
                className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black md:col-span-2"
              />
              <input
                required
                type="text"
                placeholder="Street Address"
                className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black md:col-span-2"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border-2 border-blue-600 bg-blue-50 rounded-2xl cursor-pointer">
                <HiCreditCard className="text-blue-600" size={24} />
                <span className="font-bold text-blue-900">Credit / Debit Card</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-blue-200 hover:bg-black transition-all active:scale-95 disabled:bg-gray-400"
          >
            {isProcessing ? "Processing..." : "Confirm & Pay Now"}
          </button>
        </form>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-black">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 flex-shrink-0">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-black line-clamp-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm text-black">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-50 pt-6 space-y-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-black font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-black pt-3">
                <span>Total</span>
                <span className="text-blue-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs justify-center">
              <HiLockClosed />
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
