import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import ErrorIcon from "@mui/icons-material/Error";
import "./verification.css";
import { AuthProvider } from "../../../Context/AuthProvider";
import AuthContext from "../../../Context/AuthContext";
import userAuth, { setVerification } from "../../../Redux/userAuth";
import axios from "axios";
import e from "cors";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";

const db = getFirestore();

const VerificationPaymentCollection = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const { stripeCustomerId } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const updateUserVerification = async () => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    updateDoc(docRef, {
      userVerified: true,
    }).catch((error) => {
      console.log(error);
    });

    dispatch(setVerification());
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsProcessing(true);

  //   const { error } = await stripe.confirmSetup({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: `${window.location.origin}/verificationStatus`,
  //     },
  //   });

  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occured.");
  //   }

  //   setIsProcessing(false);
  // };

  const createSubscription = async (e) => {
    e.preventDefault();
    console.log(stripeCustomerId);
    setIsProcessing(true);
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      setProcessing(true);

      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement("card"),
        type: "card",
      });

      const attachPaymentMethod = await axios
        .post(`https://oatw-server-draz.vercel.app/attachPaymentMethod`, {
          customerId: stripeCustomerId,
          paymentMethodId: paymentMethod.paymentMethod.id,
        })
        .then(() => {
          console.log("Payment method attached");
        })
        .catch((error) => {
          console.log(error);
          setIsVerified(false);
          setError("Unable to process card.");
        });

      const makeCardDefault = await axios
        .post("https://oatw-server-draz.vercel.app/makeCardDefault", {
          id: stripeCustomerId,
          paymentMethodId: paymentMethod.paymentMethod.id,
        })
        .then(() => {
          console.log("Payment default attached");
          setIsVerified(true);
        })
        .catch((error) => {
          console.log(error);
          setIsVerified(false);
          setError("Unable to process card.");
        });
      setProcessing(false);
      setIsProcessing(false);
      if (isVerified != false) {
        setIsVerified(true);
        updateUserVerification();
      }
      console.log(isVerified);
    } catch (error) {
      setProcessing(false);
      setIsProcessing(false);
      setIsVerified(false);
      setError("Unable to process card.");
      console.log(isVerified);
    }
  };

  useEffect(() => {
    if (isVerified === true) {
      updateUserVerification();
    }
  }, [isVerified]);

  const cardStyle = {
    style: {
      base: {
        iconColor: "black",
        color: "#32325d",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const appearance = {
    theme: "night",
    labels: "floating",
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <>
      {!isVerified ? (
        <form id="payment-form">
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          {isProcessing ? (
            <button style={{ cursor: "not-allowed" }} disabled id="btn-submit">
              <span>Verifying...</span>
            </button>
          ) : (
            <button onClick={createSubscription} id="btn-submit">
              <span>Verify account.</span>
            </button>
          )}

          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              <div>
                <ErrorIcon />
                <span>{error}</span>
              </div>
            </div>
          )}
        </form>
      ) : (
        navigate("/profile")
      )}
    </>
  );
};

export default VerificationPaymentCollection;
