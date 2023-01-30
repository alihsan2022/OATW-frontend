import React from "react";
import loaderGif from "../Assets/loader.gif";
import logo from "../Assets/logo.png";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div className="loading-container">
        <img className="logo" src={logo} />
        <img className="loader" src={loaderGif} />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
