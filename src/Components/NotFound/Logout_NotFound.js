import React from "react";
import Insta_Written_Light from "../../Icons (Light Mode)/Insta_WrittenLight.svg";

const Logout_NotFound = ({handlebuttons}) => {
  return (
    <>
      <div className="navcontents d-flex justify-content-evenly align-items-center">
        <div className="logo">
          <img src={Insta_Written_Light} />
        </div>
        
        <div className="login_signup_buttons">
          <div className="buttons d-flex gap-4">
            <button
              type="button"
              className="btn btn-primary btn-sm fw-medium px-3"
              onClick={() => handlebuttons("login")}
            >
              Log In
            </button>
            <div
              type="button"
              className="btn btn-sm fw-medium text-primary"
              style={{ "--bs-btn-border-color": "none" }}
              onClick={() => handlebuttons("signup")}
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout_NotFound;
