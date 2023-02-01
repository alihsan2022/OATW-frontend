import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Navbars/Header";
import Footer from "../../Components/Navbars/Footer";
import { Outlet, Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import ReCAPTCHA from "react-google-recaptcha";
import loadjs from "loadjs";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import GoogleIcon from "@mui/icons-material/Google";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, login, logout } from "../../Redux/userAuth";
import counter from "../../Redux/counter";
import Captch from "./ProfileMenu/Captch";
import axios from "axios";
import { NotificationManager } from "react-notifications";
const Login = () => {
  /////////////////REDUX///////////////
  const dispatch = useDispatch();
  /////////////////REDUX///////////////
  const captchaRef = useRef(null);
  const provider = new GoogleAuthProvider();
  const { user, verified } = useContext(AuthContext);
  const siteKey = process.env.CAPTCHA_CLIENT_SITE_KEY;
  const [load, setLoad] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    console.log(verified);
  }, [verified]);

  useEffect(() => {
    console.log(isBrowser);
  }, [isBrowser]);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (token) {
      if (email.length > 0 && password.length > 0) {
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          if (res.error) {
            setError("Invalid username or password.");
            setLoading(false);
          } else {
            console.log(res?.user?.emailVerified);
            if (res?.user?.emailVerified === true) {
              setLoggedIn(true);
              if (loggedIn) {
                navigate("/profile");
              }
              navigate("/profile");
            } else {
              signOut(auth)
                .then(() => {
                  console.log("Signed out.");
                })
                .catch((error) => {
                  // An error happened.
                  console.log("Unable to logout.");
                });
              NotificationManager.error(
                "Please verify your email.",
                "Login.",
                3000
              );
              setLoading(false);
              setError("Please verify your email.");
              setLoggedIn(false);
            }
          }
        } catch (error) {
          setLoading(false);
          setError("Invalid username or password.");
          setLoggedIn(false);
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            setError("Invalid username or password.");
          } else if (error.code === "auth/too-many-requests") {
            setError("Please wait before you attempt to login again.");
          }
        }
      } else {
        setError("Please enter valid details.");
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("Please complete the captcha.");
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const loginWithGoogle = () => {
    if (isMobile) {
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
              console.log(
                "User doesnt exist. Creating a new users collection."
              );
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
    } else if (isBrowser) {
      signInWithRedirect(auth, provider);
      getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const findUserInDb = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            if (docSnap?.data()?.uid === user?.uid) {
              console.log("User already exists in the db.");
              navigate("/profile");
            } else {
              console.log(
                "User doesnt exist. Creating a new users collection."
              );
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
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <h2>Login</h2>

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
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              required
              placeholder="Email"
            />
          </div>

          <div className="input-container">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="pass"
              required
              placeholder="password"
            />
          </div>
          <div className="login__recaptcha">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
              ref={captchaRef}
            />
          </div>
          <div className="button-container">
            {!loading ? (
              <button onClick={handleFormSubmit}>Login</button>
            ) : (
              <button disabled style={{ cursor: "not-allowed" }}>
                Logging in...
              </button>
            )}
            <button
              onClick={loginWithGoogle}
              className="button-container__google"
            >
              <GoogleIcon fontSize="12px" style={{ marginRight: "10px" }} />
              Login with Google
            </button>
            <div className="dividers">
              <div className="divider"></div>
              <span>OR</span>
              <div className="divider"></div>
            </div>

            <button
              className="redirect-btn"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
