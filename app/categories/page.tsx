import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="main-container py-12">
      <h1 className="text-4xl font-black text-black mb-10">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className="group p-8 bg-white border border-gray-100 rounded-2xl text-black hover:bg-blue-600 transition-all shadow-sm"
          >
            <h3 className="text-xl font-bold group-hover:text-white transition-colors">{cat.name}</h3>
            <div className="mt-4 flex items-center text-blue-600 group-hover:text-white font-bold text-sm">
              Explore Products <HiOutlineArrowRight className="ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
