import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import Blogs from "../components/Blogs";

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
      <div className="w-full">{tab === "profile" && <DashboardProfile />}</div>
      <div className="w-full">{tab === "posts" && <Blogs />}</div>
    </div>
  );
}
