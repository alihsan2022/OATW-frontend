import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import DashboardHeader from "./DashboardHeader";
import DashboardLeftMenuOrphanage from "./DashboardLeftMenuOrphanage";
import OrphanageDashboard from "./OrphanageDashboard/OrphanageDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import "./DashboardStyles.css";
import Loader from "../../Components/Loader";
import { Navigate } from "react-router-dom";
import DashboardLeftMenuAdmin from "./DashboardLeftMenuAdmin";
import userAuth, { userIsVerified } from "../../Redux/userAuth";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user, userRole, verified } = useContext(AuthContext);
  const [orphanDashboard, setOrphanDashboard] = useState(0);
  const [adminDashboard, setAdminDashboard] = useState(0);
  const [userDashboard, setUserDashboard] = useState(0);
  const { userIsVerified } = useSelector((state) => state.userAuth);
  if (!user) {
    return <Navigate to="/" />;
  }

  if (!userIsVerified) {
    return <Navigate to="/profile" />;
  }

  const handleDashboardViewChange = (num) => {
    setAdminDashboard(num);
    setOrphanDashboard(num);
    setUserDashboard(num);
  };

  return (
    <>
      <div className="dashboard-header">
        <DashboardHeader />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-leftMenu">
          {userRole && userRole === 0 && (
            <DashboardLeftMenuOrphanage
              dashboardChange={handleDashboardViewChange}
            />
          )}
          {userRole && userRole === 1 && (
            <DashboardLeftMenuOrphanage
              dashboardChange={handleDashboardViewChange}
            />
          )}
          {userRole && userRole === 2 && (
            <DashboardLeftMenuAdmin
              dashboardChange={handleDashboardViewChange}
            />
          )}
        </div>
        <div className="dashboard-content">
          {userRole && userRole === 0 && <UserDashboard view={userDashboard} />}
          {userRole && userRole === 1 && (
            <OrphanageDashboard view={orphanDashboard} />
          )}
          {userRole && userRole === 2 && (
            <AdminDashboard view={adminDashboard} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
