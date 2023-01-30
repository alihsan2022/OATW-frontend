import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  getOrphansList,
  orphanDetailsUpdate,
} from "../../../FirebaseFunctions/OrphanFunctions";
import OrphanDetails from "./OrphanDetails";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DriveFolderUploadTwoToneIcon from "@mui/icons-material/DriveFolderUploadTwoTone";
import Orphan from "../../Sponsor/Orphan";
import AuthContext from "../../../Context/AuthContext";
import BrowserUpdatedTwoToneIcon from "@mui/icons-material/BrowserUpdatedTwoTone";
import { CSVLink, CSVDownload } from "react-csv";
import CsvDownloadButton from "react-json-to-csv";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ToastContainer, toast } from "react-toastify";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import "react-toastify/dist/ReactToastify.css";

import Papa from "papaparse";

const ViewAllOrphans = () => {
  const [orphanList, setOrphanList] = useState();
  const [newOrphanList, setNewOrphanList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState();
  const [success, setSuccess] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [downloadableCSV, setDownloadableCSV] = useState();
  const [fail, setFail] = useState(false);

  const { orphanageName } = useContext(AuthContext);

  const notify = (message) => toast(message);

  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  const getOrphansFromDb = async (orphanageName) => {
    let data = await getOrphansList(orphanageName);
    setOrphanList(data);

    return data;
  };
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getOrphansFromDb(orphanageName);
  }, []);

  useEffect(() => {
    console.log("found");
    if (orphanList) {
      let downloadableCSV = orphanList;
      downloadableCSV = downloadableCSV?.map(
        ({ letters, videos, profilePic, ...rest }) => {
          return rest;
        }
      );
      setDownloadableCSV(downloadableCSV);
    }
  }, [orphanList]);

  useEffect(() => {
    console.log(downloadableCSV);
  }, [downloadableCSV]);

  const handleFilter = (e) => {
    setSearchValue(e.toLowerCase());
  };

  const handleOrphanUpdate = () => {
    getOrphansFromDb(orphanageName);
    console.log("Updating");
  };

  const handleFileUpdate = () => {
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        updateOrphans(results);
      },
    });
  };

  const updateOrphans = ({ data }) => {
    data = data.map(({ letters, ...rest }) => {
      return rest;
    });

    data = data.map(({ videos, ...rest }) => {
      return rest;
    });

    console.log(data);
    setSuccess(false);
    setFail();
    try {
      const update = data.map(async (orphan, key) => {
        let lastUpdatedAt = orphan.updatedAt;
        lastUpdatedAt = new Date(new Date().getTime()).toUTCString();
        let nextUpdateAt = new Date(
          new Date().getTime() + 30 * 24 * 60 * 60 * 1000
        ).toUTCString();

        let newDateData = {
          updatedAt: lastUpdatedAt,
          nextUpdateAt: nextUpdateAt,
        };

        orphan.updatedAt = lastUpdatedAt;
        orphan.nextUpdateAt = nextUpdateAt;

        try {
          await orphanDetailsUpdate(orphan, orphan.id, orphan.orphanageName);
        } catch (error) {
          setFail(true);
          throw error;
        }
      });
    } catch (error) {
      notify("Error. Please upload file again.");
    }
    if (fail) {
      notify("Error. Please upload file again.");
    }
    if (fail === false) {
      notify("Orphan details have been updated.");
    }
  };

  const downloadTemplate = () => {
    window.location.href =
      "https://firebasestorage.googleapis.com/v0/b/orphansaroundtheworld-110e1.appspot.com/o/orphanage-template.csv?alt=media&token=33169160-17a6-401a-891a-0d7658a03b63";
  };

  return (
    <div className="all-orphans__view">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />

      <div className="orphanage__children-header">
        <div>
          <h1>Orphans List</h1>
        </div>
        <div className="header-links">
          <div>
            <GroupAddIcon />

            <span>Add Child</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </div>
      </div>
      <div className="orphan-search__container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="orphan__bulk-container">
            <div className="orphan__bulk-update">
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileUpload(e)}
              />
              <DriveFolderUploadTwoToneIcon />
              {uploadedFile ? (
                <span
                  style={{ cursor: "pointer", color: "green" }}
                  onClick={handleFileUpdate}
                >
                  Update from {uploadedFile.name}
                </span>
              ) : (
                <span>Bulk Update</span>
              )}
            </div>
            <div className="orphan__bulk-update">
              <BrowserUpdatedTwoToneIcon />
              {downloadableCSV && (
                <CsvDownloadButton
                  className="template-download"
                  filename="orphanage-template.csv"
                  data={downloadableCSV}
                  style={{
                    //pass other props, like styles

                    display: "inline-block",
                    cursor: "pointer",
                    fontSize: "10px",
                    border: "none",
                    backgroundColor: "white",
                  }}
                />
              )}
            </div>
            <div className="orphan__bulk-template" onClick={downloadTemplate}>
              <CloudDownloadTwoToneIcon />
              <span>Download Template</span>
            </div>
          </div>

          <div className="orphan-search">
            <input
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Search for orphan using name"
              accept=".csv"
            />
            <PersonSearchIcon />
          </div>
        </div>

        <div className="orphanList">
          {orphanList &&
            orphanList
              .filter((orphan) =>
                orphan?.firstName?.toLowerCase().includes(searchValue)
              )
              .map((filteredOrphan) => (
                <OrphanDetails
                  handleUpdate={handleOrphanUpdate}
                  orphan={filteredOrphan}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrphans;
