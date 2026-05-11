import React from "react";

const CategoryBlog = ({ blogs }) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <div 
          className="group flex items-center gap-4 p-2 rounded-xl hover:bg-base-200 transition-all duration-300 cursor-pointer border border-transparent hover:border-base-300" 
          key={blog.id}
        >
          <div className="relative overflow-hidden rounded-lg w-20 h-20 shrink-0">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={blog.featured_image} 
              alt={blog.title} 
            />
          </div>
          <div className="flex flex-col gap-1 overflow-hidden">
            <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-xs text-base-content/70 line-clamp-1 italic">
              {blog.description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Read More</span>
              <div className="h-px w-4 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBlog;