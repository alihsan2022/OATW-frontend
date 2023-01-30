import React, { useEffect } from "react";
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
import Select from "@mui/material/Select";
const EditUser = ({ user }) => {
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="EditUser">
      <div>
        <h4>Edit User Info: {user?.userName}</h4>
      </div>
      <div className="EditUser__info">
        <div>
          <span>Username</span>
          <input placeholder="Username" />
        </div>
        <div>
          <span>Profile Picture</span>
          <input placeholder="Profile Picture URL" />
        </div>
        <div>
          <span>Username</span>
          <input placeholder="Username" />
        </div>
      </div>

      <div className="EditUser__btn">
        <button>Submit</button>
      </div>
    </div>
  );
};

export default EditUser;
