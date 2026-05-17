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
        // Always set loading to true when slug changes and we don't have state
        if (!location.state?.blog) {
            setLoading(true);
        }

        // Fetch the specific JSON for the details
        fetch('/blogDetails.json')
            .then(res => res.json())
            .then(data => {
                // In a real app we'd filter by slug: data.find(b => b.slug === slug)
                // For now, we simulate finding the correct blog or just setting the data
                setBlogData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blog details:", err);
                setLoading(false);
            });
    }, [slug]); // Dependencies: only slug to re-fetch when URL changes

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
                                <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">কারিকুলাম</h1>
                                <div className="flex items-center justify-center gap-6 text-base-content/60 font-medium text-sm">
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-base-200 rounded flex items-center justify-center">
                                            <div className="grid grid-cols-2 gap-0.5">
                                                <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                                                <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                                                <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                                                <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                                            </div>
                                        </div>
                                        {blogData.course_features?.total_modules || 22} মডিউল
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-base-200 rounded flex items-center justify-center">
                                            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </div>
                                        {blogData.course_features?.total_live_classes || 84} লাইভ ক্লাস
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {blogData.curriculum?.map((module, idx) => (
                                    <div key={idx} className="bg-base-200/50 rounded-[32px] p-6 md:p-10 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                                                        {idx + 1}
                                                    </span>
                                                    <div className="badge badge-lg bg-emerald-100 text-emerald-700 border-none font-black px-4 py-3">
                                                        {module.subtitle}
                                                    </div>
                                                </div>
                                                <h2 className="text-2xl md:text-3xl font-black text-base-content leading-tight">
                                                    {module.title}
                                                </h2>
                                            </div>
                                            <div className="bg-base-100 px-6 py-4 rounded-3xl border border-base-300 shadow-sm flex flex-col items-center justify-center min-w-[120px]">
                                                <span className="text-2xl font-black text-emerald-500">{module.total_classes || 0}</span>
                                                <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest leading-none">মোট ক্লাস</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 mb-10 pb-6 border-b border-base-300">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full ring-2 ring-emerald-100 ring-offset-2">
                                                        <img src={blogData.instructor?.avatar} alt={module.mentor} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-tighter leading-none mb-1">প্রশিক্ষক</p>
                                                    <p className="text-base-content font-bold text-sm">{module.mentor}</p>
                                                </div>
                                            </div>
                                            <div className="h-8 w-px bg-base-300"></div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/50">
                                                    <FaUsers className="text-lg" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-tighter leading-none mb-1">সাপোর্ট</p>
                                                    <p className="text-base-content font-bold text-sm">লাইভ সাপোর্ট</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {module.topics?.map((topic, tidx) => (
                                                <div key={tidx} className="collapse collapse-arrow group bg-base-100 rounded-3xl border border-base-300 transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title p-0 min-h-0">
                                                        <div className="p-6">
                                                            <div className="flex items-start gap-5">
                                                                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg ${
                                                                    tidx % 4 === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 
                                                                    tidx % 4 === 1 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 
                                                                    tidx % 4 === 2 ? 'bg-gradient-to-br from-purple-400 to-purple-600' : 
                                                                    'bg-gradient-to-br from-sky-400 to-sky-600'
                                                                }`}>
                                                                    <span className="text-[10px] font-black uppercase leading-none opacity-80 mb-1">সপ্তাহ</span>
                                                                    <span className="text-2xl font-black tracking-tighter">{topic.week || tidx + 1}</span>
                                                                </div>
                                                                <div className="flex-1 pr-8">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <span className="text-[10px] font-black text-base-content/50 uppercase tracking-widest bg-base-200 px-2 py-0.5 rounded border border-base-300">
                                                                            {topic.duration || "২ ঘণ্টা"} সেশন
                                                                        </span>
                                                                        {topic.is_preview && (
                                                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 animate-pulse">
                                                                                ফ্রি প্রিভিউ
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <h4 className="text-base-content font-black text-lg leading-tight group-hover:text-emerald-500 transition-colors">
                                                                        {topic.title}
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="collapse-content px-6 pb-6 pt-0">
                                                        <div className="space-y-3 mt-4 border-t border-base-200 pt-6">
                                                            <div className="flex items-center gap-2 text-xs font-black text-base-content/40 uppercase tracking-tighter mb-4">
                                                                <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                                </div>
                                                                এই সপ্তাহের পাঠসমূহ:
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-1 gap-2.5">
                                                                {topic.lessons ? topic.lessons.map((lesson, lidx) => (
                                                                    <div key={lidx} className="flex items-center gap-4 bg-base-200/50 p-3 rounded-2xl border border-transparent hover:border-emerald-100 hover:bg-base-100 hover:shadow-sm transition-all group/item">
                                                                        <div className="w-7 h-7 rounded-full bg-base-100 flex items-center justify-center text-[10px] font-black text-emerald-500 border border-emerald-100 shadow-sm group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:border-emerald-500 transition-all">
                                                                            {lidx + 1}
                                                                        </div>
                                                                        <span className="text-base-content/80 font-bold text-sm leading-tight flex-1">
                                                                            {lesson}
                                                                        </span>
                                                                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )) : (
                                                                    <div className="flex flex-col items-center justify-center py-6 px-4 bg-base-200/50 rounded-2xl border-2 border-dashed border-base-300">
                                                                        <FaRegClock className="text-base-content/30 text-2xl mb-2" />
                                                                        <p className="text-base-content/40 font-bold text-xs uppercase text-center">নতুন ক্লাস শীঘ্রই আসছে</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {topic.is_preview && (
                                                                <div className="mt-4 bg-emerald-500 p-3 rounded-2xl flex items-center justify-between hover:bg-emerald-600 transition-colors cursor-pointer text-white">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                                        <FaVideo /> ক্লাসটি দেখুন
                                                                    </span>
                                                                    <svg className="w-4 h-4 animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
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