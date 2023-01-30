import React from "react";
import gif from "../../Assets/transparentLoader.gif";
import logo from "../../Assets/logo.png";

const TransparentLoader = () => {
  return (
    <div className="loading">
      <div className="loading-container">
        <img className="logo" src={logo} />
        <img className="loader" src={gif} />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default TransparentLoader;
