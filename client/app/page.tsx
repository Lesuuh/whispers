"use client";

import { useState } from "react";
import Navbar from "./_components/home/Navbar"; // Import Navbar here instead of Layout
import { Categories } from "./_components/home/Categories";
import FeedsSection from "./_components/home/FeedsSection";
import HeroSection from "./_components/home/HeroSection";
import { ModalContainer } from "./_components/modals/ModalContainer";
import PostForm from "./_components/modals/PostForm";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(" ");

  return (
    <main className="min-h-screen">
      {/* 00. Navbar now receives the toggle state */}
      <Navbar setIsOpen={setIsOpen} />

      {/* 01. Impactful Entry */}
      <HeroSection setIsOpen={setIsOpen} />

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="pb-24">
          <FeedsSection selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* 04. Global Interaction (Post Modal) */}
      <ModalContainer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PostForm setIsOpen={setIsOpen} />
      </ModalContainer>

      {/* Mobile FAB - Restored and sleek */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-xl md:hidden"
      >
        <span className="text-3xl font-light">+</span>
      </button>
    </main>
  );
}
