"use client";
import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";

const Navbar = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper to close menu and trigger action
  const handleMobileAction = (action?: () => void) => {
    setMenuOpen(false);
    if (action) action();
  };

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link href="/" className="group">
            <h3 className="font-serif text-2xl italic tracking-tighter text-black">
              Whispers
            </h3>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/feeds"
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              Read Stories
            </Link>
            <Link
              href="/about"
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              How it works
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              Write Secret
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-white transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Header */}
        <div className="flex justify-between items-center px-6 py-5">
          <span className="font-serif text-2xl italic">Whispers</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} strokeWidth={1} className="text-gray-400" />
          </button>
        </div>

        {/* Big Typographic Links */}
        <div className="flex flex-col items-center justify-center h-full gap-12 -mt-10">
          <Link
            href="/feeds"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl italic font-light hover:text-purple-600 transition-colors"
          >
            Read
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl italic font-light hover:text-purple-600 transition-colors"
          >
            About
          </Link>

          <button
            onClick={() => handleMobileAction(() => setIsOpen(true))}
            className="font-serif text-5xl italic font-light hover:text-purple-600 transition-colors"
          >
            Whisper
          </button>

          {/* Decorative Technical Detail */}
          <div className="mt-8 font-mono text-[8px] uppercase tracking-[0.6em] text-gray-300">
            Secure Session // Anonymous
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
