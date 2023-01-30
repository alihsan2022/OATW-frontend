import React, { useEffect, useState } from "react";
import "./Homepage.css";
import orphanImg from "../../Assets/orphanImg.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomepageOrphanView = () => {
  const [activeOrphan, setActiveOrphan] = useState(0);
  const orphan = [
    {
      orphanName: "Zaltan Nemeth",
      location: "Zambia",
      age: "8",
      gender: "boy",
      sponsorshipAvailable: true,
    },
    {
      orphanName: "Hay Nemeth",
      location: "Zambia",
      age: "8",
      gender: "boy",
      sponsorshipAvailable: false,
    },
    {
      orphanName: "Zalasdasdatan Nemeth",
      location: "Zambia",
      age: "8",
      gender: "girl",
      sponsorshipAvailable: true,
    },
  ];

  useEffect(() => {
    console.log(activeOrphan);
  }, [activeOrphan]);

  const incrementOrphan = () => {
    if (activeOrphan === orphan.length - 1) {
      setActiveOrphan(0);
    } else {
      setActiveOrphan(activeOrphan + 1);
    }
  };

  const decrementOprhan = () => {
    if (activeOrphan === 0) {
      setActiveOrphan(orphan.length - 1);
    } else {
      setActiveOrphan(activeOrphan - 1);
    }
  };

  return (
    <div className="orphan">
      <div className="orphan-view">
        <div className="orphan-view__img">
          <img src={orphanImg} />
        </div>
        <div>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            {orphan[activeOrphan].orphanName}
            <br />
          </span>
          <span className="orphanView-details">
            I live in {orphan[activeOrphan].location}
            and <br />
          </span>
          <span className="orphanView-details">
            I am an {orphan[activeOrphan].age}
            year old {orphan[activeOrphan].gender}.
          </span>
        </div>
      </div>

      <div className="orphan-status">
        <h5>Sponsorship Status:</h5>
        {orphan[activeOrphan].sponsorshipAvailable === true ? (
          <div className="orphan-status__details">
            <div className="status">
              <span>Sponsored</span>
            </div>
            <div className="status-active">
              <span>Available</span>
            </div>
          </div>
        ) : (
          <div className="orphan-status__details">
            <div className="status-active">
              <span>Sponsored</span>
            </div>
            <div className="status">
              <span>Available</span>
            </div>
          </div>
        )}
      </div>
      <div className="orphanView-btns">
        <button onClick={decrementOprhan}>
          <ArrowBackIosIcon />
        </button>
        <button onClick={incrementOrphan}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default HomepageOrphanView;
