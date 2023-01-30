import React, { useContext } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
const CartFloatingIcon = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      {user && (
        <div className="cartFloating-icon" onClick={handleClick}>
          <ShoppingBasketIcon />
          <span>1</span>
        </div>
      )}
    </>
  );
};

export default CartFloatingIcon;
