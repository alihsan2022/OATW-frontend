import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import Children from "./Children";
import Photos from "./Photos";
import Details from "./Details";
import "./styles.css";
import ViewAllOrphans from "./ViewAllOrphans";
import Chat from "./Chat";

const OrphanageDashboard = ({ view }) => {
  return (
    <div style={{}}>
      {view === 0 && <Children />}
      {view === 4 && <Details />}
      {view === 1 && <ViewAllOrphans />}
      {view === 3 && <Chat />}
    </div>
  );
};

export default OrphanageDashboard;
