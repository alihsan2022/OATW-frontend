import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import ReCAPTCHA from "react-google-recaptcha";

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";

import { auth, provider } from "../../firebase";
import Header from "../../Components/Navbars/Header";
import Footer from "../../Components/Navbars/Footer";
import "./Auth.css";
import SignUpProcess from "./SignUpProcess";
import { VerificationSteps } from "../Dashboards/UserDashboard/Verification";
import { handleLogout } from "../../FirebaseFunctions/AdminUserFunctions";
import { AuthProvider } from "../../Context/AuthProvider";
import AuthContext from "../../Context/AuthContext";
import userAuth, { setUserData, setCustomerId } from "../../Redux/userAuth";
import { useRef } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [idFound, setIdFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const siteKey = process.env.CAPTCHA_CLIENT_SITE_KEY;

  const { user, updateStripeCustomerId } = useContext(AuthContext);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({
      email,
      password,
      confirmPass,
      username,
    });
  }, [email, password, confirmPass, username]);

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const handleSignUp = async (e) => {
    let stripeId;
    e.preventDefault();
    setError("");
    if (password === "" || confirmPass === "" || password != confirmPass) {
      setError("Please enter the same passwords.");
    } else if (username === "" || username.length < 6) {
      setError("Please enter a username with a minimum of 6 characters.");
    } else {
      setLoading(true);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          userRole: 0,
          billingDetails: {},
          userName: username,
          userVerified: false,
          stripeCustomerId: "",
          fullName: "",
        });

        let data = {
          user: user,
        };
        await axios
          .post(
            "https://oatw-server-draz.vercel.app/sendRegistrationConfirmation",
            data
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        navigate("/profile");
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setUsername("");
        setError("");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="signUp-page">
        <VerificationSteps step={1} />
        <div className="form-container">
          <h2>Sign Up</h2>
          <form>
            <div className="input-container">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                required
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="input-container">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="useremail"
                required
                placeholder="email"
                value={email}
              />
            </div>
            <div className="input-container">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pass"
                required
                placeholder="password"
                value={password}
              />
            </div>
            <div className="input-container">
              <input
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
                name="pass"
                required
                placeholder="Confirm Password"
                value={confirmPass}
              />
            </div>

            <div className="button-container">
              {!loading ? (
                <>
                  <div className="login__recaptcha">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={onChange}
                      ref={captchaRef}
                    />
                  </div>
                  <button onClick={handleSignUp}>Register</button>
                </>
              ) : (
                <button disabled style={{ cursor: "not-allowed" }}>
                  Creating Account...
                </button>
              )}
              <div className="dividers">
                <div className="divider"></div>
                <span>OR</span>
                <div className="divider"></div>
              </div>
              <button
                className="redirect-btn"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login.
              </button>
            </div>
            {error && (
              <div className="login__error">
                <div>
                  <ErrorIcon />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;
