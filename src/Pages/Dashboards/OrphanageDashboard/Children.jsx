import React, { Component, useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { FileUploader } from "react-drag-drop-files";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import AuthContext from "../../../Context/AuthContext";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./styles.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Loader from "../../../Components/Loader";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CgQuoteO } from "react-icons/cg";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { addOrphanToBin } from "../../../FirebaseFunctions/OrphanFunctions";
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const fileTypes = ["JPG", "PNG", "GIF"];

const Children = () => {
  const db = getFirestore();
  const { user, orphanageName } = useContext(AuthContext);

  const [children, setChildren] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs("2020-08-18T21:11:54"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [birthday, setBirthday] = useState("12/12/2022");
  const [country, setCountry] = useState();
  const [id, setId] = useState(12);
  const [refreshData, setRefreshData] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [childData, setChildData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    areaOfBirth: "",
    areaOfResidence: "",
    country: "",
    dateOfAdmission: "",
    address: "",
    birth: "",
    age: "",
    gender: "",
    educationStatus: "",
    healthCondition: "",
    housing: "",
    contactNumber: "",
    contactNumber2: "",
    fatherName: "",
    motherName: "",
    motherCardNo: "",
    fatherCardNo: "",
    motherStatus: "",
    fatherStatus: "",
    provider: "",
    siblings: "",
    siblingsOver18: "",
    siblingsUnder18: "",
    siblingsSponsored: "",
    updatedAt: "",
    nextUpdateAt: "",
    letters: [],
    videos: [],
    notSponsored: true,
    notDeleted: true,
    orphanageName: orphanageName,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(orphanageName);
  }, [orphanageName]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "birth",
      headerName: "Birthday",
      width: 150,
    },

    { field: "country", headerName: "Country", width: 130 },
    { field: "dateOfAdmission", headerName: "Admission", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "areaOfBirth", headerName: "Area of birth", width: 130 },
    { field: "areaOfResidence", headerName: "Area of residence", width: 130 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "educationStatus", headerName: "Education Status", width: 130 },
    { field: "healthCondition", headerName: "Health Condition", width: 130 },
    { field: "housing", headerName: "Housing", width: 130 },
    { field: "contactNumber", headerName: "Contact No.", width: 130 },
    { field: "contactNumber2", headerName: "Other Contact No.", width: 130 },
    { field: "fatherName", headerName: "Father Name", width: 130 },
    { field: "motherName", headerName: "Mother Name", width: 130 },
    { field: "motherCardNo", headerName: "Mother Card No.", width: 130 },
    { field: "fatherCardNo", headerName: "Father Card No.", width: 130 },
    { field: "motherStatus", headerName: "Mother Status", width: 130 },
    { field: "fatherStatus", headerName: "Father Status", width: 130 },
    { field: "provider", headerName: "Provider", width: 130 },
    { field: "siblings", headerName: "Siblings", width: 130 },
    { field: "siblingsOver18", headerName: "Siblings Over 18", width: 130 },
    { field: "siblingsUnder18", headerName: "Siblings Under 18", width: 130 },

    {
      field: "siblingsSponsored",
      headerName: "Siblings Sponsored",
      width: 130,
    },
  ];

  const getOrphans = async () => {
    const orphansRef = collection(db, `orphanage/${orphanageName}/orphans`);

    const q = query(orphansRef);
    const s = await getDocs(q);
    const arr = [];
    s.docs.map((d) => {
      arr.push(d.data());
    });
    setChildren(arr);
    return arr;
  };

  useEffect(() => {
    getOrphans();
  }, []);

  useEffect(() => {
    console.log(children);
  }, [children]);

  useEffect(() => {
    childData.id = randomNumberInRange(15);
    // childData.updatedAt = new Date(Date.now()).toLocaleString().split(",")[0];
    childData.updatedAt = new Date(new Date().getTime()).toUTCString();
    childData.nextUpdateAt = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ).toUTCString();

    console.log(typeof childData.updatedAt);

    let objectCheck = Object.keys(childData).every((key) => childData[key]);
    if (objectCheck) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [childData]);

  const handleChangeSelection = (selection) => {
    if (selection.length > 0) {
      setSelected(true);
      setSelectedRows(selection);
    } else {
      setSelected(false);
      setSelectedRows([]);
    }
  };

  const deleteRows = () => {
    selectedRows.forEach(async (id) => {
      const orphansRef = collection(db, `orphanage/${orphanageName}/orphans`);

      const q = query(orphansRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const docRef = doc(
          db,
          `orphanage/${orphanageName}/orphans`,
          document.id
        );
        addOrphanToBin(document.data(), document.id, orphanageName);
        deleteDoc(docRef)
          .then(() => {
            console.log("Document deleted");
            getOrphans();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  function randomNumberInRange(length) {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }

    var str = "";
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  useEffect(() => {
    console.log(childData);
  }, [childData]);

  const handleInputChange = ({ currentTarget: input }) => {
    setChildData({ ...childData, [input.name]: input.value });
    console.log(childData);
  };

  const handleGenderChange = (gender) => {
    setChildData({ ...childData, gender: gender.target.value });
  };

  const handleChildAddSubmit = async () => {
    let objectCheck = Object.keys(childData).every((key) => childData[key]);
    if (objectCheck) {
      const allOrphansRef = collection(db, "allOrphans");
      const orphansRef = collection(db, `orphanage/${orphanageName}/orphan`);
      const refTest = doc(db, "orphanage", orphanageName);
      const colRef = collection(refTest, "orphans");
      setFormComplete(true);
      setChildData({
        id: "",
        firstName: "",
        lastName: "",
        areaOfBirth: "",
        areaOfResidence: "",
        country: "",
        dateOfAdmission: "",
        address: "",
        birth: "",
        age: "",
        gender: "",
        educationStatus: "",
        healthCondition: "",
        housing: "",
        contactNumber: "",
        contactNumber2: "",
        fatherName: "",
        motherName: "",
        motherCardNo: "",
        fatherCardNo: "",
        motherStatus: "",
        fatherStatus: "",
        provider: "",
        siblings: "",
        siblingsOver18: "",
        siblingsUnder18: "",
        siblingsSponsored: "",
        updatedAt: "",
        letters: [],
        videos: [],
        notSponsored: true,
        notDeleted: true,
        orphanageName: orphanageName,
      });
      getOrphans();
      await addDoc(colRef, childData, childData.id);
      await addDoc(allOrphansRef, childData, childData.id);
    } else {
      setFormComplete(false);
    }
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const handleFileUpload = async () => {
    const testRef = ref(storage, `orphans/${childData.id}/profile.jpg`);
    await uploadBytes(testRef, selectedFile).then((snapshot) => {
      console.log("Uploaded file");
    });
  };

  return (
    <div className="orphanage__children">
      <div className="orphanage__children-header">
        <div>
          <h1>Children</h1>
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
      <div className="child__row-delete">
        {selected && (
          <div className="child__row-delete-container">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DangerousIcon />

              <span>
                Are you sure you want to delete the selected children?
              </span>
            </div>

            <div>
              <button className="delete__btn" onClick={deleteRows}>
                Delete Children
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="orphanage__table" style={{ height: 400, width: "100%" }}>
        {!children ? (
          <span>Loading data</span>
        ) : (
          <DataGrid
            rows={children}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleChangeSelection}
          />
        )}
      </div>

      <div className="add-child__orphanage">
        {!formComplete && (
          <div className="form-submit-container">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DangerousIcon />

              <span>Please complete the form before submitting.</span>
            </div>
          </div>
        )}
        <div className="add-child__header">
          <h4>Add Child Form</h4>
          <span>Enter the details of the child you would like to add.</span>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                id="outlined-size-small"
                size="small"
                onChange={handleInputChange}
                value={childData.firstName}
                autoComplete="off"
                name="firstName"
              />
              <TextField
                label="Last Name"
                id="outlined-size-small"
                size="small"
                value={childData.lastName}
                onChange={handleInputChange}
                name="lastName"
                autoComplete="off"
                defaultValue="Test"
              />
            </div>
            <div>
              <TextField
                label="Area of Birth"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.areaOfBirth}
                onChange={handleInputChange}
                name="areaOfBirth"
              />
              <TextField
                label="Area of residence"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.areaOfResidence}
                onChange={handleInputChange}
                name="areaOfResidence"
              />
              <TextField
                label="Country"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.country}
                onChange={handleInputChange}
                name="country"
              />

              <TextField
                label="Date of admission"
                id="date"
                size="small"
                type="date"
                autoComplete="off"
                value={childData.dateOfAdmission}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateOfAdmission"
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Address"
                id="fullWidth"
                size="small"
                autoComplete="off"
                value={childData.address}
                onChange={handleInputChange}
                name="address"
              />
              <TextField
                label="Date of birth"
                id="date"
                size="small"
                type="date"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                value={childData.birth}
                onChange={handleInputChange}
                name="birth"
              />
              <TextField
                label="Age"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.age}
                name="age"
                type="number"
              />

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Gender</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Gender"
                  onChange={(e) => handleGenderChange(e)}
                  value={childData.gender}
                  name="gender"
                >
                  <MenuItem value="boy">Boy</MenuItem>
                  <MenuItem value="girl">Girl</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Education Status"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.educationStatus}
                onChange={handleInputChange}
                name="educationStatus"
              />
              <TextField
                label="Health Condition"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.healthCondition}
                onChange={handleInputChange}
                name="healthCondition"
              />
              <TextField
                label="Nature of housing"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                value={childData.housing}
                onChange={handleInputChange}
                name="housing"
              />
              <TextField
                label="Contact Mobile"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.contactNumber}
                name="contactNumber"
              />
              <TextField
                label="Other contact number"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.contactNumber2}
                name="contactNumber2"
              />
              <TextField
                label="Fathers Name"
                id="outlined-size-small"
                size="small"
                onChange={handleInputChange}
                value={childData.fatherName}
                name="fatherName"
              />
              <TextField
                label="Fathers Card Number"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.fatherCardNo}
                name="fatherCardNo"
              />
              <TextField
                label="Mothers Name"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.motherName}
                name="motherName"
              />
              <TextField
                label="Mothers Card Number"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.motherCardNo}
                name="motherCardNo"
              />
              <TextField
                label="Mother Status"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.motherStatus}
                name="motherStatus"
              />
              <TextField
                label="Father Status"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.fatherStatus}
                name="fatherStatus"
              />

              <TextField
                label="Is there a provider?"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.provider}
                name="provider"
              />
              {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Gender</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Is there a provider?"
                  onChange={(e) => handleGenderChange(e)}
                  value={childData.gender}
                  name="gender"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="girl">No</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                label="Number of siblings"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                type="number"
                onChange={handleInputChange}
                value={childData.siblings}
                name="siblings"
              />
              <TextField
                label="Siblings over 18"
                id="outlined-size-small"
                size="small"
                autoComplete="off"
                type="number"
                onChange={handleInputChange}
                value={childData.siblingsOver18}
                name="siblingsOver18"
              />
              <TextField
                label="Siblings under 18"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                value={childData.siblingsUnder18}
                name="siblingsUnder18"
              />
              <TextField
                label="Siblings sponsored?"
                id="outlined-size-small"
                size="small"
                type="number"
                autoComplete="off"
                onChange={handleInputChange}
                name="siblingsSponsored"
                value={childData.siblingsSponsored}
              />
            </div>
          </Box>
          {/* <div className="child__fileUpload">
            <FileUploader
              handleChange={handleFile}
              name="file"
              types={fileTypes}
            />

          </div> */}
        </div>

        <div className="add-child__btn" style={{ marginTop: "20px" }}>
          <div
            className={`add-child__innerBtn-${
              formComplete ? "filled" : "empty"
            }`}
            onClick={handleChildAddSubmit}
          >
            <GroupAddIcon
              style={{
                marginRight: "10px",
              }}
            />
            <span>Submit child details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Children;
