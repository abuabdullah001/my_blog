import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="group card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-500 border border-base-200 overflow-hidden">
            {/* Image Section */}
            <figure className="aspect-[16/9] overflow-hidden relative">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={blog.featured_image}
                    alt={blog.title} 
                />
                {/* Category Badge - Assuming category_id 2 is Web Dev as seen in JSON */}
                <div className="absolute top-4 left-4">
                    <span className="badge badge-primary font-semibold text-xs py-3 px-4 shadow-lg border-none backdrop-blur-md bg-primary/90">
                        {blog.category_id === 2 ? "Web Development" : "Technology"}
                    </span>
                </div>
            </figure>

            <div className="card-body p-6">
                
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="badge badge-error badge-sm gap-1 text-[10px] font-bold text-white uppercase tracking-tighter shadow-sm border-none">
                            🕒 20 days left
                        </span>
                        <span className="badge badge-neutral badge-sm gap-1 text-[10px] font-bold uppercase tracking-tighter shadow-sm border-none">
                            📦 Batch 10
                        </span>
                        <span className="badge badge-success badge-sm gap-1 text-[10px] font-bold text-white uppercase tracking-tighter shadow-sm border-none">
                            🪑 50 seats
                        </span>
                    </div>
                </div>

                <h2 className="card-title text-xl font-extrabold line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-[3.5rem] leading-tight">
                    {blog.title}
                </h2>
                
                <p className="text-sm text-base-content/60 line-clamp-3 mt-2 leading-relaxed">
                    {blog.excerpt || blog.description}
                </p>

                <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-base-200">
                   
                    <div className="flex gap-4 text-base-content/50">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                            <span className="text-lg">👁️</span> {blog.views?.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                            <span className="text-lg">💬</span> {blog.comments_count}
                        </div>
                    </div>
                             {/* Read More Button */}
                    <Link
                        to={`/blog/${blog.slug}`}
                        state={{ blog }}
                        className="btn btn-primary btn-sm rounded-full px-6 hover:scale-105 transition-transform shadow-md"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;