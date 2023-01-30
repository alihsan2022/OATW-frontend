import React, { useEffect, useState } from "react";
import {
  editUserRole,
  getAllUsers,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import placeholderImg from "../../../Assets/placeholder-image.png";
import "./styles.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Person from "@mui/icons-material/Person";
import EditUser from "./EditUser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Select from "@mui/material/Select";
import { updateUserRole } from "../../../FirebaseFunctions/AdminUserFunctions";

const AllUsers = ({ users }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [showLabel, setShowLabel] = useState(false);
  const [userData, setUserData] = useState({
    orphanageName: "",
    username: "",
    profilePic: "",
    role: "",
  });
  const [orphanageName, setOrphanageName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("");

  const handleChangeOrphanage = (e) => {
    setOrphanageName(e.target.value);
  };

  const handleChange = (event) => {
    if (event.target.value === "orphanage") {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
    setRole();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSubmit = (e, user) => {
    console.log(orphanageName);
    updateUserRole(user, 10, orphanageName);
    // editUserRole(user, 1, orphanageName);
  };

  const handleEditInfo = (user) => {
    setSelectedUser(user);
    setShowModal(!showModal);
  };

  return (
    <div className="AllUsers">
      <div>
        <div className="orphanage__children-header">
          <div>
            <h1>Users</h1>
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
          </div>
        </div>
        <div className="users">
          {users &&
            users.map((user, index) => (
              <div key={index} className="userInfo">
                <div className="userInfo__profile">
                  {!user?.profilePic ? (
                    <img src={placeholderImg} />
                  ) : (
                    <img src={user.profilePic} />
                  )}
                </div>
                <div className="userInfo__details">
                  <div>
                    <PersonIcon />
                    {!user.userName ? (
                      <div className="userInfo__details-name">
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          No Name Set
                        </span>
                      </div>
                    ) : (
                      <div className="userInfo__details-name">
                        <span>{user.userName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <EmailIcon />
                    <span>{user?.email}</span>
                  </div>
                  <div>
                    <AccessibilityIcon />
                    {user?.userRole === 0 && <span>User</span>}
                    {user?.userRole === 1 && <span>Orphanage</span>}
                    {user?.userRole === 2 && <span>Admin</span>}
                  </div>
                </div>
                <div className="userInfo__btns">
                  <button onClick={() => handleEditInfo(user)}>
                    Edit Info
                  </button>
                  <button>Delete User</button>
                </div>
                <Button onClick={handleClickOpen}>Edit User Role</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                  <DialogTitle>Edit role for the user.</DialogTitle>
                  <DialogContent>
                    <Box
                      component="form"
                      sx={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <Select
                          native
                          value={role}
                          onChange={handleChange}
                          input={
                            <OutlinedInput
                              label="Role"
                              id="demo-dialog-native"
                            />
                          }
                        >
                          <option aria-label="None" value="" />
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="orphanage">Orphanage</option>
                        </Select>
                        {showLabel && (
                          <TextField
                            id="outlined-basic"
                            label="Orphanage Name"
                            variant="outlined"
                            value={orphanageName}
                            onChange={handleChangeOrphanage}
                            style={{
                              marginTop: "10px",
                            }}
                          />
                        )}
                      </FormControl>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => handleSubmit(e, user)}>
                      Edit Role
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
        </div>
      </div>
      <div
        style={{
          display: showModal ? "block" : "none",
        }}
      >
        <EditUser user={selectedUser} />
      </div>
    </div>
  );
};

export default AllUsers;
