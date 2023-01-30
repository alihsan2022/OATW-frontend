import axios from "axios";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import Footer from "../../../Components/Navbars/Footer";
import Header from "../../../Components/Navbars/Header";
import "./ContactUs.css";
const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [complaintButton, setComplaintButton] = useState(false);

  useEffect(() => {
    console.log({
      email,
      firstName,
      lastName,
      description,
    });
  }, [email, firstName, lastName, description]);

  const submitForm = (e) => {
    e.preventDefault();
    submitContactForm();
  };

  const handleButton = (value, e) => {
    e.preventDefault();

    if (value) setComplaintButton(true);
    if (!value) setComplaintButton(false);
  };

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setDescription("");
    setComplaintButton(false);
  };

  const submitContactForm = async () => {
    const validateEmail = async () => {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(validRegex)) {
        const response = await axios
          .post("https://oatw-server-draz.vercel.app/sendContactForm", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            description: description,
            type: complaintButton ? "Complaint" : "Contact Message",
          })
          .then((response) => {
            NotificationManager.success(
              "Your message has been sent.",
              "Contact Form",
              2000
            );
            resetForm();
          })
          .catch((error) => {
            NotificationManager.error(
              "Unable to send form.",
              "Contact Message",
              2000
            );
          });
      } else {
        NotificationManager.error("Invalid email.", "Contact Message", 2000);
      }
    };
    validateEmail();
  };

  return (
    <>
      <Header />
      <div className="contactUs__page">
        <div className="contactUs__page-container">
          <div className="contactUs__page-header">
            <div className="contactUs__page-header-top">
              <h1>Contact Form</h1>
              <span>
                Please fill in the contact form with all the information needed,
                and we will get back to you.
              </span>
            </div>
            <div className="contactUs__page-header-bottom">
              <h5>Further questions?</h5>
              <br />
              <span>
                If you have any further questions or urgent enquiries, please do
                not hesistate to contact us via our other contact methods.{" "}
              </span>
              <br />
              <br />
              <span>
                You can contact the OATW team via phone at: 1300 998 444 or
                visit our office at: 176 Waldron Rd, Chester Hill NSW 2162
                Australia, or email us at info@alihsan.org.au.
              </span>
              <br />
              <br />
              <button className="contactUs__page-email">Email us</button>
            </div>
          </div>
          <div className="contactUs__page-form">
            <form className="contactUs__form">
              <div className="contactUs__form-header">
                <div className="form-header">
                  <h4>Is this a complaint?</h4>
                  <span>
                    If this is a complaint due to the service we provide, let us
                    know so we can get back to you sooner.
                  </span>
                </div>
                <div className="contactUs__form-header_btns">
                  <div className="form-header__btn">
                    <button
                      onClick={(e) => handleButton(true, e)}
                      id={complaintButton ? "button__active" : ""}
                    >
                      Yes
                    </button>
                    <button
                      onClick={(e) => handleButton(false, e)}
                      id={!complaintButton ? "button__active" : ""}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-content">
                <h4> Enquiry Information</h4>
                <div className="form-content__labelSection">
                  <label>First Name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-content__labelSection">
                  <label>Last Name</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-content__labelSection">
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-content__labelSection">
                  <label>Description</label>
                  <textarea
                    value={description}
                    placeholder="Enter your enquiry here."
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    cols="60"
                    name="description"
                  ></textarea>
                </div>
              </div>
              <div className="form-submit">
                {email.length === 0 ||
                firstName.length === 0 ||
                lastName.length === 0 ||
                description.length === 0 ? (
                  <button
                    style={{
                      cursor: "not-allowed",
                    }}
                    disabled
                    onClick={(e) => submitForm(e)}
                  >
                    Submit
                  </button>
                ) : (
                  <button onClick={(e) => submitForm(e)}>Submit</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
