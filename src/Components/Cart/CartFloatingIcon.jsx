import React, { useContext } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import cart from "../../Redux/cart";
const CartFloatingIcon = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { totalCartItems } = useSelector((state) => state.cart);
  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      {user && (
        <div className="cartFloating-icon" onClick={handleClick}>
          <ShoppingBasketIcon />
          <span>{totalCartItems}</span>
        </div>
      )}
    </>
  );
};

export default CartFloatingIcon;
