import React, { useState } from "react";
import Footer from "../Navbars/Footer";
import sponsorImg1 from "../../Assets/sponsor-icon1.png";
import sponsorImg2 from "../../Assets/sponsor-icon2.png";
import sponsorImg3 from "../../Assets/sponsor-icon3.png";
import "./Homepage.css";
import FAQ from "./FAQ";
import homepagePic from "../../Assets/homepage-img.png";
import miniIcons from "../../Assets/mainImage-icons.png";
import orphanageUpdate from "../../Assets/orphanage-update.png";
import videoHolder from "../../Assets/video-holder.png";
import HomepageOrphanView from "./HomepageOrphanView";
import HowItWorks from "./HowItWorks";
import Header from "../Navbars/Header";
import CartFloatingIcon from "../Cart/CartFloatingIcon";
import HamburgerMenu from "../Navbars/HamburgerMenu";
import MailingList from "./MailingList";

const Homepage = () => {
  const [activeOrphan, setActiveOrphan] = useState(0);

  return (
    <div className="homepage">
      <Header />
      <CartFloatingIcon />
      <div className="homepage-main">
        <img className="main-img" src={homepagePic} />
        <img className="main-img__icons" src={miniIcons} />
      </div>
      <div className="homepage-sponsor">
        <div className="sponsor-header">
          <h1>Why Sponsor an Orphan?</h1>
          <span>
            "Blessed is the wealth of the Muslim, from which he gives to the
            poor, the orphan and the wayfarer." (Muslim)
          </span>
        </div>
        <div className="sponsor-stats">
          <div className="sponsor-stat">
            <img
              style={{
                backgroundColor: "#ffecef",
              }}
              src={sponsorImg1}
            />
            <h5>Almost 10,000 children are orphaned every single day</h5>
          </div>
          <div className="sponsor-stat">
            <img
              style={{
                backgroundColor: "#eaf9ff",
              }}
              src={sponsorImg2}
            />

            <h5>
              Almost 84 million orphans around the world have lost both parents
            </h5>
          </div>
          <div className="sponsor-stat">
            <img
              style={{
                backgroundColor: "#fff6d3",
              }}
              src={sponsorImg3}
            />

            <h5>
              Around 197 million children around the world are not in education
            </h5>
          </div>
        </div>
      </div>
      <div className="orphanage-update">
        <div className="orphanage-header">
          <h1>Orphanage update</h1>
          <span className="orphanage-header__span">
            People app help you to build almost everything to organize your
            people and their communication touchpoint, with a collaborative
            workplace.
          </span>
        </div>
        <div className="orphanage-update__stats">
          <img src={orphanageUpdate} />
        </div>
        <div className="orphanage-update__details">
          <div className="orphanage-video">
            <img src={videoHolder} />
          </div>
          <div className="orphange-details__text">
            <div className="orphanage-details__text-header">
              <h5>
                Your sponsorship means giving life-saving healthcare to children
                who need it most.
              </h5>
              <span>
                The rise of mobile devices transforms the way we consume.
                elevant channels such as Facebook.
              </span>
            </div>
            <div className="orphanHomepage-details">
              <HomepageOrphanView />
            </div>
          </div>
        </div>
      </div>
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Homepage;
