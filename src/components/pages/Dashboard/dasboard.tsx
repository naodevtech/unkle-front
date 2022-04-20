import React from "react";
import { useSelector } from "react-redux";

import "./_dashboard.scss";
import { authSelector } from "../../../store/auth/authSlice";

function Dashboard() {
  const { currentUser } = useSelector(authSelector);
  return (
    <div className="container_responsive">
      {currentUser?.role === "admin"
        ? "Bienvenue à toi chère admin"
        : "nique ta race sale client"}
    </div>
  );
}

export default Dashboard;
