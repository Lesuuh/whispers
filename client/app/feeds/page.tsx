"use client";

import { useState } from "react";
import FeedsSection from "../_components/home/FeedsSection";
import { Categories } from "../_components/home/Categories";

export default function FeedsPage() {
  const [selectedCategory, setSelectedCategory] = useState(" ");

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      {/* 01. The Header - "The Index" */}
      <section className="w-full pt-32 pb-16">
        <div className="mx-auto max-w-[1400px] px-6">
          {/* Breadcrumb - Clean & Light */}
          <div className="mb-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-400">
            <span className="hover:text-black transition-colors cursor-pointer">
              Archive
            </span>
            <span className="opacity-30">/</span>
            <span className="text-purple-600 font-bold">
              {selectedCategory === " " ? "All Signals" : selectedCategory}
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-serif text-6xl md:text-8xl font-light leading-[1.1] text-gray-900 tracking-tight">
              Public <span className="italic">Echoes</span>
            </h1>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 leading-relaxed">
              Real-time interception of anonymous thoughts.
            </p>
          </div>

          {/* Categories - No mt-16, just natural flow */}
          <div className="mt-20">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* 02. The Main Feed */}
      <section className="w-full pb-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <FeedsSection selectedCategory={selectedCategory} />
        </div>
      </section>

      {/* 03. Global Footer Marker - Sleek & Floating */}
      <footer className="py-20 text-center">
        <div className="h-px w-12 bg-gray-200 mx-auto mb-8" />
        <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-gray-300">
          End of Line • No further records
        </p>
      </footer>
    </main>
  );
}
