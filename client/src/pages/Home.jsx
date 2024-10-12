import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/getBlogs?limit=9`);
        const { blogs } = await res.json();
        if (res.ok) {
          setRecentBlogs(blogs);
        }
      } catch (error) {
        toast.error(error.errorMessage);
      }
    };

    fetchRecentBlogs();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 max-w-6xl mx-auto p-28 px-3 md:px-8">
        <h1 className="text-3xl font-bold md:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-500 text-sm md:text-md">
          Here, you can find articles on front end development, back end
          development, programming languages, data structures and algorithms,
          competitive programming and many more.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold w-max hover:underline"
        >
          View all blogs
        </Link>
      </div>
      <div className="bg-red-200 p-5 dark:bg-slate-700">
        <CallToAction />
      </div>
      {recentBlogs.length > 0 && (
        <div className="my-8 max-w-6xl w-full mx-auto flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center mb-7">
            <h1 className="text-2xl text-center mb-4 font-bold">
              Recent Blogs
            </h1>
            <div className="flex flex-wrap justify-center gap-5">
              {recentBlogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
            </div>
          </div>
          <Link
            to="/search"
            className="text-md lg:text-ld text-teal-500 font-bold mx-auto w-max hover:underline"
          >
            View all blogs
          </Link>
        </div>
      )}
    </div>
  );
}
