import React, { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TiFlowChildren } from "react-icons/ti";
import { TbListDetails } from "react-icons/tb";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import GroupIcon from "@mui/icons-material/Group";
import BallotIcon from "@mui/icons-material/Ballot";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

const DashboardLeftMenuAdmin = ({ dashboardChange }) => {
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
            <DashboardIcon className="link-icon" />
            <span>Dashboard</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(1)}
          >
            <HouseSidingIcon className="link-icon" />
            <span>Orphanages</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(2)}
          >
            <GroupIcon className="link-icon" />
            <span>Users</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(4)}
          >
            <BallotIcon className="link-icon" />
            <span>All orphans</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(3)}
          >
            <MarkAsUnreadIcon className="link-icon" />
            <span>Letters</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(6)}
          >
            <MarkAsUnreadIcon className="link-icon" />
            <span>Videos</span>
          </div>
          <div
            className="left__menu-link"
            onClick={(event) => dashboardChange(5)}
          >
            <MarkUnreadChatAltIcon className="link-icon" />
            <span>Chat</span>
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

export default DashboardLeftMenuAdmin;
