"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Release the Signal",
    description:
      "Your thoughts are encrypted the moment you hit transmit. No accounts, no tracking, no digital footprint. Just pure, raw data released into the void.",
  },
  {
    number: "02",
    title: "The Public Echo",
    description:
      "Once transmitted, your whisper joins the global index. It lives as a standalone piece of human experience, categorized by its essence—not its author.",
  },
  {
    number: "03",
    title: "Anonymous Resonance",
    description:
      "Others interact with your signal through 'Echoes'. There are no profiles to visit, only perspectives to consider. The conversation stays focused on the thought, never the face.",
  },
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] pt-32 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header - Editorial Style */}
        <header className="mb-24">
          <div className="mb-6 font-mono text-[9px] uppercase tracking-[0.4em] text-purple-600 font-bold">
            Protocol_01 // Logic
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight text-gray-900 tracking-tighter">
            The <span className="italic">Mechanics</span> <br /> of Silence.
          </h1>
          <p className="mt-8 max-w-md font-serif text-xl text-gray-500 leading-relaxed">
            Whispers is built on the belief that the most honest stories are
            told when no one is watching.
          </p>
        </header>

        {/* Steps Section - Pure Typographic Contrast */}
        <section className="space-y-32">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 items-start"
            >
              {/* The Number - Ghosted Background */}
              <span className="font-serif text-5xl italic text-gray-200 leading-none">
                {step.number}
              </span>

              <div className="max-w-xl">
                <h2 className="font-serif text-3xl text-gray-900 mb-6">
                  {step.title}
                </h2>
                <p className="font-serif text-lg text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Call to Action - Floating White Card */}
        <section className="mt-40 rounded-[3rem] bg-white p-12 md:p-20 shadow-sm text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">
            Ready to <span className="italic">whisper?</span>
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-4 bg-black text-white px-12 py-5 rounded-full font-mono text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-all hover:shadow-xl active:scale-95"
          >
            Enter the Void <ArrowRight size={16} />
          </Link>
        </section>

        {/* Technical Footer Note */}
        <footer className="mt-32 text-center">
          <div className="h-px w-12 bg-gray-200 mx-auto mb-8" />
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-gray-300">
            End to End Anonymity • Verification Not Required
          </p>
        </footer>
      </div>
    </main>
  );
}
