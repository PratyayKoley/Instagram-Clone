import React from "react";

const Logout_Error = ({handlebuttons}) => {
  return (
    <>
      <div className="errorcontents mt-5 text-center">
        <h4>Sorry, this page isn't available.</h4>
        <p className="fs-6 mt-4">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <span className="link" style={{ color: "#004070" }} onClick={() => {handlebuttons("login")}}>
            Go back to Instagram.
          </span>
        </p>
      </div>
    </>
  );
};

export default Logout_Error;
