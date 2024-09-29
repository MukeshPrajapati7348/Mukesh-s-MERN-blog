import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { SignoutUserSuccess } from "../redux/userReducer/userSlice";
import { useDispatch, useSelector } from "react-redux";

function DashboardSidebar() {
  const [tab, setTab] = useState("");
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
        dispatch(SignoutUserSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
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
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
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
