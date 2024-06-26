import React, { useContext } from "react";
import { DarkModeContext } from "../../App";

const SearchModal = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      <div
        className={`searchmodal offcanvas offcanvas-start ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} rounded-2`}
        data-bs-scroll="true"
        tabIndex="-1"
        id="searchkamodal"
        aria-labelledby="searchOffcanvasLabel"
      >
        <div
          className="offcanvas-header d-flex flex-column align-items-start gap-5"
          data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
        >
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Search
          </h4>

          <div className="searchinput container-fluid">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
                autoFocus
              />
            </form>
          </div>
        </div>
        <hr />
        <div className="offcanvas-body">
          <h6>Recent</h6>
        </div>
      </div>
    </>
  );
};

export default SearchModal;