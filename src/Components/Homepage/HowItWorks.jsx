import React from "react";
import signup1 from "../../Assets/signup1.png";
import signup2 from "../../Assets/signup2.png";
import signup3 from "../../Assets/signup3.png";

const HowItWorks = () => {
  return (
    <div className="sponsorship-info">
      <div>
        <div className="info-header">
          <h1>How it works</h1>
        </div>
        <div className="info-header_span">
          <span>
            Your Sponsorship means giving life-saving healthcare to children who
            need it most.
          </span>
        </div>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-image__container">
            <img src={signup1} />
          </div>
          <div className="step-text">
            <h5>1. Sign up</h5>
            <span>
              Simply sign up to be chosen, make your first $48 (monthly)
              sponsorship donation and upload your photo!
              <br />
              <br /> Your name and photo will then be sent to a community where
              a choosing party is being prepared for the children. <br />
              <br />
              This is a celebratory event where children choose their sponsors.
            </span>
          </div>
        </div>
        <div className="step reverse">
          <div className="step-text">
            <h5>2. Verify Account</h5>
            <span>
              Simply sign up to be chosen, make your first $48 (monthly)
              sponsorship donation and upload your photo!
              <br />
              <br /> Your name and photo will then be sent to a community where
              a choosing party is being prepared for the children. <br />
              <br />
              This is a celebratory event where children choose their sponsors.
            </span>
          </div>
          <div className="step-image__container">
            <img src={signup2} />
          </div>
        </div>
        <div className="step">
          <div className="step-image__container">
            <img src={signup1} />
          </div>
          <div className="step-text">
            <h5>3. Secure Orphan Sponsorship</h5>
            <span>
              Simply sign up to be chosen, make your first $48 (monthly)
              sponsorship donation and upload your photo!
              <br />
              <br /> Your name and photo will then be sent to a community where
              a choosing party is being prepared for the children. <br />
              <br />
              This is a celebratory event where children choose their sponsors.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
