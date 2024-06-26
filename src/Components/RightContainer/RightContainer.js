import React from "react";
import "./RightContainer.css";
import Suggested from "./Suggested";
import OwnAccount from "./OwnAccount";
import Footer from "./Footer";

const RightContainer = () => {
  return (
    <div className="right_container flex-column align-items-center">
      <OwnAccount />
      <Suggested />
      <Footer />
    </div>
  );
};

export default RightContainer;
