import React, { useContext, useEffect, useState } from "react";
import "../Navbars/Navbars.css";
import logo from "../../Assets/logo.png";
import { Outlet, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const interactWithModal = () => {
    setModal(!modal);
  };
  return (
    <div className="header-nav">
      <div className="header">
        <div className="header-logo">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
          />
        </div>
        <div className="header-right">
          <div className="header-right__links">
            <ul className="menu">
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

              {user ? (
                <button onClick={handleNavigate} className="header-right__btn">
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={handleNavigate}
                  className="header-right__btn dashboard"
                >
                  Login
                </button>
              )}
            </ul>
          </div>
          <div className="menu-mobile">
            <MenuOpenIcon onClick={() => setModal(true)} />
          </div>
        </div>
      </div>
      {modal && <HamburgerMenu click={interactWithModal} />}
    </div>
  );
};

export default Header;
