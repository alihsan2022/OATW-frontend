import React, { useContext, useEffect } from "react";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useStripe } from "@stripe/react-stripe-js";

const DetailsCollected = () => {
  const { user } = useContext(AuthContext);

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
    console.log(clientSecret);
  }, []);

  const handleSponsorNavigate = () => {
    navigate("/sponsor");
  };

  return (
    <>
      <Header />
      <div className="detailsCollected">
        <h2>Congratulations!</h2>
        <h1>Your order has been completed.</h1>
        <div className="detailsCollected-btns">
          {user ? (
            <button onClick={handleDashboardNavigate} className="btn-dash">
              Go To Dashboard
            </button>
          ) : (
            <button onClick={handleDashboardNavigate} className="btn-dash">
              Register
            </button>
          )}

          <button onClick={handleSponsorNavigate} className="btn-sponsors">
            Sponsor Orphan
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsCollected;
