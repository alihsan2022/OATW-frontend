import React, { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TiFlowChildren } from "react-icons/ti";
import { TbListDetails } from "react-icons/tb";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { signOut, getAuth } from "firebase/auth";
import { AiOutlineWechat } from "react-icons/ai";

const DashboardLeftMenu = ({ dashboardChange }) => {
  const [dashboardView, setDashboardView] = useState(0);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("Sign out error");
      });
  };

  return (
    <div className="dashboard-left__menu">
      <div className="left__menu-container">
        <div className="left__menu-links">
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(0)}
          >
            <MdOutlineSpaceDashboard className="link-icon" />
            <span>Dashboard</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(1)}
          >
            <MdOutlineSpaceDashboard className="link-icon" />
            <span>All Orphans</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(2)}
          >
            {" "}
            <TiFlowChildren className="link-icon" />
            <span>Children</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(3)}
          >
            {" "}
            <AiOutlineWechat className="link-icon" />
            <span>Chat</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(4)}
          >
            {" "}
            <MdOutlinePhotoSizeSelectActual className="link-icon" />
            <span>Photos</span>
          </div>
          <div className="left__menu-logout">
            <button onClick={handleLogout}>
              <GrLogout className="logout__icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftMenu;
