import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { formatDate } from "./formatData";

function DashboardBlogs() {
  const { currentUser } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(-1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        let fetchedBlogs = await fetch(
          `/api/blog/getBlogs?userId=${currentUser._id}`
        );
        fetchedBlogs = await fetchedBlogs.json();
        setLoading(false);
        setBlogs(fetchedBlogs.blogs);
        if (fetchedBlogs.blogs.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        toast.error(error.errorMessage);
      }
    };
    fetchBlogs();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      setShowMoreLoading(true);
      const res = await fetch(
        `/api/blog/getBlogs?userId=${currentUser._id}&startIndex=${blogs.length}`
      );
      const { blogs: moreBlogs } = await res.json();
      setShowMoreLoading(false);

      if (res.ok) {
        setBlogs((prev) => [...prev, ...moreBlogs]);

        if (moreBlogs.length < 9) {
          setShowMore(false);
        }
      } else {
        toast.error(error.errorMessage);
      }
    } catch (error) {
      toast.error(error.errorMessage);
    }
  };

  const handleBlogDelete = async () => {
    setOpenModal(false);

    try {
      let data = await fetch(
        `/api/blog/delete/${deleteBlogId}/${currentUser._id}`,
        {
          method: "delete",
        }
      );
      data = await data.json();

      if (data.flag) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== deleteBlogId));
        toast.success("Blog deleted successfully");
      } else {
        toast.error(error.errorMessage);
      }
    } catch (error) {
      toast.error(error.errorMessage);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center min-h-screen">
          <Spinner color="pink" size="lg" />
        </div>
      ) : (
        <div
          className="p-3 table-auto overflow-x-auto md:mx-auto scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
          {currentUser.isAdmin && blogs.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell> Date updated </Table.HeadCell>
                <Table.HeadCell>Blog image</Table.HeadCell>
                <Table.HeadCell>Blog title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {blogs.map((blog) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={blog._id}
                  >
                    <Table.Cell>{formatDate(blog.updatedAt)}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/blog/${blog.slug}`}>
                        <img
                          src={blog.blogImage}
                          alt="image"
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/blog/${blog.slug}`}
                      >
                        {blog.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{blog.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-red-500 cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setDeleteBlogId(blog._id);
                        }}
                      >
                        delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/update-blog/${blog._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No blog found!</p>
          )}
          {showMore && (
            <div className="w-full flex items-center justify-center py-5">
              <button
                className="text-teal-500  cursor-pointer text-sm p-1"
                onClick={handleShowMore}
              >
                {showMoreLoading ? (
                  <div>
                    <Spinner color="purple" size="sm" />
                    <span className="text-sm ml-2">Loading...</span>
                  </div>
                ) : (
                  "show more"
                )}
              </button>
            </div>
          )}
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this blog?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleBlogDelete}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default DashboardBlogs;
