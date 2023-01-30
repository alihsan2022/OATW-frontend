import React, { useEffect, useState } from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import "./AddressForm.css";
import userAuth, {
  setBillingAddress,
  setFullName,
} from "../../../../Redux/userAuth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const AddressForm = () => {
  const { billingAddress, stripeCustomerId, fullName } = useSelector(
    (state) => state.userAuth
  );
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const saveBillingDetails = async (e) => {
    e.preventDefault();
    dispatch(setBillingAddress(address));
    dispatch(setFullName(name));
    console.log(billingAddress);

    if (stripeCustomerId != "" && billingAddress) {
      const response = await axios
        .post(
          "https://oatw-server-draz.vercel.app/updateStripeBillingAddress",
          {
            customerId: stripeCustomerId,
            billingAddress: billingAddress,
            name: name,
          }
        )
        .then((res) => {
          console.log("Updated billing address on stripe.");
          NotificationManager.success(
            "Your billing details have been updated.",
            "Billing Details.",
            2000
          );
        })
        .catch((error) => {
          console.log("Unable to update billing address on Stripe.");
          NotificationManager.error(
            "Unable to update billing address.",
            "Billing Details.",
            2000
          );
        });
    } else {
      NotificationManager.error(
        "Unabel to update billing. Try again",
        "Billing Details.",
        2000
      );
    }
  };

  useEffect(() => {
    console.log(billingAddress);
  }, [billingAddress]);

  return (
    <>
      <form className="verification-billing-form">
        <h3>Billing Details</h3>
        <AddressElement
          onChange={(event) => {
            if (event.complete) {
              const userAddress = event.value.address;
              const fullName = event.value.name;
              setAddress(userAddress);
              setName(fullName);
            }
          }}
          options={{
            mode: "billing",
            autocomplete: {
              mode: "google_maps_api",
              apiKey: "AIzaSyDvV0eV_I0OVkJgPu0FHEpS9b1JARTwQBQ",
            },
            defaultValues: {
              name: fullName ? fullName : "",
              address: {
                line1: billingAddress?.line1 ? billingAddress.line1 : "",
                line2: billingAddress?.line2 ? billingAddress.line2 : "",
                city: billingAddress?.city ? billingAddress.city : "",
                state: billingAddress?.state ? billingAddress.state : "",
                postal_code: billingAddress?.postal_code
                  ? billingAddress.postal_code
                  : "",
                country: billingAddress?.country ? billingAddress.country : "",
              },
            },
          }}
        />
        {address ? (
          <button
            onClick={(e) => saveBillingDetails(e)}
            className="verification-billing-form-btn"
          >
            Save Details
          </button>
        ) : (
          <button
            disabled
            style={{ cursor: "not-allowed" }}
            className="verification-billing-form-btn"
          >
            Please complete form.
          </button>
        )}
      </form>
    </>
  );
};

export default AddressForm;
