import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import firebase from "firebase/app";
import "./Sponsor.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Orphan from "./Orphan";
import Header from "../../Components/Navbars/Header";
// import { getAllOrphans } from "../../FirebaseFunctions/OrphanFunctions";

const country = ["Turkey", "Syria", "Zambia"];
const gender = ["Male", "Female"];

const OrphanSearch = () => {
  const [orphans, setOrphans] = useState([]);
  const [sponsorStatus, setSponsorStatus] = useState(false);
  const [orphansList, setOrphansList] = useState();

  const auth = getAuth();
  const db = getFirestore();

  const getData = async () => {
    let data = [];
    try {
      const colRef = collection(db, "allOrphans");
      const docSnap = await getDocs(colRef);
      docSnap.forEach((doc) => {
        data.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }

    setOrphansList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="orphanSearch-container">
        <div className="orphanSearch-search">
          <div className="orphanFilter-view">
            <span>View by:</span>
            <Dropdown options={country} placeholder="Country" />
            <Dropdown options={gender} placeholder="Gender" />
          </div>
          <div className="orphanDetails-status">
            <span>Sponsorship Status:</span>
            <div className="orphanDetails-status__btns">
              <div>Available</div>
              <div>Sponsored</div>
            </div>
          </div>
        </div>
        <div className="orphanSearch-results">
          {orphansList &&
            orphansList?.map((orphan, index) => (
              <Orphan key={index} orphan={orphan} />
            ))}
        </div>
      </div>
    </>
  );
};

export default OrphanSearch;
