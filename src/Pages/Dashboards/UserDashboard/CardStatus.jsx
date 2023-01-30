import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Navbars/Header";
import Footer from "../../../Components/Navbars/Footer";
import "./CardStatus.css";
import { updateVerificatonStatus } from "../../../FirebaseFunctions/AdminUserFunctions";
import AuthContext from "../../../Context/AuthContext";
import { AuthProvider } from "../../../Context/AuthProvider";
import { signOut, getAuth } from "firebase/auth";
import PaymentStatus from "./PaymentStatus";

const CardStatus = () => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const auth = getAuth();

  const { user, setVerified, updateVerification } = useContext(AuthContext);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleDashboardNavigate = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    );
    const redirectStatus = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );

    setStatus("succeeded");
    console.log(redirectStatus);

    if (redirectStatus === "succeeded") {
      console.log("Confirm account verification.");
    }
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
    if (status === "succeeded") {
      updateVerificatonStatus(user);
      updateVerification();
      handleLogout();
    }
  }, [user]);

  const handleSponsorNavigate = () => {
    navigate("/sponsor");
  };

  const makeCardDefault = async () => {};

  return (
    <>
      <Header />
      <div className="accountVerification-result">
        {status === "succeeded" && (
          <div className="result succeeded">
            <div>
              <h1>Congratulations.</h1>
              <h5>Your account has been successfuly verified.</h5>
            </div>
            <div></div>
            <div className="result-buttons">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/sponsor")}>
                Sponsor an Orphan
              </button>
            </div>
          </div>
        )}
        {status === "processing" && <span>Processing</span>}
        {status === "requires_payment_method" && (
          <span>Failed to process. Please try another payment method.</span>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CardStatus;
