import React, { useEffect, useState } from "react";
import {
  getAllLetters,
  getAllVideos,
  letterApproval,
  removeLetterFromApprovalList,
  videoApproval,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

import VideosApproval from "./VideosApproval";

const Videos = ({ orphanage }) => {
  const [videos, setVideos] = useState();
  const [approveSuccess, setApproveSuccess] = useState(false);
  const getVideos = async () => {
    let allVideos = await getAllVideos(orphanage);
    setVideos(allVideos);
    console.log(allVideos);
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  const handleVideoApproval = async (video) => {
    try {
      await videoApproval(true, video, orphanage);
      setApproveSuccess(!approveSuccess);
      getVideos();
    } catch (error) {
      setApproveSuccess(false);
      console.log(error.message);
    }
  };

  return (
    <div className="letters__section">
      <div>
        <p>Videos to approve: {orphanage}</p>
      </div>
      <div className="letters__container">
        {videos &&
          videos
            .filter((video) => video.status === false)
            .map((video, index) => (
              <div className="file__container" key={index}>
                <div className="file__name">
                  <SmartDisplayIcon />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      wordWrap: "break-word",
                      width: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    {video.fileName}
                  </span>
                </div>
                <div className="file__actions">
                  <div
                    className="letter__download"
                    onClick={() => window.open(video.urlDownload)}
                  >
                    <CloudDownloadIcon />
                    <span>View Video</span>
                  </div>
                </div>
                {video.status === false && (
                  <div className="file__actions">
                    <div className="file__download">
                      <CancelTwoToneIcon style={{ color: "white" }} />
                    </div>
                    <div
                      className="file__download delete"
                      onClick={() => handleVideoApproval(video)}
                    >
                      <CheckCircleTwoToneIcon style={{ color: "white" }} />
                    </div>
                  </div>
                )}

                <div className="letter__info">
                  <div className="letter__status">
                    {video.status === false ? (
                      <span>Status: Waiting for approval</span>
                    ) : (
                      <span>Approved</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
      {approveSuccess && (
        <div className="upload-success-container">
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBoxIcon />
            <span>Video has been approved.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
