import React from "react";
import "./HeaderBanner.less";

const HeaderBanner = ({ size }) => {
  return (
    <div className={`header-banner ${size}`}>
      <div className="header-banner-text">
        <h1 className="heading-huge">Invest With Us</h1>
        <h1 className="heading-huge">Raise Your Capital</h1>
      </div>
      <img src="/assets/images/coins.svg" width={120} alt="Coins" />
    </div>
  );
};

export default HeaderBanner;
