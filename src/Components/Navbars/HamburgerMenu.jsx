import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";
import logo from "../../Assets/logo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import AuthContext from "../../Context/AuthContext";

const HamburgerMenu = ({ click }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (type) => {
    if (type === "login") {
      click();
      navigate("/login");
    } else if (type === "dashboard") {
      click();
      navigate("/dashboard");
    } else {
      navigate("/error");
    }
  };

  return (
    <div className="burger-menu">
      <div className="burger-logo">
        <img
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="burger-menu__links">
        <div className="">
          <ul className="burger-menu__list">
            <li
              style={{
                cursor: "default",
              }}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              style={{
                cursor: "default",
              }}
            >
              <Link to="/sponsor">Sponsorship</Link>
            </li>
            <li
              style={{
                cursor: "default",
              }}
            >
              <Link to="/projects">Projects</Link>
            </li>
            <li
              style={{
                cursor: "default",
              }}
            >
              <Link to="/FAQPage">FAQs</Link>
            </li>
            <li
              style={{
                cursor: "default",
              }}
            >
              <Link to="/lll">Who we are</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="burger-menu__btns">
        {!user ? (
          <button onClick={() => handleClick("login")} className="burger-btn">
            Login
          </button>
        ) : (
          <button
            onClick={() => handleClick("dashboard")}
            className="burger-btn"
          >
            Dashboard
          </button>
        )}
      </div>
      <div className="burger-menu__close">
        <CancelIcon onClick={click} />
      </div>
    </div>
  );
};

export default HamburgerMenu;
