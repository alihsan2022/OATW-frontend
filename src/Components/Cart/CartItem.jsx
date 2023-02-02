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

  console.log(item);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.orphanId));
  };

  useEffect(() => {}, [cartSponsorItems]);

  return (
    <div className="checkoutCart-item">
      <div className="checkoutCard-item__header">
        <h5>
          {item.firstName} {item.lastName} | {item.orphanageName}
        </h5>
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
              Give every {item.subscriptionType.toLowerCase()} to help this
              orphan and their family for the whole{" "}
              {item.subscriptionType.toLowerCase()}!
              <br />
              <br />
            </span>
            <span>
              Recurring per:{" "}
              <span style={{ fontWeight: "bold" }}>
                {item.subscriptionType}
              </span>
            </span>
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
