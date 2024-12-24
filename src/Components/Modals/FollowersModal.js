import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../App";

const FollowersModal = ({ followersIDs }) => {
  const [followers, setFollowers] = useState([]);
  const DarkModeSetting = useContext(DarkModeContext);

  useEffect(() => {
    const setFollowersData = async () => {
      try {
        const allFollowers = await Promise.all(
          followersIDs.map(async (id) => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/get-user-data-by-id`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: id }),
            });

            const data = await response.json();

            if (!data.userData) {
              return [];
            }
            return data.data || [];
          })
        )

        const flattenedFollowers = allFollowers.flat();
        setFollowers(flattenedFollowers);
      } catch (error) {
        console.error("Error: ", error)
        alert(error.message);
      }
    }

    if (Array.isArray(followersIDs) && followersIDs.length > 0) {
      setFollowersData();
    }
  }, [followersIDs]);

  return (
    <>
      <div
        className="modal fade"
        id="followersModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "none" }}
        data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Followers
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  document.activeElement.blur(); // Reset focus on close
                }}
              ></button>
            </div>
            <div className="modal-body">
              {followers.length > 0 && (
                <form class="d-flex" role="search">
                  <input class="form-control me-2 w-100 fw-light fs-6" type="search" placeholder="Search" aria-label="Search" style={{ background: "rgb(54 54 54)" }} />
                </form>
              )}

              {followers.length > 0 ? (
                followers.map((follower, index) => (
                  <div key={index} className="mt-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                        alt="User"
                        className="rounded-circle"
                        style={{ width: '37px', height: '37px', objectFit: 'cover', cursor: 'pointer' }}
                      />
                      <div className="d-flex flex-column" style={{ cursor: 'pointer' }}>
                        <span className="fw-semibold" style={{ fontSize: '14px' }}>{follower.username}</span>
                        <span className="fw-semibold text-muted" style={{ fontSize: '13px' }}>{follower.realname}</span>
                      </div>
                    </div>
                    <div className="btn remove-button me-2">Remove</div>
                  </div>
                ))
              ) : (
                <p className="mt-3 text-center">No followers found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowersModal;