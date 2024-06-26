import React from "react";
import profposts from "../../JSONS/posts.json";

const ProfilePosts = ({ activeTab }) => {
  return (
    <>
      <div className="proposts">
        <div className="post2-container container text-center">
          <div className="row row-cols-3">
            {activeTab === "posts" &&
              profposts.map((item) => (
                <div className="col mb-3 mx-0" key={item.id}>
                  <img src={item.src} alt="" className="img-fluid" />
                </div>
              ))}
          </div>
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
