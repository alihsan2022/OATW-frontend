import React, { useEffect, useState } from "react";
import { getOrphan } from "../../FirebaseFunctions/OrphanFunctions";
import placeholder from "../../Assets/child-placeholder.png";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import cart, { removeFromCart } from "../../Redux/cart";

const CartItem = ({ item }) => {
  const [loaded, setLoaded] = useState();

  const { cartSponsorItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getDetails();
  // }, []);

  // const getDetails = async () => {
  //   console.log(item);
  //   let data = await getOrphan(item.orphanId);
  //   setOrphan(data);
  //   if (data) console.log(data);
  // };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.orphanId));
  };

  useEffect(() => {}, [cartSponsorItems]);

  return (
    <div className="checkoutCart-item">
      <div className="checkoutCard-item__header">
        <h5>Orphan Name | Turkey</h5>
      </div>
      <div className="checkoutCard-item__details">
        <div className="checkoutCard-item__img">
          <img src={placeholder} />
        </div>
        <div className="checkoutCard-item__info">
          <div>
            <span
              style={{
                fontWeight: "600",
              }}
            >
              New Orphan Sponsorship
              <br />
            </span>
            <span>
              Give {item.subscriptionDuration} to help this orphan and the
              family for the whole year!
              <br />
              <br />
            </span>
            <span>Subscription: {item.subscriptionDuration}</span>
          </div>

          <div className="checkoutCard-item__buttons">
            <div className="checkoutCard-item">
              <span>Total: ${item.price}</span>
            </div>
            <div
              onClick={handleRemoveFromCart}
              className="checkoutCard-item__delete"
            >
              <DeleteForeverIcon />
              <span>Remove Item</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
