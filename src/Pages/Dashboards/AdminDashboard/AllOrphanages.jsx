import React from "react";
import { useEffect } from "react";
import { getOrphanages } from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
const AllOrphanages = () => {
  const getAll = async () => {
    await getOrphanages();
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <div className="orphanage__children-header">
        <div>
          <h1>Orphanages</h1>
        </div>
        <div className="header-links">
          <div>
            <GroupAddIcon />
            <span>Add Orphan</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrphanages;
