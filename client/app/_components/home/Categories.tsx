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
    if (category === "All") {
      setSelectedCategory(" ");
    } else {
      setSelectedCategory(category);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
              selectedCategory === category
                ? "bg-purple-600 text-white shadow-md"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
