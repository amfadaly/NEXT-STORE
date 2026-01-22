import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72  rounded-full blur-3xl opacity-50"></div>

      <div className="py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase  rounded-full">
              New Collection 2026
            </span>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight text-black mb-4">
              Style Meets <br />
              <span className="text-blue-600">Innovation.</span>
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
              Discover the latest trends in premium tech and lifestyle gear. Elevate your everyday experience with our curated collections.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link
                href="/shop"
                className="flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all shadow-md group text-sm"
              >
                Shop Now
                <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="flex items-center justify-center px-6 py-3 text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-bold transition-all text-sm"
              >
                View Categories
              </Link>
            </div>
          </div>

          <div className="relative group order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] aspect-square rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 overflow-hidden border border-white shadow-xl flex items-center justify-center relative">
              <span className="text-[8rem] filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500">🛍️</span>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3">
                <div className="bg-green-500 p-1.5 rounded-full text-white">
                  <HiOutlineArrowRight className="-rotate-45" size={14} />
                </div>
                <p className="text-[10px] font-bold text-gray-900 leading-tight">
                  Flash Sale <br /> <span className="text-green-600">40% OFF</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
