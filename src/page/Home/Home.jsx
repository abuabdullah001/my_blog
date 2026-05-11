import React, { useEffect, useState } from "react";
import Blogs from "./HomeComponents/Blogs";
import Category from "./HomeComponents/Category";
import CategoryBlog from "./HomeComponents/CategoryBlog";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])


    useEffect(() => {
        fetch('category.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        // You can also filter blogs based on the selected category here if needed
    } 

    return (
        <div className="bg-base-100 min-h-screen py-10">
            <div className="container mx-auto px-4 md:px-10 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Blog Section */}
                    <div className="lg:col-span-8">
                        <section className="bg-base-100 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-accent rounded-full"></span>
                                Latest Articles
                            </h2>
                            <Blogs blogs={blogs} />
                        </section>
                    </div>

                    {/* Right Side: Category Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-base-200 p-6 rounded-2xl shadow-sm border border-base-300">
                            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">Categories</h2>
                            <Category categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                        </section>

                        <section className="bg-base-200 p-6 rounded-2xl shadow-sm border border-base-300">
                            <h2 className="text-xl font-bold mb-4 border-l-4 border-secondary pl-3">Popular Posts</h2>
                            <CategoryBlog blogs={blogs} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;