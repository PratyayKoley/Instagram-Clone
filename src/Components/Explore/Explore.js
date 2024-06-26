import React, { useContext } from "react";
import LeftContainer from "../LeftContainer/LeftContainer";
import ExploreContents from "./ExploreContents";
import FooterResize from "../MidContainer/FooterResize";
import "./Explore.css";
import { DarkModeContext } from "../../App";

const Explore = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div className={`web_bg ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} w-100 vh-100 d-flex`}>
      <LeftContainer />
      <ExploreContents />
      <div className={`footContainer px-3 position-fixed w-100 bottom-0 ${DarkModeSetting.darkMode ? "bg-black" : "bg-white"}`}>
        <FooterResize />
      </div>
    </div>
  );
};

export default Explore;
