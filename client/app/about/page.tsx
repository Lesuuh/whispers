"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Write",
    description: "Share anything on your mind without creating an identity.",
  },
  {
    number: "02",
    title: "Release",
    description: "Your post joins a stream of anonymous thoughts from others.",
  },
  {
    number: "03",
    title: "Read",
    description: "Discover what people are really thinking — unfiltered.",
  },
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] pt-32 pb-32 relative overflow-hidden">
      {/* subtle background accents */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <header className="mb-24 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight text-gray-900 tracking-tighter">
            How it works
          </h1>

          <p className="mt-6 max-w-md mx-auto text-gray-500 leading-relaxed">
            A simple flow designed to keep things anonymous and focused on
            content.
          </p>
        </header>

        {/* Steps */}
        <section className="grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`rounded-2xl p-8 bg-white shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-1 duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-3xl text-gray-300">
                  {step.number}
                </span>
              </div>

              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                {step.title}
              </h2>

              <p className="text-gray-500 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-32 rounded-[2rem] bg-black text-white p-10 md:p-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Start sharing
          </h2>

          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition active:scale-95"
          >
            Go to home <ArrowRight size={16} />
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <div className="h-px w-12 bg-gray-300 mx-auto mb-6" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Anonymous by design • No personal data stored
          </p>
        </footer>
      </div>
    </main>
  );
}
