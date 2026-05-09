import React from "react";
import Category from "./Category";
import Blogs from "./Blogs";

const CategoryBlog = ({ blogs }) => {
  return (
    <div>
       {
        blogs.map(blog=>(
            <div  className="items-center flex gap-3" key={blog.id}>
                <img className="w-16 h-16 object-cover" src={blog.featured_image} alt="" />
                <div>
                    <p>{blog.title}</p>
                    <p className="text-xs">{blog.description}</p>
                </div>
            </div>
                
        ))
       }
    </div>
  );
};

export default CategoryBlog;