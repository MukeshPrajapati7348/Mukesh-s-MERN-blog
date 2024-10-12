import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="group border w-full relative border-teal-500 hover:border-2 transition-all h-[350px] overflow-hidden rounded-lg sm:w-[350px]">
      <Link to={`/blog/${blog.slug}`}>
        <img
          src={blog.blogImage}
          alt="blog-image"
          className="h-[240px] object-cover w-full group-hover:h-[190px] transition-all duration-200 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{blog.title}</p>
        <p className="italic text-sm">{blog.category}</p>
        <Link
          to={`/blog/${blog.slug}`}
          className="z-10 text-teal-500 group-hover:bottom-0 bottom-[-100px] absolute left-0 right-0 text-center border border-teal-500 hover:bg-teal-500 hover:text-white rounded-md !rounded-tl-none transition-all duration-200 py-2 m-2"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
