import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";

const MainDashboard = () => {
  return (
    <div>
      <div className="orphanage__children-header">
        <div>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-links">
          <div>
            <GroupAddIcon />
            <span>Add User</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Add Orphanage</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Reinstate Orphan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
