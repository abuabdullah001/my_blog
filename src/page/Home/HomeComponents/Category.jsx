import React from "react";

const Category = ({ categories }) => {
  return (
    <div className="flex flex-col gap-2">
      {categories?.map((category) => (
        <button
          key={category.id}
          className="group flex items-center justify-between w-full p-3 rounded-xl bg-base-100 border border-base-300 hover:border-primary hover:bg-primary/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {category.icon || "📁"}
            </div>
            <span className="font-medium text-base-content/80 group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {category.count && (
              <span className="badge badge-sm badge-ghost opacity-60 group-hover:badge-primary group-hover:opacity-100">
                {category.count}
              </span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Category;