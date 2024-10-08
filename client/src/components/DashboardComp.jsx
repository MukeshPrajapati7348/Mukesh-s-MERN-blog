import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiArrowNarrowUp,
  HiArrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardComp() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthBlogs, setLastMonthBlogs] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let data = await fetch("/api/user/getUsers?limit=5");
        data = await data.json();
        if (data.flag) {
          setUsers(data.users);
          setLastMonthUsers(data.lastMonthUsers);
          setTotalUsers(data.totatUsers);
        }
      } catch (error) {
        toast.error(error.errorMessage);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/getBlogs?limit=5");
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs);
          setTotalBlogs(data.totalBlogCount);
          setLastMonthBlogs(data.lastMonthBlogCount);
        }
      } catch (error) {
        toast.error(error.errorMessage);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchBlogs();
    }
  }, [currentUser]);

  return (
    <div className="md:mx-auto p-5">
      <div className="flex flex-wrap justify-center gap-5">
        <div className="flex flex-col gap-2 p-5 shadow-md dark:bg-slate-800 md:w-96 w-full rounded-md">
          <div className="flex justify-between">
            <div>
              <h1 className="text-md uppercase text-gray-500">Total Users</h1>
              <p className="text-2xl text-gray-500">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 rounded-full p-3 text-white shadow-md text-5xl" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 shadow-md dark:bg-slate-800 md:w-96 w-full rounded-md">
          <div className="flex justify-between">
            <div>
              <h1 className="text-md uppercase text-gray-500">Total Blogs</h1>
              <p className="text-2xl text-gray-500">{totalBlogs}</p>
            </div>
            <HiDocumentText className="bg-indigo-500 rounded-full p-3 text-white shadow-md text-5xl" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthBlogs}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        <div className="p-3 flex flex-col shadow-md dark:bg-gray-800 w-full md:w-auto rounded-md">
          <div className="flex justify-between items-center pb-3">
            <h3 className="text-gray-500 font-semibold">Recent users</h3>
            <Link to="/dashboard?tab=users">
              <Button outline gradientDuoTone="purpleToBlue">
                See all
              </Button>
            </Link>
          </div>
          <div>
            {users.length > 0 && (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row>
                      <Table.Cell>
                        <img
                          src={user.profilePic}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
        <div className="p-3 flex flex-col shadow-md dark:bg-gray-800 w-full md:w-auto rounded-md">
          <div className="flex justify-between items-center pb-3">
            <h3 className="text-gray-500 font-semibold">Recent blogs</h3>
            <Link to="/dashboard?tab=blogs">
              <Button outline gradientDuoTone="purpleToBlue">
                See all
              </Button>
            </Link>
          </div>
          <div>
            {blogs.length > 0 && (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Blog Image</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {blogs.map((blog) => (
                    <Table.Row>
                      <Table.Cell>
                        <img
                          src={blog.blogImage}
                          alt="user"
                          className="w-14 h-10 rounded-md"
                        />
                      </Table.Cell>
                      <Table.Cell className="w-96">{blog.title}</Table.Cell>
                      <Table.Cell className="w-5">{blog.category}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp;
