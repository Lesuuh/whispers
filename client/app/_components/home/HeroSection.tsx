import React from "react";

interface HeroSectionProps {
  setIsOpen: (value: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setIsOpen }) => {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-[#ededed]">
      {/* Soft Ambient Glow - Replaces harsh lines for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl text-center px-6">
        {/* Headline - Shift from 'haunting' to 'sophisticated' */}
        <h1 className="mb-8 font-serif text-5xl font-light tracking-tight md:text-8xl lg:text-9xl">
          Everything you <br />
          <span className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
            can&apos;t say
          </span>{" "}
          out loud.
        </h1>

        <p className="mx-auto mb-16 max-w-md font-mono text-xs uppercase tracking-[0.3em] text-gray-500 leading-relaxed">
          No accounts. No identities. <br />
          Release your thoughts into the void.
        </p>

        <div className="flex flex-col items-center gap-12">
          {/* Refined Button - Soft Rounded, High Contrast */}
          <button onClick={() => setIsOpen(true)} className="group relative">
            <div className="absolute -inset-1 rounded-full bg-white/10 opacity-0 blur transition duration-500 group-hover:opacity-100"></div>
            <span className="relative block rounded-full bg-white px-12 py-4 font-mono text-sm uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Begin your whisper
            </span>
          </button>

          {/* Minimalist Interactive - No lines, just breathing text */}
          <div className="animate-pulse font-mono text-[9px] uppercase tracking-[0.5em] text-gray-700">
            The cursor is waiting
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
