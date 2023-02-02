import React, { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCollectionForm from "./PaymentCollectionForm";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../../Components/Navbars/Header";
import Footer from "../../Components/Navbars/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import userAuth, { userIsVerified } from "../../Redux/userAuth";
import { useSelector } from "react-redux";

const PaymentDetails = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [load, setLoad] = useState("");
  const { userIsVerified } = useSelector((state) => state.userAuth);
  const { user, verified } = useContext(AuthContext);
  const { cartSponsorItems, donationItems } = useSelector(
    (state) => state.cart
  );

  let data = {
    cartSponsorItems,
    donationItems,
  };

  // const location = useLocation();
  // const data = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    // if (!data) navigate("/sponsor");
    if (!userIsVerified) navigate("/profile");
  }, []);

  useEffect(() => {
    fetch("https://oatw-server-draz.vercel.app/config").then(async (res) => {
      const { publishableKey } = await res.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("https://oatw-server-draz.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  useEffect(() => {
    if (!data) navigate("/sponsor");
  }, []);

  const appearance = {
    theme: "night",
    labels: "floating",
  };

  return (
    <>
      <Header />
      <div className="paymentDetails-header">
        <h1>Complete payment details.</h1>
      </div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <PaymentCollectionForm
            price={data.price}
            duration={data.sponsorshipDuration}
          />
        </Elements>
      )}
      <Footer />
    </>
  );
};

export default PaymentDetails;
