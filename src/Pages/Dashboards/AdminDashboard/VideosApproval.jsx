import React, { useEffect } from "react";
import { useState } from "react";
import {
  getAllLetters,
  getOrphanages,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import Letters from "./Letters";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import Videos from "./Videos";

const VideosToApprove = () => {
  const [orphanages, setOrphanages] = useState();
  const [letters, setLetters] = useState();

  const getAllOrphanages = async () => {
    let data = await getOrphanages();
    setOrphanages(data);
    // if (orphanages) {
    //   orphanages.forEach(async (orphanage) => {
    //     let allLetters = await getAllLetters(orphanage);
    //   });
    // }
  };
  useEffect(() => {
    getAllOrphanages();
  }, []);
  return (
    <div>
      <div className="orphanage__children-header">
        <div>
          <h1>Video Approvals</h1>
        </div>
        <div className="header-links">
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        {orphanages &&
          orphanages.map((orphanage, index) => (
            <Videos orphanage={orphanage} key={index} />
          ))}
      </div>
    </div>
  );
};

export default VideosToApprove;
