import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAuth from "../../../Redux/userAuth";
import "./ProfileMenu.css";

const UserSubscriptions = () => {
  const { stripeCustomerId } = useSelector((state) => state.userAuth);
  const [subscriptions, setSubscriptions] = useState();

  useEffect(() => {
    const retrieveSubscriptions = async () => {
      const response = await axios
        .post("https://oatw-server-draz.vercel.app/retrieveSubscriptions", {
          customerId: stripeCustomerId,
        })
        .then(({ data }) => {
          //  setPaymentMethods(response.data.paymentMethods.data);
          setSubscriptions(data.subscriptions.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    retrieveSubscriptions();
  }, []);

  useEffect(() => {
    console.log(subscriptions);
  }, [subscriptions]);

  const getDate = (timeStamp) => {
    let newDate = timeStamp * 1000;
    newDate = new Date(newDate);
    newDate = newDate.toLocaleString().slice(0, 10);
    return newDate;
  };

  return (
    <>
      {subscriptions && subscriptions.length > 0 ? (
        <div className="user-subscriptions">
          {subscriptions.map((subscription, index) => (
            <div className="user-subscription" key={index}>
              <span>Orphan {subscription.plan.nickname}</span>
              <span>
                ${subscription.plan.amount / 100} / {subscription.plan.interval}
              </span>
              <span>
                Next charge:{" "}
                {/* {console.log(new Date(subscription.current_period_end * 1000))} */}
                {getDate(subscription.current_period_end)}
              </span>
              {subscription.status === "active" ? (
                <span className="text-active">Active</span>
              ) : (
                <span className="text-failed">Failed</span>
              )}
              <button className="subscription_cancel">Cancel</button>
            </div>
          ))}
        </div>
      ) : (
        <span>You have no subscriptions</span>
      )}
    </>
  );
};

export default UserSubscriptions;
