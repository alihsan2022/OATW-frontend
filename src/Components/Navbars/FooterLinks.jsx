import React from "react";
import "./Navbars.css";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <span>Copyright© 2022</span>
      <div className="footer-link">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Terms & Conditions</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
