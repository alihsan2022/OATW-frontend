import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAuth from "../../../Redux/userAuth";
import MasterCard from "../../../Assets/master-card.png";
import Visa from "../../../Assets/visa.png";
const ProfileBankDetails = (modalDisplay) => {
  const [loaded, setLoaded] = useState(false);
  const { stripeCustomerId } = useSelector((state) => state.userAuth);
  const [paymentMethods, setPaymentMethods] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const retrievePaymentDetails = async () => {
      const response = await axios
        .post("https://oatw-server-draz.vercel.app/retrieveCardDetails", {
          customerId: stripeCustomerId,
        })
        .then((response) => {
          setPaymentMethods(response.data.paymentMethods.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    retrievePaymentDetails();
  }, [stripeCustomerId]);

  useEffect(() => {
    console.log(paymentMethods);
  }, [paymentMethods]);

  return (
    <div style={{ display: modalDisplay ? "block" : "none" }}>
      {paymentMethods ? (
        <div className="paymentMethod__cards">
          {paymentMethods?.map((card, index) => (
            <div
              className={
                card.id.slice(0, 3) === "pm_"
                  ? "paymentMethod__card active"
                  : "paymentMethod__card"
              }
              key={index}
            >
              <div className="paymentMethod__cardNumber">
                {/* <span className="paymentMethod__cardBrand">{card.card.brand}</span> */}

                {card.card.brand === "visa" && (
                  <img className="cardImage" src={Visa} alt="Visa" />
                )}
                {card.card.brand === "mastercard" && (
                  <img
                    className="cardImage"
                    src={MasterCard}
                    alt="Mastercard"
                  />
                )}
                <span>xxxx xxxx xxxx {card.card.last4}</span>
              </div>
              <div className="paymentMethod__card-expiry">
                <div className="paymentMethod__type">
                  {card.id.slice(0, 3) === "pm_" && <span>Default</span>}
                </div>
                <div className="paymentMethod__expiryContainer">
                  <span>
                    {card.card.exp_month} / {card.card.exp_year}
                  </span>
                  <h5>Expiry</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No cards found.</span>
      )}
    </div>
  );
};

export default ProfileBankDetails;
