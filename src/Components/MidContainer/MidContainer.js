import React from "react";
import "./MidContainer.css";
import Stories from "./Stories";
import Posts from "./Posts";
import NavbarResize from "./NavbarResize";
import FooterResize from "./FooterResize";

const MidContainer = () => {

  return (
    <div className="mid_container d-flex flex-column">
      <NavbarResize />
      <hr className="navResizeHr"/>
      <Stories />
      <hr className="storiesHr mb-0"/>
      <Posts />
      <FooterResize />
    </div>
  );
};

export default MidContainer;
