import Link from "next/link";
import React from "react";

const Navbar = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => {
  return (
    <nav className="fixed top-0 z-[100] w-full bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        {/* Logo - Elegant & Unbound */}
        <Link href="/" className="group">
          <h3 className="font-serif text-2xl italic tracking-tighter text-black transition-opacity group-hover:opacity-60">
            Whispers
          </h3>
        </Link>

        {/* Desktop Menu - Spaced & Airy */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/feeds"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
          >
            Read Stories
          </Link>

          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
          >
            How it works
          </Link>

          {/* The Main Action - Soft Rounded Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-transparent font-mone uppercase text-[11px] tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
          >
            Write Secret
          </button>
        </div>

        {/* Mobile Menu - Minimalist */}
        <div className="flex items-center md:hidden">
          <button className="font-mono text-[10px] uppercase tracking-widest text-gray-400 border border-gray-100 px-3 py-1.5 rounded-md">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
