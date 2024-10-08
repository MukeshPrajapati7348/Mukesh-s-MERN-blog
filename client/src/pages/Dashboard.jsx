import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import DashboardBlogs from "../components/DashboardBlogs";
import DashboardUsers from "../components/DashboardUsers";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlTab = queryParams.get("tab");
    if (urlTab) {
      setTab(urlTab);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {/* profile data */}
      {tab === "profile" && <DashboardProfile />}
      {/* blogs */}
      {tab === "blogs" && <DashboardBlogs />}
      {/* users */}
      {tab === "users" && <DashboardUsers />}
      {/* Dashboar data */}
      {(tab === "dashboard" || !tab) && <DashboardComp />}
    </div>
  );
}
