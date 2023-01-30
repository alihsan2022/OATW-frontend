import React from "react";
import Verification from "./Verification";

const UserDashboard = ({ view }) => {
  return <div style={{}}>{view === 0 && <Verification />}</div>;
};

export default UserDashboard;
