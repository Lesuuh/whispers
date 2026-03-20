"use client";

import HeroSection from "../_components/home/HeroSection";

import { ModalContainer } from "../_components/modals/ModalContainer";
import PostForm from "../_components/modals/PostForm";
import Trending from "../_components/home/Trending";

export default function Home({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <main className="min-h-screen">
      {/* 01. Impactful Entry */}
      <HeroSection setIsOpen={setIsOpen} />

      <div className="mx-auto max-w-[1400px] px-6">
        {/* <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div> */}

        <div className="pb-24">
          <Trending />
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
