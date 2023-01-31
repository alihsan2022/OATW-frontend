import React from "react";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="privacyPolicy-container">
        <div className="privacyPolicy-header">
          <h1>Privacy Policy</h1>
        </div>
        <div className="privacyPolicy-body-section">
          <div className="privacyPolicy-body">
            <h5>Overview</h5>
            <p>
              Al-Ihsan Foundation International Limited has always been
              committed to protecting your privacy. All information provided to
              us will remain confidential and protected. It will be used only as
              outlined below. What information do we collect? Al-Ihsan
              Foundation typically asks for the information below. However, it
              is your choice how much of this information you provide us with.
              All information is held securely.
            </p>
            <span>
              <li>contact information (e.g. name, address, e-mail)</li>
              <li>
                personal details, including date of birth, gender, donation
                amount
              </li>
              <li>your contact number (if applicable)</li>
              <li>
                transactions via payment gateways (including Paypal) for once
                off and re-occurring contributions that are given to us for
                donations made online
              </li>
            </span>
          </div>
          <div className="privacyPolicy-body">
            <h5>How do we use the information?</h5>
            <p>We collect this information in order to:</p>
            <span>
              <li>process donations and provide receipts</li>
              <li>maintain accurate details of our supporters’ history</li>
              <li>keep our supporters informed of our work</li>
              <li>
                assist in the cost-effective development of our marketing and
                fundraising activities
              </li>
            </span>
            <p>
              To ensure your privacy is protected, information from your record
              will not be disclosed, nor details altered, unless requested by
              you (after your identity has been confirmed). Some data collected
              (eg. Date of Birth, Gender) will be used primarily for this
              purpose. Internet
            </p>
          </div>
          <div className="privacyPolicy-body">
            <h5>Supplying personal details</h5>
            <p>
              If you give us your email address, or other personal information
              by subscribing to one of our mailing lists, or registering for
              information, it will be used to send you information only on the
              subject area you have chosen. We will not subscribe you to
              additional lists, nor give your address to any third party,
              without your approval.
            </p>
          </div>
          <div className="privacyPolicy-body">
            <h5>Links to external sites</h5>
            <p>
              In some areas of the web-site links to other sites such as
              sponsors can be found. These sites are not controlled by Al-Ihsan
              Foundation and therefore we cannot take responsibility for their
              content, claims of offer or privacy practices.
            </p>
          </div>
          <div className="privacyPolicy-body">
            <h5>Giving you control</h5>
            <p>
              Al-Ihsan Foundation will provide you with the opportunity to opt
              out of receiving future mailings from us. Should you have any
              issues in relation to Al-Ihsan Foundation and your privacy, you
              can raise this with our Complaints Officer who will address your
              concerns promptly and advise you of your rights.
            </p>
            <p>When contacting us, please include the following information:</p>
            <span>
              <li>Name</li>
              <li>Address</li>
              <li>Telephone Number</li>
              <li>Email Address</li>
              <li>Date of Birth</li>
            </span>
          </div>
          <div className="privacyPolicy-body">
            <h5>Maintaining your information.</h5>
            <p>To access or change your details contact our administration</p>
            <span>
              <li>Call 1300 998 444</li>
              <li>Email us at admin@alihsan.org.au</li>
              <li>
                Mail us at Al-Ihsan Foundation, PO Box 791 Chester Hill, NSW
                2162
              </li>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
