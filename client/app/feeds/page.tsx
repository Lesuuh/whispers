"use client";

import { useState } from "react";
import FeedsSection from "../_components/home/FeedsSection";
import { Categories } from "../_components/home/Categories";

export default function FeedsPage() {
  const [selectedCategory, setSelectedCategory] = useState(" ");

  return (
    <main className="w-full  min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full modal bg-gradient-to-b from-gray-50 to-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              Explore Feeds
            </h1>
            <p className="text-lg text-gray-600">
              Discover anonymous thoughts and stories from our community
            </p>
          </div>

          {/* Category Filter */}
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Feeds Content Section */}
      <section className="w-full py-12">
        <div className=" mx-auto sm:px-6 lg:px-8">
          <FeedsSection selectedCategory={selectedCategory} />
        </div>
      </section>
    </main>
  );
}
