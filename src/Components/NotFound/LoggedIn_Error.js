import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/main")
  }
  return (
    <div className="error text-center">
      <h4>Sorry, this page isn't available.</h4>
      <p className="fs-6 mt-4">
        The link you followed may be broken, or the page may have been removed.
          <span className="link" style={{color: "#e0f1ff" }} onClick={handleClick}>
            {" "}
            Go back to Instagram.
          </span>
      </p>
    </div>
  );
};

export default Error;
