import React, { useEffect } from "react";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import { useLocation, useNavigate } from "react-router-dom";

const BillingDetails = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <div className="billingDetails">
        <h1>
          Enter billing details to process your sponsorship for{" "}
          {data.orphanData.firstName}.
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default BillingDetails;
