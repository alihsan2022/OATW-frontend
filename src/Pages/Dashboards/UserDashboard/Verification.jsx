import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Navbars/Footer";
import Header from "../../../Components/Navbars/Header";
import AuthContext from "../../../Context/AuthContext";
import PaymentDetails from "../../Payments/PaymentDetails";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthProvider } from "../../../Context/AuthProvider";
import Loader from "../../../Components/Loader";

import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import "./verification.css";
import PaymentCollectionForm from "../../Payments/PaymentCollectionForm";
import VerificationPaymentCollection from "./VerificationPaymentCollection";
import userAuth, {
  setCustomerId,
  setVerification,
  userIsVerified,
} from "../../../Redux/userAuth";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./StripeAddressForm/AddressForm";

const db = getFirestore();

const Verification = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const [stripeCustomerId, setStripeCustomerId] = useState("");
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user, verified, updateVerification } = useContext(AuthContext);
  const { userIsVerified } = useSelector((state) => state.userAuth);
  const { billingAddress } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    if (user === undefined || user === null) navigate("/error");
    if (userIsVerified) navigate("/profile");
  }, []);

  useEffect(() => {
    setLoading(false);
    fetch(`https://oatw-server-draz.vercel.app/config`).then(async (res) => {
      const { publishableKey } = await res.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    const checkUserForId = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      let stripeCustomerId;

      if (
        docSnap.data() &&
        docSnap.data().stripeCustomerId &&
        docSnap.data().stripeCustomerId != ""
      ) {
        console.log("Found ID in user.");
        console.log(docSnap.data().stripeCustomerId);
        setStripeCustomerId(docSnap.data().stripeCustomerId);
      } else {
        console.log("Didnt find ID in user. Generating new one.");
        // ID NOT FOUND - generate customer, get ID and save in DB
        fetch(`https://oatw-server-draz.vercel.app/createStripeCustomer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user?.email,
          }),
        }).then(async (result) => {
          var retrievedData = await result.json();
          console.log(retrievedData);
          setClientSecret(retrievedData.clientSecret);
          setIntentId(retrievedData.setupId);
          setStripeCustomerId(retrievedData.customer.id);
          dispatch(setCustomerId(retrievedData.customer.id));
          updateDoc(docRef, {
            stripeCustomerId: retrievedData.customer.id,
          }).catch((error) => {
            console.log(error);
          });
        });
      }
    };

    checkUserForId();
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [stripeCustomerId]);

  const appearance = {
    theme: "night",
    labels: "floating",
  };

  useEffect(() => {
    console.log(JSON.stringify(process.env.SERVER_URL));
  }, []);

  return (
    <>
      <Header />
      <div className="verification-container">
        <div className="verificationContainer-inner">
          <div className="verificationHeader">
            <h1>Account Verification</h1>
            <div className="verification-steps">
              <div className="steps-container">
                <div className="verification-step inactive">
                  <span>1</span>
                </div>
                <span>Register Account</span>
              </div>

              <div className="verification-line"></div>
              <div className="steps-container">
                <div className="verification-step inactive">
                  <span>2</span>
                </div>
                <span>Enter Details</span>
              </div>

              <div className="verification-line"></div>
              <div className="steps-container">
                <div className="verification-step">
                  <span>3</span>
                </div>
                <span>Verify Account</span>
              </div>
            </div>
          </div>
          <div className="verification-body">
            <span>
              To Complete your account verification, please enter valid payment
              details.
              <br />
              <span style={{ fontWeight: "bold" }}>
                No charge will be made.
              </span>
            </span>
          </div>
          {loading && (
            <Elements stripe={stripePromise}>
              <AddressForm />
            </Elements>
          )}

          {loading && (
            <Elements stripe={stripePromise}>
              <VerificationPaymentCollection />
            </Elements>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verification;

export const VerificationSteps = ({ step }) => {
  useEffect(() => {
    console.log(step);
  }, [step]);
  return (
    <>
      <div className="verification-container">
        <div className="verificationContainer-inner">
          <div className="verificationHeader">
            <h1>Account Verification</h1>
            <div className="verification-steps">
              <div className="steps-container">
                <div className={`verification-step ${step != 1 && "inactive"}`}>
                  <span>1</span>
                </div>
                <span>Register Account</span>
              </div>

              <div className="verification-line"></div>
              <div className="steps-container">
                <div className={`verification-step ${step != 2 && "inactive"}`}>
                  <span>2</span>
                </div>
                <span>Enter Details</span>
              </div>

              <div className="verification-line"></div>
              <div className="steps-container">
                <div className={`verification-step ${step != 3 && "inactive"}`}>
                  <span>3</span>
                </div>
                <span>Verify Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
