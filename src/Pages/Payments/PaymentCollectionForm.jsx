import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "./styles.css";
import ErrorIcon from "@mui/icons-material/Error";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PaymentCollectionForm = ({ price, duration }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const { user, stripeCustomerId } = useContext(AuthContext);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await axios.post("/create-subscription", (req, res) => {
      console.log(res);
    });

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: `${window.location.origin}/accountCompletion`,
    //   },
    // });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {price && <PaymentElement id="payment-element" />}
      <div id="payment-form-btn">
        {/* <div className="payment-form__checks">
          <span>Set as default payment:</span>
          <Checkbox checked={checked} onChange={handleChange} {...label} />
        </div> */}
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : `Complete payment of $${price}`}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message">
            <ErrorIcon />
            {message}
          </div>
        )}
      </div>
    </form>
  );
};

export default PaymentCollectionForm;
