import React, { useState } from "react";
import "./ProfileDashboard.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCardIcon from "@mui/icons-material/AddCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import ChatIcon from "@mui/icons-material/Chat";
import UpdateIcon from "@mui/icons-material/Update";
import MailIcon from "@mui/icons-material/Mail";
import userAuth, {
  setProfileMenu,
  resetProfileMenu,
} from "../../../Redux/userAuth";
import { useDispatch } from "react-redux";
const ProfileMenuDesktop = () => {
  const [menuItem, setMenuItem] = useState(0);
  const dispatch = useDispatch();

  return (
    <>
      <div className="ProfileMenuDesktop-header">
        <div className="ProfileMenuDesktop-menu">
          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(0))}
          >
            <AccountBoxIcon />
            <span>Profile</span>
          </div>

          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(1))}
          >
            <AddCardIcon />
            <span>Cards</span>
          </div>
          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(2))}
          >
            <PaymentsIcon />
            <span>Payments</span>
          </div>
          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(3))}
          >
            <ChatIcon />
            <span>Chats</span>
          </div>
          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(4))}
          >
            <UpdateIcon />
            <span>Updates</span>
          </div>
          <div
            className="ProfileMenuDesktop-menuItem"
            onClick={() => dispatch(setProfileMenu(5))}
          >
            <MailIcon />
            <span>Inbox</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMenuDesktop;
