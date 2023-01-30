import React, { useEffect, useState } from "react";
import childPlaceholder from "../../Assets/child-placeholder.png";
import "./Sponsor.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactCountryFlag from "react-country-flag";

const Orphan = ({ orphan }) => {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="orphan-container">
        <div className="orphan-img">
          <img src={childPlaceholder} />
        </div>
        <div className="orphan-container__details">
          <div>
            <span>
              {orphan.firstName + " " + orphan.lastName + ", " + orphan.age}
              <br />
            </span>
            <span
              style={{
                fontSize: "11px",
              }}
            >
              Orphan in {orphan.orphanageName}
            </span>
          </div>

          <Link
            className="sponsor-btn__link"
            to="/orphan-details"
            state={orphan}
          >
            <div className="sponsor-btn">
              <InfoOutlinedIcon />

              <span>Learn more</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Orphan;
