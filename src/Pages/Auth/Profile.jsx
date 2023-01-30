import React, { useContext, useEffect, useState } from "react";
import userAuth, { userIsVerified } from "../../Redux/userAuth";
import AuthContext from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Header from "../../Components/Navbars/Header";
import Footer from "../../Components/Navbars/Footer";
import Verification from "../Dashboards/UserDashboard/Verification";
import ErrorIcon from "@mui/icons-material/Error";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "./Profile.css";
import ProfileBankDetails from "./ProfileMenu/ProfileBankDetails";
import { useSelector } from "react-redux";
import UserSubscriptions from "./ProfileMenu/UserSubscriptions";
import ProfileMenuDesktop from "../Dashboards/ProfileDashboard/ProfileMenuDesktop";
import ProfileCard from "../Dashboards/ProfileDashboard/ProfileCards/ProfileCard";
import Cards from "../Dashboards/ProfileDashboard/ProfileCards/Cards";
import PaymentsCard from "../Dashboards/ProfileDashboard/ProfileCards/PaymentsCard";
import ChatsCard from "../Dashboards/ProfileDashboard/ProfileCards/ChatsCard";
import UpdatesCard from "../Dashboards/ProfileDashboard/ProfileCards/UpdatesCard";
import InboxCard from "../Dashboards/ProfileDashboard/ProfileCards/InboxCard";

const db = getFirestore();

const Profile = () => {
  const { user, userRole, verified, setVerified, stripeCustomerId } =
    useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [closeContainer, setCloseContainer] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [modalBank, setModalBank] = useState(false);
  const [modalBilling, setModalBilling] = useState(false);
  const [modalSubscriptions, setModalSubscriptions] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);

  const { userIsVerified, profileMenu } = useSelector(
    (state) => state.userAuth
  );
  useEffect(() => {
    console.log(user);
    if (user === undefined || user === null) navigate("/error");
  }, []);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log("Sign out error");
      });
  };

  useEffect(() => {
    if (userIsVerified) {
      const timer = setTimeout(() => setCloseContainer(true), 4000);
    }
  }, [userIsVerified]);

  if (!user) {
    return <Navigate to="/" />;
  }

  const verifyAccount = () => {
    navigate("/BankVerification");
  };

  const setDefaultPaymentMethod = () => {};

  return (
    <>
      <Header />
      <div className="profilePage">
        <div className="profilePage-verificationStatus">
          {userIsVerified === false ? (
            <div className="profilePage-verificationWarn">
              <div
                className="verificationWarn-container"
                onClick={verifyAccount}
              >
                <ErrorIcon />
                <span>
                  Verify your account to complete payments and view your
                  dashboard.
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{ display: closeContainer && "none" }}
              className="profilePage-verificationApprove"
            >
              <div className="verificationApprove-container">
                <CheckBoxIcon />
                <span>Your account has been verified.</span>
              </div>
              <div className="approve-closeContainer">
                <DisabledByDefaultIcon
                  onClick={() => setCloseContainer(true)}
                />
              </div>
            </div>
          )}
        </div>

        <ProfileMenuDesktop />

        {userIsVerified && profileMenu === 0 && <ProfileCard />}
        {userIsVerified && profileMenu === 1 && <Cards />}
        {userIsVerified && profileMenu === 2 && <PaymentsCard />}
        {userIsVerified && profileMenu === 3 && <ChatsCard />}
        {userIsVerified && profileMenu === 4 && <UpdatesCard />}
        {userIsVerified && profileMenu === 5 && <InboxCard />}

        {/* <div className="profilePage-header">
          <h1>Profile Page</h1>
        </div>
        <div className="profile-menu">
          <div className="profile-menus">
            <div className="profile-menus__header">
              <h5>Bank Details</h5>
              <OpenInFullIcon />
            </div>
            <div className="profile-menus__modal">
              <ProfileBankDetails modalDisplay={modalBank} />
            </div>
          </div>
          <div className="profile-menus">
            <div className="profile-menus__header">
              <h5>Billing Details</h5>
              <OpenInFullIcon />
            </div>
          </div>
          <div className="profile-menus">
            <div className="profile-menus__header">
              <h5>Personal Details</h5>
              <OpenInFullIcon />
            </div>
          </div>
          <div className="profile-menus">
            <div className="profile-menus__header">
              <h5>Live Subscriptions</h5>
              <OpenInFullIcon />
            </div>
            <div className="profile-menus__modal">
              <UserSubscriptions />
            </div>
          </div>
        </div> */}

        <div className="profile-signout">
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
