import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleIcon from "@mui/icons-material/Google";

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
  getDoc,
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
import { NotificationManager } from "react-notifications";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [idFound, setIdFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const captchaRef = useRef(null);
  const siteKey = process.env.CAPTCHA_CLIENT_SITE_KEY;

  const { user, updateStripeCustomerId } = useContext(AuthContext);
  const [savedUser, setSavedUser] = useState();
  const [timer, setTimer] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    e.preventDefault();

    if (token) {
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
          setSavedUser(auth.currentUser);

          setDoc(doc(db, "users", user.uid), {
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
            email: user.email,
          };
          axios
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

          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Email Verification Sent");
              setVerificationSent(true);
              setTimer(false);
            })
            .catch((error) => {
              console.log("Unable to send email verification.");
            });

          signOut(auth)
            .then(() => {
              console.log("Signed out.");
            })
            .catch((error) => {
              // An error happened.
              console.log("Unable to logout.");
            });
          NotificationManager.success(
            "Account verification email sent.",
            "Registration.",
            3000
          );
        } catch (error) {
          setError(
            "Please enter a valid email & password with 6 or more characters."
          );
          console.log(error.message);

          setLoading(false);
        }
      }
    } else {
      setError("Please complete the captcha.");
      setLoading(false);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (timer === false) {
      const timer = setTimeout(() => {
        setTimer(true);
      }, 300000);
    }
  }, [timer]);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);

        const findUserInDb = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          if (docSnap?.data()?.uid === user?.uid) {
            console.log("User already exists in the db.");
            navigate("/profile");
          } else {
            console.log("User doesnt exist. Creating a new users collection.");
            setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              email: user.email,
              userRole: 0,
              billingDetails: {},
              userName: user.displayName,
              userVerified: false,
              stripeCustomerId: "",
              fullName: "",
            });

            let data = {
              user: user,
              email: user.email,
            };
            axios
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
          }
        };

        findUserInDb();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
        setError("Unable to signin with Google.");
        setLoggedIn(false);
      });
  };

  const resendEmail = () => {
    sendEmailVerification(savedUser)
      .then(() => {
        console.log("Email Verification Sent");
        console.log(savedUser);
        setVerificationSent(true);
        setTimer(false);
      })
      .catch((error) => {
        console.log("Unable to send email verification.");
        console.log(savedUser);
      });
  };

  return (
    <>
      <Header />
      <div className="signUp-page">
        <VerificationSteps step={1} />
        {!verificationSent ? (
          <div className="form-container">
            <h2>Sign Up</h2>

            <form>
              {error && (
                <div className="login__error">
                  <div>
                    <ErrorIcon style={{ marginRight: "5px" }} />
                    <span>{error}</span>
                  </div>
                </div>
              )}
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
                    <button
                      onClick={loginWithGoogle}
                      className="button-container__google"
                    >
                      <GoogleIcon
                        fontSize="12px"
                        style={{ marginRight: "10px" }}
                      />
                      Register with Google
                    </button>
                    <button onClick={handleSignUp}>Register</button>
                    <span className="tcs-disclaimer">
                      By creating an account, you agree to our
                      <a href="/t&cs"> terms & conditions.</a>
                    </span>
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
            </form>
          </div>
        ) : (
          <div className="email-verification-container">
            <h2>Account verification email sent.</h2>
            <span>
              An email has been sent to your nominated email. To access your
              account, please confirm your verification by clicking the link.
            </span>
            {timer ? (
              <button onClick={() => resendEmail()}>Resend Email</button>
            ) : (
              <button disabled style={{ cursor: "not-allowed" }}>
                Resend Email
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
