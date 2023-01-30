import React from "react";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import OrphanSearch from "./OrphanSearch";
import sponsorOrphan from "../../Assets/sponsor-orphan.png";
import "./Sponsor.css";

const Sponsor = () => {
  return (
    <>
      <Header />

      <div className="sponsorPage-main">
        <div>
          <div className="sponsorPage-header">
            <div className="sponsorPage-container__left">
              <img src={sponsorOrphan} />
              <span>
                Every 16 seconds, a child’s life is lost, mostly to an illness
                our own children recover from. When you sponsor a child your
                donation of $48 a month means healthcare that helps keep
                families and communities together. And this means the world.
                Sponsor a child today.
              </span>
            </div>
            <div className="sponsorPage-container__right">
              <h1>Sponsor an Orphan</h1>
              <span>
                Orphans Around the World is a Muslim organisation that engages
                people to work towards eliminating poverty and its causes.
                <br />
                <br /> More than 20 years of experience has taught us that the
                best way to change a child’s life is to transform their world.
                When a child’s community is stable and productive, the people
                around them can provide for their long-term wellbeing.
                <br />
                <br /> You can help make this life-changing work possible. When
                you sponsor a child, you’re joining a community of generous
                people in Australia and around the world who are committed to
                bringing lasting change to children living in poverty.
              </span>
            </div>
          </div>
          <div className="sponsorPage-container__bottom">
            <h4>
              Choose a child to sponsor with Orphans Around The World , or{" "}
              <h4
                style={{
                  color: "#242f51",
                }}
              >
                Be Chosen.
              </h4>
            </h4>
          </div>
        </div>
      </div>
      <OrphanSearch />
      <div className="sponsorPage-bottom">
        <h2>
          Your Sponsorship means giving life-saving
          <br /> healthcare to children who need it most.
        </h2>
        <span>
          “Blessed is the wealth of the Muslim, from which he gives to the poor,
          <br />
          the orphan and the wayfarer.” (Muslim)
        </span>
      </div>
      <Footer />
    </>
  );
};

export default Sponsor;
