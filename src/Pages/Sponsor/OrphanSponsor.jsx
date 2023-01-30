import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import "./Sponsor.css";
import logo from "../../Assets/child-placeholder.png";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import TransgenderIcon from "@mui/icons-material/Transgender";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SchoolIcon from "@mui/icons-material/School";
import { getAuth } from "firebase/auth";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CartFloatingIcon from "../../Components/Cart/CartFloatingIcon";
import userAuth, { userIsVerified } from "../../Redux/userAuth";
import { useSelector } from "react-redux";

const OrphanSponsor = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const { user, verified, stripeCustomerId } = useContext(AuthContext);
  const auth = getAuth();

  const [checked, setChecked] = useState([true, false, false]);
  const [timeframe, setTimeFrame] = useState("Month");
  const [cost, setCost] = useState(100);

  const { userIsVerified } = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(stripeCustomerId);
  }, [stripeCustomerId]);

  useEffect(() => {
    console.log(data);
  }, []);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChecked = (index) => {
    if (index === 0) {
      setCost(100);
      setTimeFrame("Month");
      setChecked([true, false, false]);
    } else if (index === 1) {
      setCost(300);
      setTimeFrame("Quarter");
      setChecked([false, true, false]);
    } else if (index === 2) {
      setCost(1200);
      setTimeFrame("Year");
      setChecked([false, false, true]);
    }
  };

  const handleSponsorBtn = () => {
    if (!user) navigate("/login");
  };

  const handleSponsor = () => {
    console.log(userIsVerified);
    if (user && userIsVerified) {
      navigate(`/collectDetails`, {
        state: {
          orphanData: data,
          price: cost,
          sponsorshipDuration: timeframe,
          stripeCustomerId,
        },
      });
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <Header />
      <CartFloatingIcon />
      <div className="child-sponsorship-page">
        <div className="child-sponsorship__container">
          <div className="cs__left">
            <div className="child-sponsorship__name">
              <h3 className="cs__header-name">
                {data.firstName} {data.lastName.slice(0, 1)}.
              </h3>
              <div className="cs__orphan-details">
                <div>
                  <span>
                    <TimelapseIcon />
                    {data.age} years
                  </span>
                  <span>
                    <TransgenderIcon />
                    {data.gender === "boy" ? "Male" : "Female"}
                  </span>
                  <span>
                    <PublicIcon />
                    {data.country}
                  </span>
                  <span>
                    <LocationOnIcon />
                    {data.areaOfBirth}
                  </span>
                  <span>
                    <HealthAndSafetyIcon />
                    {data.healthCondition}
                  </span>
                  <span>
                    <SchoolIcon />
                    {data.educationStatus}
                  </span>
                </div>
              </div>

              <img src={logo} />
            </div>
          </div>
          <div className="divider-vertical" />
          <div className="divider-horizontal"></div>
          <div className="cs__right">
            <div className="cs__right-header">
              <h3>Sponsor {data.firstName}</h3>
            </div>
            <div className="cs__right-header__amount">
              <h5>From $100 per Month</h5>
            </div>
            <div className="sponsorship-type">
              <h5>Sponsorship type:</h5>
              <div className="sponsorship-type__checkbox">
                <div>
                  <span>Monthly</span>
                  <Checkbox
                    onClick={() => handleChecked(0)}
                    checked={checked[0]}
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    style={{
                      color: "red",
                    }}
                  />
                </div>
                <div>
                  <span>Quarterly</span>
                  <Checkbox
                    onClick={() => handleChecked(1)}
                    checked={checked[1]}
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    style={{
                      color: "red",
                    }}
                  />
                </div>
                <div>
                  <span>Annually</span>

                  <Checkbox
                    onClick={() => handleChecked(2)}
                    checked={checked[2]}
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    style={{
                      color: "red",
                    }}
                  />
                </div>
              </div>
              <div className="sponsorship-amount">
                <div className="sponsorship-amount__total">
                  <span>
                    ${cost} / {timeframe}
                  </span>
                </div>
                <div
                  className="sponsorship-amount__checkout"
                  onClick={handleSponsorBtn}
                >
                  {!user ? (
                    <span>Login to Sponsor</span>
                  ) : (
                    <span onClick={handleSponsor}>Sponsor Now</span>
                  )}
                </div>
              </div>
              <div className="sponsorship-disclaimer">
                <span>
                  By sponsoring an orphan, you guarantee they will have access
                  to food, shelter & education.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="sponsorship-btns">
          <div className="sponsorship-btn__allOrphans">
            <span>View All Orphans</span>
          </div>
          <div className="sponsorship-btn__learn">
            <span>Learn more</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrphanSponsor;
