import React from "react";
import "./Chat.css";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BedroomParentOutlinedIcon from "@mui/icons-material/BedroomParentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-container__left">
        <div className="chat-container__left-header">
          <span>Username</span>
        </div>
        <div className="chat-container__left-menus">
          <div className="chat-container__left-menu">
            <div className="chat-container__menu-inner">
              <div className="chat-container__left-menu-inner">
                <AdminPanelSettingsOutlinedIcon />
                <span>Admin Chats</span>
              </div>
              <div className="chat-dropdown">
                <ArrowDropDownCircleOutlinedIcon />
              </div>
            </div>
            <div className="chat-container__chatroom">
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
            </div>
          </div>
          <div className="chat-container__left-menu">
            <div className="chat-container__menu-inner">
              <div className="chat-container__left-menu-inner">
                <AdminPanelSettingsOutlinedIcon />
                <span>Admin Chats</span>
              </div>
              <div className="chat-dropdown">
                <ArrowDropDownCircleOutlinedIcon />
              </div>
            </div>
            <div className="chat-container__chatroom">
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
            </div>
          </div>
          <div className="chat-container__left-menu">
            <div className="chat-container__menu-inner">
              <div className="chat-container__left-menu-inner">
                <AdminPanelSettingsOutlinedIcon />
                <span>Admin Chats</span>
              </div>
              <div className="chat-dropdown">
                <ArrowDropDownCircleOutlinedIcon />
              </div>
            </div>
            <div className="chat-container__chatroom">
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
              <div>
                <MarkUnreadChatAltOutlinedIcon />
                <span>User</span>
              </div>
            </div>
          </div>
          <div className="chat-container__left-menu">
            <div className="chat-container__menu-inner">
              <div className="chat-container__left-menu-inner">
                <AdminPanelSettingsOutlinedIcon />
                <span>Admin Chats</span>
              </div>
              <div className="chat-dropdown">
                <ArrowDropDownCircleOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-container__right"></div>
    </div>
  );
};

export default Chat;
