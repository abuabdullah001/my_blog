import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaRegClock, FaCalendarAlt, FaUserTie, FaCheckCircle, FaStar, FaVideo, FaLaptopCode, FaUsers, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogDetails = () => {
    const { slug } = useParams();
    const location = useLocation();
    const [blogData, setBlogData] = useState(location.state?.blog || null);
    const [loading, setLoading] = useState(!location.state?.blog);

    useEffect(() => {
        if (!blogData) {
            // Fetch the specific JSON for the details
            fetch('/blogDetails.json')
                .then(res => res.json())
                .then(data => {
                    // In a real app we'd filter by slug, but here we use the specific file
                    setBlogData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching blog details:", err);
                    setLoading(false);
                });
        }
    }, [slug, blogData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!blogData) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-error mb-4">Blog data not found.</h2>
                <Link to="/" className="btn btn-primary"><FaArrowLeft /> Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-base-100 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <img 
                    src={blogData.thumbnail || blogData.featured_image} 
                    alt={blogData.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <div className="container mx-auto px-4 md:px-10 lg:px-24 pb-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="badge badge-primary font-bold">{blogData.batch?.name || "Premium Course"}</span>
                            {blogData.batch?.is_live && <span className="badge badge-error text-white animate-pulse">{blogData.batch.live_text}</span>}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">{blogData.title}</h1>
                        <p className="text-xl text-white/90 font-medium italic">{blogData.subtitle}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-10 lg:px-24 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Instructor Card */}
                        <div className="flex items-center gap-4 p-6 bg-base-200 rounded-3xl border border-base-300 shadow-sm">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={blogData.instructor?.avatar} alt={blogData.instructor?.name} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    {blogData.instructor?.name}
                                    <FaCheckCircle className="text-info text-sm" />
                                </h3>
                                <p className="text-base-content/70">{blogData.instructor?.title}</p>
                                <p className="text-sm mt-1">{blogData.instructor?.bio}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-7 bg-primary rounded-full"></span>
                                সম্পর্কে বিস্তারিত
                            </h2>
                            <div className="space-y-4">
                                {Array.isArray(blogData.description) ? blogData.description.map((p, i) => (
                                    <p key={i} className="text-base-content/80 leading-relaxed">{p}</p>
                                )) : <p className="text-base-content/80 leading-relaxed">{blogData.description || blogData.content}</p>}
                            </div>
                        </div>

                        {/* What you will get */}
                        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                            <h2 className="text-2xl font-bold mb-6">এই কোর্সে আপনি যা যা পাবেন:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {blogData.what_you_will_get?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <FaCheckCircle className="text-primary shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div className="pt-10">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">কারিকুলাম</h1>
                                <div className="flex items-center justify-center gap-6 text-slate-500 font-medium text-sm">
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                                            <div className="grid grid-cols-2 gap-0.5">
                                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                            </div>
                                        </div>
                                        {blogData.course_features?.total_modules || 22} মডিউল
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </div>
                                        {blogData.course_features?.total_live_classes || 84} লাইভ ক্লাস
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {blogData.curriculum?.map((module, idx) => (
                                    <div key={idx} className="bg-slate-50/50 rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <h2 className="text-2xl md:text-3xl font-black text-emerald-500 leading-tight">
                                                {module.title}
                                            </h2>
                                            <div className="badge badge-lg bg-emerald-100 text-emerald-700 border-none font-bold shrink-0">
                                                {module.subtitle}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="text-slate-900 font-bold text-lg">ক্লাস নিবেনঃ</span>
                                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                                                <img src={blogData.instructor?.avatar} alt={module.mentor} className="w-6 h-6 rounded-full" />
                                                <span className="text-slate-600 font-bold text-sm">{module.mentor}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {module.topics?.map((topic, tidx) => (
                                                <div key={tidx} className="collapse collapse-arrow bg-white rounded-2xl border border-slate-100 group transition-all shadow-sm">
                                                    <input type="checkbox" className="peer" /> 
                                                    <div className="collapse-title p-2 flex items-center min-h-0 peer-checked:border-b peer-checked:border-slate-50">
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg ${
                                                                tidx % 4 === 0 ? 'bg-amber-500' : 
                                                                tidx % 4 === 1 ? 'bg-orange-500' : 
                                                                tidx % 4 === 2 ? 'bg-purple-500' : 'bg-sky-500'
                                                            }`}>
                                                                <span className="text-[10px] font-black uppercase leading-none opacity-80">সপ্তাহ</span>
                                                                <span className="text-xl font-black tracking-tighter">{topic.week || tidx + 1}</span>
                                                            </div>
                                                            <div className="flex-1 pr-4">
                                                                <h4 className="text-slate-800 font-bold text-sm leading-snug group-hover:text-emerald-600 transition-colors">
                                                                    {topic.title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="collapse-content bg-slate-50/30">
                                                        <div className="py-4 px-2">
                                                            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                                                ক্লাস পার্টসমূহ ({topic.lessons?.length || 0})
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {topic.lessons?.map((lesson, lidx) => (
                                                                    <div key={lidx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group/item">
                                                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 transition-colors">
                                                                            <svg className="w-4 h-4 text-emerald-600 group-hover/item:text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Part - {lidx + 1}</span>
                                                                            <span className="text-slate-700 font-bold text-sm leading-tight">{lesson}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {!topic.lessons && (
                                                                    <div className="text-slate-400 text-xs italic p-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                                                                        এই সপ্তাহের পার্টসমূহ শীঘ্রই যুক্ত করা হবে।
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                                                                <span className="flex items-center gap-1"><FaRegClock className="text-emerald-500" /> সময়কাল: {topic.duration || "২ ঘণ্টা"}</span>
                                                                {topic.is_preview && <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Preview Available</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                        {/* Course Card */}
                        <div className="card bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
                            <div className="relative group cursor-pointer">
                                <img src={blogData.promo_video?.thumbnail} className="w-full aspect-video object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <FaVideo className="text-primary text-2xl" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 badge badge-neutral">{blogData.promo_video?.duration}</div>
                            </div>
                            
                            <div className="card-body p-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-extrabold text-primary">৳{blogData.pricing?.current_price}</span>
                                    {blogData.pricing?.is_discount_active && (
                                        <span className="text-base-content/50 line-through">৳{blogData.pricing?.old_price}</span>
                                    )}
                                </div>
                                {blogData.pricing?.coupon && (
                                    <div className="badge badge-secondary badge-outline border-dashed w-full py-4 mb-4 font-mono font-bold">
                                        COUPON: {blogData.pricing.coupon}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <button className="btn btn-primary btn-block rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20">
                                        {blogData.cta?.button_text}
                                    </button>
                                    
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div className="p-3 bg-base-200 rounded-xl">
                                            <p className="text-xs text-base-content/60 font-medium">ব্যক্তিদের সংখ্যা</p>
                                            <p className="font-bold flex items-center justify-center gap-1"><FaUsers className="text-info" /> {blogData.statistics?.students}</p>
                                        </div>
                                        <div className="p-3 bg-base-200 rounded-xl">
                                            <p className="text-xs text-base-content/60 font-medium">রেটিং</p>
                                            <p className="font-bold flex items-center justify-center gap-1"><FaStar className="text-warning" /> {blogData.statistics?.rating}</p>
                                        </div>
                                    </div>

                                    <div className="divider my-0"></div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaRegClock className="text-primary" />
                                            <span><strong>মেয়াদ:</strong> {blogData.course_features?.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaCalendarAlt className="text-primary" />
                                            <span><strong>কোর্স শিডিউল:</strong> {blogData.course_features?.weekly_schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaLaptopCode className="text-primary" />
                                            <span><strong>লাইভ ক্লাস:</strong> {blogData.course_features?.total_live_classes}+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-base-200 p-6 rounded-3xl border border-base-300 shadow-sm">
                            <h3 className="font-bold mb-4">প্রয়োজনীয়তা (Requirements):</h3>
                            <ul className="space-y-2 text-sm">
                                {blogData.requirements?.map((req, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="text-primary">•</span> {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BlogDetails;