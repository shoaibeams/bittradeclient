import React from "react";
import "./Logo.less";

const Logo = () => {
  return (
    <div className="logo">
      <img src="/assets/images/go-to.png" width={10} alt="" />
      <span>Bit</span>
      <span className="logo-v">V</span>elocity
    </div>
  );
};

export default Logo;
