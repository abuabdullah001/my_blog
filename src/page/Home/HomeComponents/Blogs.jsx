import React from "react";
import BlogCard from "./BlogCard";

const Blogs = ({blogs}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs?.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;