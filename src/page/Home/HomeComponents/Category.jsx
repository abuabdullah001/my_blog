import React from "react";

const Category = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories?.map((category) => (
        <div className="border border-gray-300 p-4" key={category.id}>
           <p className="text-lg font-semibold">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;