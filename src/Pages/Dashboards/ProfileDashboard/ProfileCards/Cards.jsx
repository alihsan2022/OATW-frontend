import React, { useState, useEffect } from "react";
import Divider from "../../../../Components/Divider";
import userAuth from "../../../../Redux/userAuth";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../Components/Loader";
import MasterCard from "../../../../Assets/master-card.png";
import Visa from "../../../../Assets/visa.png";
import TransparentLoader from "../../../../Components/TransparentLoader/TransparentLoader";
const Cards = () => {
  const [loaded, setLoaded] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState();
  const { stripeCustomerId } = useSelector((state) => state.userAuth);

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
    <>
      <div className="profile-card">
        <div className="profile-card__header">
          <h1>Payment Cards</h1>
        </div>
        <Divider />
        {!paymentMethods ? (
          <TransparentLoader />
        ) : (
          <>
            <div className="cards-card__body">
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
            <div className="profile-card__buttons">
              <button>Add payment method</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cards;
