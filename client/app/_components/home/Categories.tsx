"use client";

const categories = [
  "All",
  "Thoughts",
  "Reflections",
  "Privacy",
  "Wellness",
  "Philosophy",
  "Tech",
  "Life",
];

interface CategoriesProp {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProp) => {
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "All" ? " " : category);
  };

  const isActive = (category: string) => {
    if (category === "All" && selectedCategory === " ") return true;
    return selectedCategory === category;
  };

  return (
    <div className="py-6 mb-8">
      <div className="flex flex-col gap-4">
        {/* Label - Purely Typographic */}
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-gray-400 px-2">
          Classification_Index
        </span>

        {/* Categories List - Scrollable on mobile, flex on desktop */}
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category)}
              className={`whitespace-nowrap rounded-full px-6 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300
                ${
                  isActive(category)
                    ? "bg-black text-white shadow-md shadow-black/10"
                    : "text-gray-400 hover:bg-gray-100 hover:text-black"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
