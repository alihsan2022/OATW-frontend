import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { getAuth } from "firebase/auth";
import Header from "../Navbars/Header";
import Footer from "../Navbars/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CartFloatingIcon from "./CartFloatingIcon";
import cart, {
  addDonation,
  addDonationItem,
  addItemToCart,
  getTotalCost,
  updateDonation,
  updateDonationIds,
} from "../../Redux/cart";
import { useDispatch, useSelector } from "react-redux";
import userAuth from "../../Redux/userAuth";
import DonationItem from "./DonationItem";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const {
    cartSponsorItems,
    cartDonation,
    totalPrice,
    stripeProductIds,
    donationItems,
    totalCartItems,
  } = useSelector((state) => state.cart);

  const donationData = {
    purchaserId: user?.uid,
    productId: stripeProductIds.donation,
    amount: amount,
    type: "donation",
  };

  const donationIds = {
    purchaserId: user?.uid,
    productId: stripeProductIds.donation,
  };

  useEffect(() => {
    dispatch(getTotalCost());
    console.log(totalPrice);
  }, [totalCartItems]);

  const handleAddDonation = () => {
    dispatch(updateDonation(parseInt(amount)));
    dispatch(updateDonationIds(donationIds));
    setAmount(0);
  };

  return (
    <>
      <Header />
      <CartFloatingIcon />
      <div className="checkout">
        <div className="checkout-header">
          <div>
            <h1>Your items.</h1>
            <span>Secure Sponsorship Gateway.</span>
          </div>
          <div className="checkout-header__basket">
            <div className="header__basket">
              <ShoppingCartIcon />
              <span>
                Basket - ({totalCartItems}){" "}
                {totalCartItems > 1 ? "Items" : "Item"}
              </span>
            </div>
          </div>
        </div>
        <div className="checkoutDivider-horizontal"></div>
        <div className="checkoutCart-items">
          {cartSponsorItems && cartSponsorItems.length > 0 ? (
            cartSponsorItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
          ) : (
            <span>No items in your cart.</span>
          )}
        </div>
        <div className="checkoutDivider-horizontal"></div>
        {/* {donationItems && donationItems.amount > 0 ? (
          donationItems.map((item, index) => (
            <>
              <DonationItem key={index} item={item} />

              <div className="checkoutDivider-horizontal"></div>
            </>
          ))
        ) : (
          <span></span>
        )} */}
        {donationItems && donationItems.amount > 0 && (
          <>
            <DonationItem item={donationItems} />
            <div className="checkoutDivider-horizontal"></div>
          </>
        )}

        <div className="basket-details">
          <div className="basket-details__donation">
            <span
              style={{
                fontWeight: "500",
              }}
            >
              Add a donation to your order.
            </span>
            <div className="donation__inner">
              <div className="donation__input">
                <span>$</span>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder={""}
                  value={amount}
                />
              </div>
              <div
                onClick={handleAddDonation}
                className="donation__input-confirm"
              >
                {amount === "" ? (
                  <span>Enter amount</span>
                ) : (
                  <span>Donate ${amount}</span>
                )}
              </div>
            </div>
          </div>
          <div className="basket__total">
            <span>Basket Total</span>
            <div className="basket__total-totalPrice">
              <span>Total:</span>
              <span>${totalPrice + donationItems.amount}</span>
            </div>
            <div
              onClick={() => {
                navigate(`/collectDetails`, {
                  state: {},
                });
              }}
              className="basket__total-pay"
            >
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
