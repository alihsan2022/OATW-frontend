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

const country = ["All", "Turkey", "Syria", "Zambia"];
const gender = ["All", "Male", "Female"];

const OrphanSearch = () => {
  const [orphans, setOrphans] = useState([]);
  const [sponsorStatus, setSponsorStatus] = useState(false);
  const [orphansList, setOrphansList] = useState();
  const [filterSponsored, setFilterSponsored] = useState(true);

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

  useEffect(() => {
    console.log(orphansList);
  }, [orphansList]);

  return (
    <>
      <div className="orphanSearch-container">
        <div className="orphanSearch-search">
          {/* <div className="orphanFilter-view">
            <div className="orphanFilter-view-dropdown">
              <Dropdown
                className="orphanFilter-dropdown"
                options={country}
                placeholder="Country"
              />
            </div>
          </div> */}
          <div className="orphanDetails-status">
            <div className="orphanDetails-status__gender">
              <span>Gender:</span>
              <Dropdown
                className="orphanFilter-dropdown"
                options={gender}
                placeholder="Gender"
              />
            </div>
            <div className="orphanDetails-status__status">
              <span>Status:</span>
              <div className="orphanDetails-status__btns">
                <div
                  onClick={() => setFilterSponsored(true)}
                  className={
                    filterSponsored
                      ? "orphanDetails-status__btn-active"
                      : "orphanDetails-status__btn"
                  }
                >
                  Available
                </div>
                <div
                  onClick={() => setFilterSponsored(false)}
                  className={
                    filterSponsored
                      ? "orphanDetails-status__btn"
                      : "orphanDetails-status__btn-active"
                  }
                >
                  Sponsored
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="orphanSearch-results">
          {/* {orphansList &&
            orphansList?.map((orphan, index) => (
              <Orphan key={index} orphan={orphan} />
            ))} */}
          {orphansList &&
            orphansList
              .filter(
                (orphan) => Boolean(orphan?.notSponsored) === filterSponsored
              )
              .map((filteredOrphan, index) => (
                <Orphan key={index} orphan={filteredOrphan} />
              ))}
        </div>
      </div>
    </>
  );
};

export default OrphanSearch;
