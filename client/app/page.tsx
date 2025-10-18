"use client";

import { useState } from "react";
import { Categories } from "./_components/home/Categories";
import FeedsSection from "./_components/home/FeedsSection";
import HeroSection from "./_components/home/HeroSection";
import { ModalContainer } from "./_components/modals/ModalContainer";
import PostForm from "./_components/modals/PostForm";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(" ");
  console.log(selectedCategory);
  return (
    <>
      <HeroSection setIsOpen={setIsOpen} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
        {/* Feeds Section */}
        <div className="md:col-span-3">
          <FeedsSection selectedCategory={selectedCategory} />
        </div>

        {/* Categories Section */}
        <div>
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* modal */}
      <ModalContainer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PostForm setIsOpen={setIsOpen} />
      </ModalContainer>
    </>
  );
}

// ? Todos
// ? 1. Add infinite scroll using react query
