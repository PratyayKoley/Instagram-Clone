import React, { useState } from "react";
import stories from "../../JSONS/stories.json";

const Stories = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [watchedStories, setWatchedStories] = useState({});

  const displayTime = 4500;

  const openModal = (image_url) => {
    setImage(image_url);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setWatchedStories({ ...watchedStories, [image_url]: true });
    }, displayTime);
  };

  return (
    <>
      <div className="stories_container d-flex gap-4 flex-nowrap overflow-x-auto position-relative">
        {stories.map((item) => (
          <div
            className="stories d-flex flex-column align-items-center"
            key={item.id}
          >
            <div 
              className={`circle ${watchedStories[item.story_url] ? "watched" : ""}`}
              onClick={() => openModal(item.story_url)}
            >
              <span
                style={{
                  background: `url('${item.dp_url}') top center`,
                  backgroundSize: "cover",
                }}
              ></span>
            </div>
            <span>{item.user_name}</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="imagemodal">
          <div className="content">
            <img className="img-fluid" src={image} alt="modal" />
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
