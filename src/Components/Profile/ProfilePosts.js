import React, { useState, useEffect, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { DarkModeContext } from "../../App";

const ProfilePosts = ({ activeTab, userID }) => {
  const [profPosts, setProfPosts] = useState([]);
  const DarkModeSetting = useContext(DarkModeContext);

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/posts/${userID}`, {
      method: "GET",
    })

    const data = await response.json();

    if (!data.success) {
      return;
    }

    setProfPosts(data.posts);
  }

  useEffect(() => {
    getPosts();
  }, [userID]);

  console.log(profPosts);

  return (
    <>
      <div className="proposts">
        <div className="post2-container container text-center">
          {activeTab === "posts" && (
            Array.isArray(profPosts) && profPosts.length > 0 ? (
              <div
                className={`row ${profPosts.length < 3 ? "justify-content-center" : "row-cols-md-3"
                  }`}
              >
                {profPosts.map((item) => {
                  // Check if the `post_url` contains multiple URLs
                  const postUrls = item.post_url.includes(",")
                    ? item.post_url.split(",")
                    : [item.post_url];

                  return (
                    <div
                      key={item._id}
                      className={`col mb-3 ${profPosts.length < 3 ? "col-md-auto" : "col-md"
                        }`}
                    >
                      {postUrls.length > 1 ? (
                        // Carousel for multiple photos
                        <Carousel data-bs-theme={DarkModeSetting.darkMode ? "light" : "dark"}>
                          {postUrls.map((url, index) => (
                            <Carousel.Item key={index}>
                              <img
                                src={url.trim()}
                                alt={`Post ${index + 1}`}
                                className="img-fluid mx-auto my-auto"
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        // Single photo
                        <img
                          src={postUrls[0].trim()}
                          alt="Post"
                          className="img-fluid mx-auto my-auto"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="my-5">
                <h3 className="text-center">No posts to display</h3>
                <p className="fw-light fs-6">Upload your first post to share your moments!</p>
              </div>
            )
          )}
        </div>
      </div>


      {activeTab === "reels" && (
        <div className="proreels my-5">
          <h3 className="text-center">Capture your moment</h3>
          <div type="button" className="fw-semibold text-primary text-center fs-6">Create your first reel</div>
        </div>
      )}

      {activeTab === "saved" && (
        <div className="prosaved my-5">
          <h3 className="text-center">Save</h3>
          <div className="fw-light fs-6 text-center">Save photos and videos that you want to see again.</div>
          <div className="fw-light fs-6">No one is notified, and only you can see what you've saved.</div>
        </div>
      )}

      {activeTab === "tagged" && (
        <div className="protagged my-5">
          <h3 className="text-center">Photos of you</h3>
          <span className="fw-light fs-6">When people tag you in photos, they'll appear here.</span>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
