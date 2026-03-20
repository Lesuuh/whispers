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
    <main className="min-h-screen pt-[80px] bg-white text-black">
      {/* HERO */}
      <HeroSection setIsOpen={setIsOpen} />

      {/* WHAT THIS IS */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="mb-6 font-serif text-3xl md:text-5xl">
          A space for thoughts you don’t share anywhere else
        </h2>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 leading-relaxed">
          No profiles. No followers. No pressure. <br />
          Just raw, unfiltered expression from real people.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1000px] px-6 py-24">
        <h2 className="mb-12 text-center font-serif text-3xl md:text-4xl">
          How it works
        </h2>

        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="mb-3 font-mono text-sm uppercase tracking-widest">
              1. Write
            </h3>
            <p className="text-gray-500 text-sm">
              Share anything on your mind without creating an identity.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-sm uppercase tracking-widest">
              2. Release
            </h3>
            <p className="text-gray-500 text-sm">
              Your post joins a stream of anonymous thoughts from others.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-sm uppercase tracking-widest">
              3. Read
            </h3>
            <p className="text-gray-500 text-sm">
              Discover what people are really thinking — unfiltered.
            </p>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        {/* <h2 className="mb-10 font-serif text-3xl md:text-4xl">
          Trending whispers
        </h2> */}

        <Trending />

        <div className="mt-10 text-center">
          <button
            onClick={() => (window.location.href = "/feeds")}
            className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-black transition"
          >
            View all posts →
          </button>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="mb-6 font-serif text-4xl md:text-5xl">
          Say what you’ve been holding back
        </h2>

        <p className="mb-10 text-gray-500 text-sm">
          No judgment. No identity. Just expression.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-black px-10 py-4 font-mono text-xs uppercase tracking-widest text-white hover:scale-105 transition"
        >
          Write your whisper
        </button>
      </section>

      {/* MODAL */}
      <ModalContainer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PostForm setIsOpen={setIsOpen} />
      </ModalContainer>
    </main>
  );
}