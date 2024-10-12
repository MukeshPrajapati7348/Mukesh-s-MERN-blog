import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiUser,
  HiUsers,
} from "react-icons/hi";
import { SignoutUserSuccess } from "../redux/userReducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function DashboardSidebar() {
  const [tab, setTab] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlTab = queryParams.get("tab");
    if (urlTab) {
      setTab(urlTab);
    }
  }, [location.search]);

  const handleUserSignout = async () => {
    try {
      let data = await fetch("/api/user/signout", {
        method: "post",
      });

      data = await data.json();

      if (data.flag) {
        toast.success("Signed out successfully");
        dispatch(SignoutUserSuccess());
      }
    } catch (error) {
      toast.error(error.errorMessage);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=dashboard">
              <Sidebar.Item
                active={tab === "dashboard" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=blogs">
                <Sidebar.Item
                  active={tab === "blogs"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Blogs
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item active={tab === "users"} icon={HiUsers} as="div">
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleUserSignout}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
