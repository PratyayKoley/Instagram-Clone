import React, { useContext, useRef, useState } from "react";
import Post_Modal from "../../Icons/Post_Modal.svg";
import Post_ModalLight from "../../Icons (Light Mode)/Post_ModalLight.svg";
import { DarkModeContext } from "../../App";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";

function PostModal() {
  const DarkModeSetting = useContext(DarkModeContext);
  const { userName } = useContext(UserInfoContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const fileRef = useRef(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve({ file, name: file.name, src: reader.result })
        reader.readAsDataURL(file);
      })
    })

    Promise.all(filePreviews)
      .then((previews) => setSelectedFiles(previews))
  }

  const handleCancel = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, fileIndex) => fileIndex !== index);
      return updatedFiles;
    });
  };

  const handleNextClick = async () => {
    if (selectedFiles.length === 0) {
      alert("No selected files.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(({ file }) => {
      formData.append("file", file);
    });
    formData.append("description", description);
    formData.append("userName", userName);

    console.log([...formData.entries()]);

    const requestOptions = {
      method: "POST",
      body: formData,
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/uploads`, requestOptions);
      const data = await response.json();

      if (!data.success) {
        alert("There was an error submitting the request");
      }

      setSelectedFiles([]);
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Error: ", error);
      alert("Internal Server Error");
    }
  }

  return (
    <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h1 className="modal-title fs-5 fw-semibold" id="exampleModalLabel">
              Create new post
            </h1>
          </div>
          <div className="post_modal modal-body d-flex flex-column align-items-center justify-content-center">
            {selectedFiles.length > 0 ?
              (
                <div className="carousel slide w-100" id="carouselExample" data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}>
                  <div className="carousel-inner">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className={`position-relative carousel-item ${index === 0 ? 'active' : ''}`}
                      >
                        <img
                          src={file.src}
                          alt={file.name}
                          className="w-100 mx-auto d-block rounded-3"
                          style={{ objectFit: "contain", maxHeight: "fit-content" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-4 me-2"
                          onClick={() => handleCancel(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedFiles.length > 1 && (
                    <>
                      <button className="carousel-control-prev my-auto" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{ maxHeight: "fit-content" }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next my-auto" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{ maxHeight: "fit-content" }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}

                  {selectedFiles.length > 0 && (<textarea className="form-control mt-4 rounded" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type the description here..." style={{ resize: "none", padding: "12px", fontSize: "14px" }} />)}
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={
                      DarkModeSetting.darkMode ? Post_Modal : Post_ModalLight
                    }
                    alt="PostModal"
                    className="mx-auto d-block"
                  />
                  <p className="text-muted fs-6">
                    Drag photos and videos here
                  </p>
                  <p className="text-secondary">OR</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Select From Computer
                  </button>
                </div>
              )}
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => { setSelectedFiles([]); setDescription("") }}
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            {selectedFiles.length > 0 && (
              <button type="button" className="btn btn-success px-4" onClick={handleNextClick}>
                Next
              </button>
            )}
          </div>
          <input
            type="file"
            id="post_upload"
            accept="image/*, video/*"
            ref={fileRef}
            multiple
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostModal;
