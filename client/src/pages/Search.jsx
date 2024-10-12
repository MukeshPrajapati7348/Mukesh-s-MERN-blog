import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";

function Search() {
  const [searchData, setSearchData] = useState({
    searchText: "",
    sortBy: "desc",
    category: "uncategorized",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    const searchTextFromURL = URLParams.get("searchText");
    const sortbyFromURL = URLParams.get("sortBy");
    const categoryFromURL = URLParams.get("category");

    if (searchTextFromURL || sortbyFromURL || categoryFromURL) {
      setSearchData({
        ...searchData,
        searchText: searchTextFromURL,
        sortBy: sortbyFromURL || "desc",
        category: categoryFromURL || "uncategorized",
      });
    }
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const searchQuery = URLParams.toString();
        const res = await fetch(`/api/blog/getBlogs?${searchQuery}`);

        if (res.ok) {
          const data = await res.json();
          setBlogs(data.blogs);
          setLoading(false);
          if (data.blogs.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.errorMessage);
      }
    };

    fetchBlogs();
  }, [location.search]);

  const handleChange = (e) => {
    const name = e.target.name;

    if (name === "searchTxt") {
      setSearchData({ ...searchData, searchText: e.target.value });
    }
    if (name === "sort") {
      const order = e.target.value || "desc";
      setSearchData({ ...searchData, sortBy: order });
    }
    if (name === "category") {
      const category = e.target.value || "uncategorized";
      console.log(category);

      setSearchData({ ...searchData, category: category });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URLParams = new URLSearchParams(location.search);
    URLParams.set("searchText", searchData.searchText);
    URLParams.set("sortBy", searchData.sortBy);
    URLParams.set("category", searchData.category);
    const searchQuery = URLParams.toString();
    navigate(`/search?${searchQuery}`);

    try {
      setLoading(true);
      const res = await fetch(`/api/blog/getBlogs?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs);
        setLoading(false);
        if (data.blogs.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.errorMessage);
    }
  };

  const handleShowMore = async () => {
    const URLParams = new URLSearchParams(location.search);
    URLParams.set("startIndex", blogs.length - 1);
    const searchQuery = URLParams.toString();

    try {
      setLoading(true);
      const res = await fetch(`/api/blog/getBlogs?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setBlogs([...blogs, ...data.blogs]);
        setLoading(false);
        if (data.blogs.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r border-gray-500 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">
              Search text:
            </label>
            <TextInput
              placeholder="Search text..."
              name="searchTxt"
              value={searchData.searchText}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Sort by:</label>
            <Select
              value={searchData.sortBy}
              name="sort"
              onChange={handleChange}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Category:</label>
            <Select
              value={searchData.category}
              name="category"
              onChange={handleChange}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="javascript">Javascript</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="next">Next</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToBlue">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold p-3 mt-5 border-b border-gray-500">
          Search Result:
        </h1>

        {!loading && blogs.length === 0 && (
          <p className="p-3 text-xl text-gray-500">No blog found!</p>
        )}
        {loading && <p className="p-3 text-xl text-gray-500">Loading...</p>}

        <div className="flex flex-wrap gap-4 p-3 justify-center">
          {!loading &&
            blogs.length > 0 &&
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
        {showMore && (
          <div className="flex items-center justify-center mb-5">
            <button
              className="text-teal-500 hover:underline p-2 text-xl"
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
