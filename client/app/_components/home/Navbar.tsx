"use client";

import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";

const Navbar = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileAction = (action?: () => void) => {
    setMenuOpen(false);
    if (action) action();
  };

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link href="/" className="group">
            <h3 className="font-serif text-2xl  tracking-tighter text-black group-hover:opacity-70 transition">
              Whispers
            </h3>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/feeds"
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:text-black transition"
            >
              Read Stories
            </Link>

            <Link
              href="/about"
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:text-black transition"
            >
              How it works
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="font-mono uppercase text-[10px] tracking-[0.2em] text-white bg-black px-5 py-2 rounded-full hover:bg-gray-800 transition active:scale-95"
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

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-white transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-5">
          <span className="font-serif text-2xl italic tracking-tighter">
            Whispers
          </span>

          <button onClick={() => setMenuOpen(false)}>
            <X size={24} strokeWidth={1} className="text-gray-400" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full gap-14 -mt-10">
          <Link
            href="/feeds"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl italic font-light text-black hover:opacity-60 transition"
          >
            Read
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl italic font-light text-black hover:opacity-60 transition"
          >
            About
          </Link>

          <button
            onClick={() => handleMobileAction(() => setIsOpen(true))}
            className="font-serif text-5xl italic font-light text-black hover:opacity-60 transition"
          >
            Whisper
          </button>

          {/* Footer Note */}
          <div className="mt-10 font-mono text-[8px] uppercase tracking-[0.6em] text-gray-300">
            Anonymous by design
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
