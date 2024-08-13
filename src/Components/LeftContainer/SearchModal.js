import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../App";

const SearchModal = () => {
  const navigate = useNavigate();
  const DarkModeSetting = useContext(DarkModeContext);
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const gotoProfile = async (userName) => {
    navigate(`/${userName}`);
    window.location.reload();
  };

  const searchUser = async () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameOfUser: name,
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_LINK}/search-user`,
      RequestOptions
    );

    const data = await response.json();

    setSearchResults(data.profiles);
  };

  useEffect(() => {
    if (name) {
      searchUser();
    }
  }, [name]);

  return (
    <>
      <div
        className={`searchmodal offcanvas offcanvas-start ${
          DarkModeSetting.darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        } rounded-2`}
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
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <hr />
        <div className="offcanvas-body">
          {searchResults.length > 0 ? (
            searchResults.map((profiles) => {
              return (
                <div
                  className="msg d-flex justify-content-between mb-3"
                  key={profiles.id}
                  onClick={() => {
                    gotoProfile(profiles.username);
                  }}
                >
                  <div className="msg-wrap d-flex gap-3">
                    <img
                      src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                      alt="Own_dp"
                    />
                    <span className="followups d-flex flex-column justify-content-center">
                      <span className="acc_name w-100">
                        <strong>{profiles.username}</strong>
                      </span>
                      <span>{profiles.realname}</span>
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <h6>No users Found</h6>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
