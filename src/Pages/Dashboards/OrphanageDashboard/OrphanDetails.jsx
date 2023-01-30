import React, { useCallback, useState, useEffect, useContext } from "react";
import placeholder from "../../../Assets/placeholder-image.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dropzone from "react-dropzone";
import ErrorIcon from "@mui/icons-material/Error";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import {
  orphanDetailsUpdate,
  uploadProfilePhoto,
  uploadOrphanLetter,
  getOrphanLetters,
  getLetters,
  uploadVideo,
  getVideos,
} from "../../../FirebaseFunctions/OrphanFunctions";
import { useDropzone } from "react-dropzone";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import UpdateIcon from "@mui/icons-material/Update";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EmailIcon from "@mui/icons-material/Email";
import "./styles.css";
import AuthContext from "../../../Context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "14px",
};

const largeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "14px",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  flexDirection: "column",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const OrphanDetails = ({ orphan, handleUpdate }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const { orphanageName } = useContext(AuthContext);
  const [newOrphanData, setNewOrphanData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    educationStatus: "",
    healthCondition: "",
    areaOfBirth: "",
    fatherStatus: "",
    motherStatus: "",
  });

  const [open, setOpen] = React.useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [letterFiles, setLetterFiles] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [openLetterUpload, setOpenLetterUpload] = React.useState(false);
  const [openLetterView, setOpenLetterView] = React.useState(false);
  const [allLetters, setAllLetters] = useState([]);
  const [fetchedLetters, setFetchedLetters] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openVideoUpload, setOpenVideoUpload] = React.useState(false);
  const [openVideoView, setOpenVideoView] = React.useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const handleOpenVideoView = async () => {
    setOpenVideoView(true);
    await getAllVideos();
  };
  const [nextUpdateDue, setNextUpdateDue] = useState(0);
  const handleCloseVideoView = () => setOpenVideoView(false);

  const handleOpenVideoUpload = () => setOpenVideoUpload(true);
  const handleCloseVideoUpload = () => {
    setOpenVideoUpload(false);
    setFileNames([]);
    setFiles([]);
    setSuccess(false);
    setFail(false);
  };

  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24;
    const days = Math.round(
      (new Date(orphan.nextUpdateAt) - new Date()) / oneDay
    );
    console.log("Days remaining" + days);
    setNextUpdateDue(days);
  }, [newOrphanData]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="thumb__container">
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt=""
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
      <span>{file.name}</span>
    </div>
  ));

  const handleOpenLetterUpload = () => {
    setOpenLetterUpload(true);
  };
  const handleCloseLetterUpload = () => {
    setOpenLetterUpload(false);
    setFileNames([]);
    setFiles([]);
    setSuccess(false);
    setFail(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFileNames([]);
    setFiles([]);
    setSuccess(false);
    setFail(false);
  };

  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));
    console.log(acceptedFiles);
  };

  const handleProfilePicUpload = async () => {
    if (fileNames) console.log(fileNames[0]);

    try {
      let profilePicUrl = await uploadProfilePhoto(
        files[0],
        orphan.id,
        "test",
        orphanageName
      );
      if (
        profilePicUrl != null ||
        profilePicUrl != undefined ||
        profilePicUrl != ""
      ) {
        setSuccess(true);
        setFail(false);
        console.log("Image uploaded Successfully");
      } else {
        setSuccess(false);
        setFail(true);
      }
    } catch (error) {
      console.log(error.message);
      setSuccess(false);
      setFail(true);
    }
  };

  useEffect(() => {
    console.log(orphan);
  }, [orphan]);

  const handleLetterUpload = async () => {
    if (files) console.log(files[0]);

    for (let i = 0; i < files.length; i++) {
      try {
        let letterUrl = await uploadOrphanLetter(
          files[i],
          orphan.id,
          orphanageName,
          orphan.firstName,
          orphan.lastName
        );
        if (letterUrl != null || letterUrl != undefined || letterUrl != "") {
          setSuccess(true);
          setFail(false);
          console.log("Letter uploaded Successfully");
        } else {
          setSuccess(false);
          setFail(true);
        }
      } catch (error) {
        console.log(error.message);
        setSuccess(false);
        setFail(true);
      }
    }
  };

  const handleInputChange = ({ currentTarget: input }) => {
    setNewOrphanData({ ...newOrphanData, [input.name]: input.value });
  };

  const cleanUpObject = (object) => {
    let lastUpdatedAt = orphan.updatedAt;
    lastUpdatedAt = new Date(new Date().getTime()).toUTCString();
    let nextUpdateAt = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ).toUTCString();

    let newDateData = {
      updatedAt: lastUpdatedAt,
      nextUpdateAt: nextUpdateAt,
    };

    Object.assign(object, newDateData);

    let newData = object;
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        var value = newData[key];
        if (value === null || value === undefined || value === "") {
          delete newData[key];
        }
      }
    }
    return newData;
  };

  const handleOrphanUpdate = async () => {
    let newData = cleanUpObject(newOrphanData);
    try {
      await orphanDetailsUpdate(newData, orphan.id, orphanageName);
      setEditSuccess(true);
      setEditFail(false);
    } catch (error) {
      setEditFail(true);
      setEditSuccess(false);
    }
    // handleUpdate();
  };

  const getLetterData = async () => {
    let letters = await getLetters(orphan.id, orphanageName);
    setAllLetters(letters);
    // setAllLetters(letters);
    // setLoaded(true);
  };

  const handleOpenLetterView = async () => {
    setOpenLetterView(true);
    await getLetterData();
  };

  const handleCloseLetterView = () => {
    setOpenLetterView(false);
    setLoaded(false);
  };

  useEffect(() => {
    getLetterData();
  }, []);

  const handleVideoUpload = async () => {
    for (let i = 0; i < files.length; i++) {
      try {
        let videoUrl = await uploadVideo(
          files[i],
          orphan.id,
          orphanageName,
          orphan.firstName,
          orphan.lastName
        );
        if (videoUrl != null || videoUrl != undefined || videoUrl != "") {
          setSuccess(true);
          setFail(false);
          console.log("Video uploaded Successfully");
        } else {
          setSuccess(false);
          setFail(true);
        }
      } catch (error) {
        console.log(error.message);
        setSuccess(false);
        setFail(true);
      }
    }
  };

  const getAllVideos = async () => {
    let data = await getVideos(orphan.id);
    setAllVideos(data);
  };

  const handleLetterDelete = (letter) => {
    console.log(letter);
  };

  return (
    <div>
      <div className="orphan-details">
        <div className="orphan-details__container">
          <div className="orphan-details__img">
            {orphan?.profilePic ? (
              <img src={orphan.profilePic} />
            ) : (
              <img src={placeholder} />
            )}
          </div>
          <div className="orphan-details__info">
            <span>
              {orphan.firstName} {orphan.lastName}
            </span>
          </div>
          <div className="orphan-btns">
            <div className="orphan-btn__inner">
              <div className="orphan-addPhoto" onClick={handleOpen}>
                <AddAPhotoIcon />
                {orphan?.profilePic ? (
                  <span>Edit Photo</span>
                ) : (
                  <span>Add Photo</span>
                )}
              </div>
              <div className="orphan-videoUpload" onClick={handleOpenVideoView}>
                <VideoCameraBackIcon />
                <span>View Videos</span>
              </div>
              <div
                className="orphan-letterUpload"
                onClick={handleOpenLetterView}
              >
                <EmailIcon />
                <span>View Letters</span>
              </div>
            </div>
            <div className="orphan-btn__inner">
              <div className="orphan-editInfo" onClick={handleOpenEdit}>
                <EditIcon />
                <span>Edit Info</span>
              </div>
              <div
                className="orphan-videoUpload"
                onClick={handleOpenVideoUpload}
              >
                <VideoCameraBackIcon />
                <span>Upload Video</span>
              </div>
              <div
                className="orphan-letterUpload"
                onClick={handleOpenLetterUpload}
              >
                <EmailIcon />
                <span>Upload Letters</span>
              </div>
            </div>
          </div>
          <div className="orphan__timeUpdate">
            <div className="timeUpdate__container">
              <div>
                <UpdateIcon />
              </div>
              <div>
                <span>Next Update due in:</span>
                {nextUpdateDue >= 20 && (
                  <p style={{ color: "lightgreen" }}>{nextUpdateDue} days</p>
                )}
                {nextUpdateDue >= 10 && nextUpdateDue < 20 && (
                  <p style={{ color: "orange" }}>{nextUpdateDue} days</p>
                )}
                {nextUpdateDue > 0 && nextUpdateDue < 10 && (
                  <p style={{ color: "red" }}>{nextUpdateDue} days</p>
                )}
                {nextUpdateDue === 0 && (
                  <p style={{ color: "red" }}>Your orphan update is due now!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Upload profile photo for orphan: {orphan.firstName}{" "}
                {orphan.lastName}
              </Typography>

              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
              {files.length > 0 && (
                <div
                  className="upload__file-btn"
                  onClick={handleProfilePicUpload}
                >
                  <DriveFolderUploadIcon />
                  <span>Upload</span>
                </div>
              )}
              {success && (
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
                    <span>Image has been uploaded.</span>
                  </div>
                </div>
              )}
              {fail && (
                <div className="upload-fail-container">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ErrorIcon />
                    <span>Image failed to upload. Try again.</span>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEdit}
          onClose={handleCloseEdit}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openEdit}>
            <Box sx={style}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Edit information for orphan: {orphan.firstName}{" "}
                {orphan.lastName}
              </Typography>
              <div className="orphan__updateContainer">
                <div className="orphan__update-left">
                  <div className="update__item">
                    <span>First name:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.firstName}
                      name="firstName"
                    />
                  </div>
                  <div className="update__item">
                    <span>Age:</span>
                    <input
                      onChange={handleInputChange}
                      type="number"
                      placeholder={orphan.age}
                      name="age"
                    />
                  </div>
                  <div className="update__item">
                    <span>Area of birth:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.areaOfBirth}
                      name="areaOfBirth"
                    />
                  </div>
                </div>
                <div className="orphan__update-right">
                  <div className="update__item">
                    <span>Last name:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.lastName}
                      name="lastName"
                    />
                  </div>
                  <div className="update__item">
                    <span>Education Status:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.educationStatus}
                      name="educationStatus"
                    />
                  </div>
                  <div className="update__item">
                    <span>Father Status:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.fatherStatus}
                      name="fatherStatus"
                    />
                  </div>
                </div>
                <div className="orphan__update-right">
                  <div className="update__item">
                    <span>Gender:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.gender}
                      name="gender"
                    />
                  </div>
                  <div className="update__item">
                    <span>Health condition:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.healthCondition}
                      name="healthCondition"
                    />
                  </div>
                  <div className="update__item">
                    <span>Mother status:</span>
                    <input
                      onChange={handleInputChange}
                      placeholder={orphan.motherStatus}
                      name="motherStatus"
                    />
                  </div>
                </div>
              </div>
              <div className="upload__file-btn" onClick={handleOrphanUpdate}>
                <DriveFolderUploadIcon />
                <span>Update</span>
              </div>
              {editFail && (
                <div className="upload-fail-container">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ErrorIcon />
                    <span>Unable to upload information. Try again.</span>
                  </div>
                </div>
              )}
              {editSuccess && (
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
                    <span>Information has been updated.</span>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openVideoUpload}
          onClose={handleCloseVideoUpload}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openVideoUpload}>
            <Box sx={style}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Upload video for orphan: {orphan.firstName} {orphan.lastName}
              </Typography>
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag 'n' drop video files here, or click to select files
                  </p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
              {files.length > 0 && (
                <div className="upload__file-btn" onClick={handleVideoUpload}>
                  <DriveFolderUploadIcon />
                  <span>Upload</span>
                </div>
              )}
              {success && (
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
                    <span>Video has been uploaded.</span>
                  </div>
                </div>
              )}
              {fail && (
                <div className="upload-fail-container">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ErrorIcon />
                    <span>Image failed to upload. Try again.</span>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openLetterUpload}
          onClose={handleCloseLetterUpload}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLetterUpload}>
            <Box sx={style}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Upload letter for orphan: {orphan.firstName} {orphan.lastName}
              </Typography>
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
              {files.length > 0 && (
                <div className="upload__file-btn" onClick={handleLetterUpload}>
                  <DriveFolderUploadIcon />
                  <span>Upload</span>
                </div>
              )}
              {success && (
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
                    {files.length > 1 ? (
                      <span>Letters have been uploaded.</span>
                    ) : (
                      <span>
                        Letter has been uploaded. Please wait for approval.
                      </span>
                    )}
                  </div>
                </div>
              )}
              {fail && (
                <div className="upload-fail-container">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ErrorIcon />
                    <span>Letter failed to upload. Try again.</span>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openLetterView}
          onClose={handleCloseLetterView}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLetterView}>
            <Box sx={largeStyle}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Viewing all approved letters for: {orphan.firstName}
                {orphan.lastName}
              </Typography>
              <div className="file__section">
                {orphan?.letters
                  .filter((letter) => letter.status == true)
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
                          className="file__download"
                          onClick={() => window.open(letter.urlDownload)}
                        >
                          <CloudDownloadIcon />
                        </div>
                        <div
                          className="file__download delete"
                          onClick={() => handleLetterDelete(letter)}
                        >
                          <DeleteForeverIcon />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div
                className="upload__btn"
                onClick={() => {
                  setOpenLetterView(false);
                  setOpenLetterUpload(true);
                }}
              >
                <span>Upload a letter</span>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openVideoView}
          onClose={handleCloseVideoView}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openVideoView}>
            <Box sx={style}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
                id="spring-modal-title"
                variant="h5"
                component="h2"
              >
                Viewing all videos for: {orphan.firstName} {orphan.lastName}
              </Typography>
              <div className="file__section">
                {orphan?.videos
                  .filter((video) => video.status == true)
                  .map((video, index) => (
                    <div className="file__container">
                      <div className="file__name">
                        <OndemandVideoIcon />
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            wordBreak: "break-all",
                            whiteSpace: "normal",
                          }}
                        >
                          {video.fileName}
                        </p>
                      </div>
                      <div>
                        <div
                          className="file__download"
                          onClick={() => window.open(video.urlDownload)}
                        >
                          <CloudDownloadIcon />
                        </div>
                        <div>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default OrphanDetails;
