import React, { useEffect, useState } from "react";
import {
  getAllLetters,
  letterApproval,
  removeLetterFromApprovalList,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import emailjs from "@emailjs/browser";

import LettersApproval from "./LettersApproval";
const Letters = ({ orphanage }) => {
  const [letters, setletters] = useState();
  const [approveSuccess, setApproveSuccess] = useState(false);
  const getLetters = async () => {
    let allLetters = await getAllLetters(orphanage);
    setletters(allLetters);
  };

  useEffect(() => {
    getLetters();
  }, []);

  useEffect(() => {
    console.log(letters);
  }, [letters]);

  const handleLetterApprove = async (letter) => {
    try {
      await letterApproval(true, letter, orphanage);
      setApproveSuccess(!approveSuccess);
      getLetters();
    } catch (error) {
      setApproveSuccess(false);
      console.log(error.message);
    }
  };

  const handleLetterDecline = (letter) => {
    console.log(letter);
  };

  return (
    <div className="letters__section">
      <div>
        <p>Letters to approve: {orphanage}</p>
      </div>
      <div className="letters__container">
        {letters &&
          letters
            .filter((letter) => letter.status === false)
            .map((letter, index) => (
              <div className="file__container">
                <div className="file__name">
                  <FileCopyIcon />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {letter.fileName}
                  </span>
                </div>
                <div className="file__actions">
                  <div
                    className="letter__download"
                    onClick={() => window.open(letter.urlDownload)}
                  >
                    <CloudDownloadIcon />
                    <span>View File</span>
                  </div>
                </div>
                {letter.status === false && (
                  <div className="file__actions">
                    <div
                      className="file__download"
                      onClick={() => handleLetterApprove(letter)}
                    >
                      <CancelTwoToneIcon style={{ color: "white" }} />
                    </div>
                    <div
                      className="file__download delete"
                      onClick={() => handleLetterApprove(letter)}
                    >
                      <CheckCircleTwoToneIcon style={{ color: "white" }} />
                    </div>
                  </div>
                )}

                <div className="letter__info">
                  <div className="letter__status">
                    {letter.status === false ? (
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
            <span>Letter has been approved.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letters;
