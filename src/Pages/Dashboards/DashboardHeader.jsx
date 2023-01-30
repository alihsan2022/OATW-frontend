import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import child from "../../Assets/child-placeholder.png";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { getAuth } from "firebase/auth";

const DashboardHeader = () => {
  const auth = getAuth();

  const { user } = useContext(AuthContext);

  return (
    <div className="dash-header">
      <div className="dash-header__container">
        <div className="dash-header__links">
          <ul>
            <li>
              <Link to="/">
                <AiOutlineHome className="icon" />
                Home
              </Link>
            </li>
            <li>
              <Link>
                <FiSettings className="icon" />
                Settings
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <CgProfile className="icon" />
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="orphanage-name">
          <img src={child} />
          <span>
            {user?.displayName ? user.displayName : "Please update your name"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
