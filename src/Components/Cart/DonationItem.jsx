import React from "react";
import { useDispatch } from "react-redux";
import { removeDonation } from "../../Redux/cart";

const DonationItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="donationItem">
        <h5>Donation</h5>
        <div className="donationItem-button">
          <h4>${item.amount}</h4>
          <button onClick={() => dispatch(removeDonation())}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default DonationItem;
