import React, { useEffect } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import australianCharity from "../../Assets/ACFID_REG.png";
import childrenCheck from "../../Assets/childrenCheck.png";
import trustedCheck from "../../Assets/trustedCheck.png";
import placeholder from "../../Assets/child-placeholder.png";
import MapsHomeWorkTwoToneIcon from "@mui/icons-material/MapsHomeWorkTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import FamilyRestroomTwoToneIcon from "@mui/icons-material/FamilyRestroomTwoTone";
import Turkey from "../../Assets/Turkey.png";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Cart from "../../Components/Cart/Cart";
import CartFloatingIcon from "../../Components/Cart/CartFloatingIcon";

const OrphanDetails = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const subject = ["Mathematics", "Science", "Sports", "Arabic", "English"];
  const chores = ["Sweeping", "Cleaning", "Dishwashing", "Gardening"];
  const games = ["Soccer", "Football", "Tennis", "Basketball", "Reading"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <CartFloatingIcon />
      <div className="orphanDetails-container">
        <div
          onClick={() => navigate("/sponsor")}
          className="goback-container"
          id="raise"
        >
          <ArrowBackOutlinedIcon />
          <Link className="goback-link" to="/sponsor">
            Go back
          </Link>
        </div>
        <div className="orphanDetails-header">
          <div className="orphanDetails-header__title">
            <h2>Sponsor an Orphan</h2>
          </div>
          <div className="orphanDetails-header__checks">
            <div className="orphanDetails-header__check">
              <img src={trustedCheck} />
              <span>Trusted Charity since 1952</span>
            </div>
            <div className="orphanDetails-header__check">
              <img src={childrenCheck} />
              <span>Over 1.9 Million Children Sponsored</span>
            </div>
            <div className="orphanDetails-header__check">
              <img src={australianCharity} />
              <span>Australian Registered Charity</span>
            </div>
          </div>
        </div>
        <div className="orphanDetails-section">
          <div className="orphanDetails-details">
            <div className="orphanDetails-details__img">
              <img src={placeholder} />
            </div>
            <div className="orphanDetails-details__info">
              <h4>
                Hello, My name is {data.firstName} {data.lastName}
              </h4>
              <span>
                I live in {data.country} and I am a {data.age}-year-old{" "}
                {data.gender}
                <br />
              </span>
              <span>My birthday is {data.birth}.</span>
              <div className="orphanDetails-details__insights">
                <div className="orphanDetails-details__insight">
                  <MapsHomeWorkTwoToneIcon style={{ color: "green" }} />
                  <span>
                    My chores at home:{" "}
                    {chores[Math.floor(Math.random() * chores.length)]}
                  </span>
                </div>
                <div className="orphanDetails-details__insight">
                  <FavoriteTwoToneIcon style={{ color: "red" }} />

                  <span>
                    My favorite game:{" "}
                    {games[Math.floor(Math.random() * games.length)]}
                  </span>
                </div>
                <div className="orphanDetails-details__insight">
                  <SchoolTwoToneIcon style={{ color: "blue" }} />

                  <span>My school grade: {data.schoolYear}</span>
                </div>
                <div className="orphanDetails-details__insight">
                  <MenuBookTwoToneIcon />

                  <span>
                    My favorite subject:{" "}
                    {subject[Math.floor(Math.random() * subject.length)]}
                  </span>
                </div>
                <div className="orphanDetails-details__insight">
                  <FamilyRestroomTwoToneIcon style={{ color: "orange" }} />

                  <span>My siblings: {data.siblings}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="orphanDetails-status__container">
            <div className="orphanDetails-status__inner">
              <div className="orphanDetails-status">
                <span>Sponsorship Status:</span>
                <div className="orphanDetails-status__btns">
                  <div className={`${data.notSponsored && "available"}`}>
                    Available
                  </div>
                  <div className={`${!data.notSponsored && "available"}`}>
                    Sponsored
                  </div>
                </div>
              </div>
              <div className="orphanDetails-info__container">
                <h5>Meet {data.firstName}.</h5>
                <span>
                  This is Thawrah, the beautiful 8-year-old girl who was
                  orphaned before her birth. Her mother was pregnant with her
                  and her twin sister when her dad was detained and killed in
                  the prison. As she was born in the time of war in Syria, she
                  knew nothing but fear and displacement. She had to move from
                  place to place with her mum and five sisters to survive. The
                  family experienced unbelievable hardship and lived in a state
                  of constant anxiety.{" "}
                </span>
              </div>
              <div className="orphanDetails-info__container">
                <h5>How sponsorship can help {data.firstName}.</h5>
                <span>
                  This is Thawrah, the beautiful 8-year-old girl who was
                  orphaned before her birth. Her mother was pregnant with her
                  and her twin sister when her dad was detained and killed in
                  the prison. As she was born in the time of war in Syria, she
                  knew nothing but fear and displacement. She had to move from
                  place to place with her mum and five sisters to survive. The
                  family experienced unbelievable hardship and lived in a state
                  of constant anxiety.{" "}
                </span>
              </div>
            </div>
            <div className="orphanDetails-status__map">
              <img src={Turkey} />
              <span className="location">Location: {data.country}</span>
            </div>
          </div>
        </div>
        {data.notSponsored && (
          <div className="sponsorNow-btn">
            <Link to="/orphan-sponsor" state={data}>
              <span className="sponsorNow-span">Sponsor Now</span>
            </Link>
          </div>
        )}
      </div>

      <Footer />
      <Cart />
    </>
  );
};

export default OrphanDetails;
