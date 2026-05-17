import React from "react";

const Category = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-col gap-2">
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id) }
          className={`cursor-pointer group flex items-center justify-between w-full p-3 rounded-xl border transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-primary/10 border-primary text-primary"
              : "bg-base-100 border-base-300 hover:border-primary hover:bg-primary/5 shadow-sm"
          }`}

        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
              }`}
            >
              {category.icon || "📁"}
            </div>
            <span
              className={`font-medium transition-colors ${
                selectedCategory === category.id ? "text-primary" : "text-base-content/80 group-hover:text-primary"
              }`}
            >
              {category.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {category.posts_count && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-base-300 text-base-content/60"
                }`}
              >
                {category.posts_count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Category;