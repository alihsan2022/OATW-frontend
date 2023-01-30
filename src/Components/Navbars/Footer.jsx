import React, { useEffect, useState } from "react";
import placeholderLogo from "../../Assets/logo-placeholder.png";
import logo from "../../Assets/logo.png";
import footerIcons from "../../Assets/tax.png";
import { ImTwitter } from "react-icons/im";
import { FaFacebookF } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import FooterLinks from "./FooterLinks";
import { NotificationManager } from "react-notifications";

import "./Navbars.css";
import MailingList from "../Homepage/MailingList";
import axios from "axios";

const Footer = () => {
  const [userEmail, setUserEmail] = useState("");
  const [mailingModal, setMailingModal] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const onEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);

  const handleSubscribe = () => {
    if (userEmail.length === 0) {
      setEmailError(true);
      NotificationManager.error(
        "Please input a valid email.",
        "Mailing List",
        2000
      );
    } else {
      setEmailError(false);
      susbcribeEmail();
      setUserEmail("");
    }
  };

  const susbcribeEmail = async () => {
    const response = await axios
      .post("https://oatw-server-draz.vercel.app/addSubscriberToMailChimp", {
        email: userEmail,
      })
      .then((response) => {
        NotificationManager.success(
          "You have been subscribed to our mailing list.",
          "Mailing List",
          2000
        );
      })
      .catch((error) => {
        NotificationManager.error("Unable to subscribe.", "Mailing List", 2000);
        console.log(error);
      });
  };

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-inner">
          <div className="footer-left">
            <img src={logo} />
            <span>
              Al-Ihsan knows the importance of immediate access to food, medical
              aid and emergency shelters during times of natural disasters,
              poverty and other emegency situations. We thus strive to provide
              rapid mobilisation and action, with a mission to establish and
              matina a (global) society that serves and empowers all those in
              need. We endeavour to fulfll and complete our services through
              regular contact and periodic visitations.
            </span>
          </div>

          <div className="footer-right">
            <div footer-right__img>
              <img src={footerIcons} />
            </div>
            <div className="footer-right__input">
              <input
                onChange={(e) => onEmailChange(e)}
                placeholder="Email"
                value={userEmail}
              />
              <button onClick={handleSubscribe}>Subscribe</button>
            </div>
            <div className="footer-connect">
              <h3>CONNECT WITH US</h3>
              <div className="footer-connect__socials">
                <a target="_blank" href="https://twitter.com/Alihsan_AU">
                  <ImTwitter
                    size={20}
                    color="A4A4A4"
                    onMouseOver={({ target }) => (target.style.color = "white")}
                    onMouseOut={({ target }) =>
                      (target.style.color = "#A4A4A4")
                    }
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/alihsanfoundation/"
                >
                  <FaFacebookF
                    onMouseOver={({ target }) => (target.style.color = "white")}
                    onMouseOut={({ target }) =>
                      (target.style.color = "#A4A4A4")
                    }
                    size={20}
                    color="A4A4A4"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UCoxTYV4ALbL5LOpC84CRAJw"
                >
                  <TfiYoutube
                    onMouseOver={({ target }) => (target.style.color = "white")}
                    onMouseOut={({ target }) =>
                      (target.style.color = "#A4A4A4")
                    }
                    size={20}
                    color="A4A4A4"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="links">
        <div className="links-inner">
          <div className="links-inner__title">
            <span>Copyright © 2023</span>
          </div>
          <div className="foot-links">
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Terms & Conditions</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="/contactUs">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
