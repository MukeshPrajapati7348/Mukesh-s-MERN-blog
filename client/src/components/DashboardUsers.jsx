import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

function DashboardUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(-1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (updatedAt) => {
    const updatedDate = new Date(updatedAt);
    const month = updatedDate.getMonth();
    const year = updatedDate.getFullYear();
    const date = updatedDate.getDate();

    return `${date < 10 ? "0" + date : date}-${months[month]}-${year}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/user/getUsers");
        const { flag, users } = await res.json();
        setLoading(false);

        if (flag) {
          setUsers(users);
          if (users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.errorMessage);
      }
    };
    fetchUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      setShowMoreLoading(true);
      const res = await fetch(`/api/user/getUsers?startIndex=${users.length}`);
      const { flag, users: moreUsers } = await res.json();
      setShowMoreLoading(false);

      if (flag) {
        setUsers((prev) => [...prev, ...moreUsers]);

        if (moreUsers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setShowMoreLoading(false);
      toast.error(error.errorMessage);
    }
  };

  const handleUserDelete = async () => {
    setOpenModal(false);

    try {
      const data = await fetch(
        `/api/user/delete/${deleteUserId}/${currentUser._id}`,
        {
          method: "delete",
        }
      );
      const { flag } = await data.json();

      if (flag) {
        toast.success("User deleted successfully");

        setUsers((prev) => prev.filter((user) => user._id !== deleteUserId));
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
        <div className="w-full flex items-center justify-center">
          <Spinner color="pink" size="lg" />
          <span className="text-lg ml-2">Loading...</span>
        </div>
      ) : (
        <div
          className="p-3 table-auto overflow-x-auto md:mx-auto scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
          {currentUser.isAdmin && users.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell> Date created </Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={user._id}
                  >
                    <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePic}
                        alt="image"
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-red-500 cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setDeleteUserId(user._id);
                        }}
                      >
                        delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No user found!</p>
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
                  Are you sure you want to delete this user?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleUserDelete}>
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

export default DashboardUsers;
