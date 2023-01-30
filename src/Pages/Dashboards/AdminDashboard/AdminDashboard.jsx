import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  getOrphanages,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import { getAllOrphans } from "../../../FirebaseFunctions/AdminOrphansFunctions";
import AllOrphanages from "./AllOrphanages";
import AllOrphans from "./AllOrphans";
import AllUsers from "./AllUsers";
import LettersApproval from "./LettersApproval";
import Loader from "../../../../src/Components/Loader";
import MainDashboard from "./MainDashboard";
import Chat from "../AdminDashboard/Chat";
import VideosApproval from "../AdminDashboard/VideosApproval";

const AdminDashboard = ({ view }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let data = await getAllUsers();
    setUsers(data);
  };

  return (
    <div>
      {view === 0 && <MainDashboard />}
      {view === 1 && <AllOrphanages />}
      {view === 2 && <AllUsers users={users} />}
      {view === 3 && <LettersApproval />}
      {view === 5 && <Chat />}
      {view === 6 && <VideosApproval />}
      {view === 4 && <AllOrphans />}
    </div>
  );
};

export default AdminDashboard;
