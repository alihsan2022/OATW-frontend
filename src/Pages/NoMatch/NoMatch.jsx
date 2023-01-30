import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Navbars/Footer";
import Header from "../../Components/Navbars/Header";
import {
  increment,
  decrement,
  incrementByAmount,
  verifyUser,
} from "../../Redux/counter";
import "./style.css";

const NoMatch = () => {
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.counter);
  const { isUserVerified } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <div className="errorPage">
        <div className="errorPage-inner">
          <div className="inner-notFound">
            <h5>Page Not Found</h5>
          </div>
          <div className="inner-404">
            <h2>Error 404.</h2>
          </div>
          <div className="inner-broken">
            <span>This page is broken. Go back to the homepage.</span>
          </div>
          <div className="inner-btn">
            <button onClick={() => navigate("/")}>Back to homepage.</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoMatch;
