import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Navbars/Header";
import Footer from "../../Components/Navbars/Footer";
import { Outlet, Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import ReCAPTCHA from "react-google-recaptcha";
import loadjs from "loadjs";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, login, logout } from "../../Redux/userAuth";
import counter from "../../Redux/counter";
import Captch from "./ProfileMenu/Captch";
import axios from "axios";
const Login = () => {
  /////////////////REDUX///////////////
  const dispatch = useDispatch();
  /////////////////REDUX///////////////
  const captchaRef = useRef(null);

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
            setLoggedIn(true);
            if (loggedIn) {
              navigate("/profile");
            }
            navigate("/profile");
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

    // if (email.length === 0 || password.length === 0) {
    //   setLoading(false);
    //   setError("Invalid username or password.");
    //   setLoggedIn(false);

    //   console.log(error);
    // } else {
    //   await axios
    //     .post("https://oatw-server-draz.vercel.app/verifyCaptchaKey", {
    //       token: token,
    //     })
    //     .then(async (res) => {
    //       console.log(res.data);
    //       if (res.data) {
    //         setError("");
    //         try {
    //           const res = await signInWithEmailAndPassword(
    //             auth,
    //             email,
    //             password
    //           );
    //           if (res.error) {
    //             setError("Invalid username or password.");
    //             setLoading(false);
    //           } else {
    //             setLoggedIn(true);
    //             if (loggedIn) {
    //               navigate("/profile");
    //             }
    //             navigate("/profile");
    //           }
    //         } catch (error) {
    //           setLoading(false);
    //           setError("Invalid username or password.");
    //           setLoggedIn(false);
    //           console.log(error.code);
    //           if (error.code === "auth/wrong-password") {
    //             setError("Invalid username or password.");
    //           } else if (error.code === "auth/too-many-requests") {
    //             setError("Please wait before you attempt to login again.");
    //           }
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       setError("Failed captcha challenge.");
    //       setLoggedIn(false);

    //       console.log(error);
    //     });
    //}
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  function onChange(value) {
    console.log("Captcha value:", value);
  }

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
