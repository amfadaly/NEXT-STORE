"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, logout } from "../src/redux/store";
import { HiOutlineLogout } from "react-icons/hi";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.cart.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="main-container px-4">
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-left">
            <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-200 border-4 border-white">
              {initials}
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-400 font-medium text-lg">{user.email}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 uppercase">
                  Verified Account
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center cursor-pointer gap-4 p-4 hover:bg-blue-500 bg-red-50 text-red-600 rounded-2xl font-black ransition-all group"
          >
            <div className="w-10 h-10 bg-white  rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
              <HiOutlineLogout size={22} className="text-red-600 " />
            </div>
            <span className="text-lg">Sign Out</span>
          </button>
        </div>

        <p className="text-center mt-12 text-gray-300 text-sm font-medium">Member since January 2026</p>
      </div>
    </div>
  );
}
