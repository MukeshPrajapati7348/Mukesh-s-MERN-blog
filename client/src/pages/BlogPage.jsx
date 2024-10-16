import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../components/formatData";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { blogSlug } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/getBlogs?slug=${blogSlug}`);
        const data = await res.json();

        if (res.ok) {
          setBlogData(data.blogs[0]);
          setLoading(false);
        } else {
          toast.error(data.errorMessage);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.errorMessage);
      }
    };
    fetchBlog();
  }, [blogSlug]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/getBlogs?limit=3`);
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
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center min-h-screen">
          <Spinner color="pink" size="lg" />
        </div>
      ) : (
        <main className="min-h-screen max-w-6xl mx-auto  flex flex-col p-3">
          <h1 className="text-center text-3xl md:text-4xl max-w-2xl mx-auto mt-10 p-3 font-serif">
            {blogData.title}
          </h1>
          <Link
            to={`/search?category=${blogData.category}`}
            className="self-center my-6"
          >
            <Button color="gray" pill size="xs">
              {blogData.category}
            </Button>
          </Link>
          <img
            src={blogData.blogImage}
            alt="image"
            className="max-h-[600px] w-full p-3 object-cover"
          />
          <div className="flex justify-between max-w-2xl mx-auto w-full border-b border-slate-500 p-3">
            <span>{formatDate(blogData.createdAt)}</span>
            <span className="italic">
              ~{(blogData?.content?.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: blogData.content }}
            className="w-full max-w-2xl mx-auto blogPage-content mb-7"
          ></div>
          <div className="max-w-4xl w-full mx-auto">
            <CallToAction />
          </div>
          <div className="w-full max-w-2xl mx-auto my-5">
            <CommentSection blogId={blogData._id} />
          </div>
          {recentBlogs.length > 0 && (
            <div className="flex flex-col items-center justify-center mb-7">
              <h1 className="text-xl text-center mb-4">Recent Blogs</h1>
              <div className="flex flex-wrap justify-center gap-5">
                {recentBlogs.map((blog) => (
                  <BlogCard blog={blog} key={blog._id} />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}

export default BlogPage;
