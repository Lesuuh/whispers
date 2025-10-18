interface HeroSectionProps {
  setIsOpen: (value: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setIsOpen }) => {
  return (
    <section className="hero-section w-full max-w-full flex items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-5xl font-heading mb-4">Welcome to AnonBlog</h1>
        <p className="text-lg font-body text-gray-700 mb-6">
          Share your thoughts anonymously and freely.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-3 bg-primary-500 text-white rounded-xl bg-gray-900 shadow hover:bg-purple-600 transition"
        >
          Air it Out
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
