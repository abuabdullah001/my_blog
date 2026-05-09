import React, { useEffect, useState } from "react";
import Blogs from "./HomeComponents/Blogs";
import Category from "./HomeComponents/Category";
import CategoryBlog from "./HomeComponents/CategoryBlog";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('category.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div>
            <div className="container mx-auto px-24">
                <div className="col-span-8 border">
                    <Blogs blogs={blogs}></Blogs>
                </div>

                <div className="col-span-4 border border-gray-300 p-4">
                    <Category categories ={categories}></Category>
                    <CategoryBlog blogs={blogs}></CategoryBlog>
                </div>
            </div>
        </div>
    );
};

export default Home;