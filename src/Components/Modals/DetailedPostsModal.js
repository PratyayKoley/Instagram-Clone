import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from '../../App';
import { UserInfoContext } from '../ProtectedRoute/Protect_Component';
import ThreeDots from "../../Icons/ThreeDots.svg";
import ThreeDotsLight from "../../Icons (Light Mode)/ThreeDotsLight.svg";
import Like from "../../Icons/Like.svg";
import LikeLight from "../../Icons (Light Mode)/LikeLight.svg";
import Comment from "../../Icons/Comment.svg";
import CommentLight from "../../Icons (Light Mode)/CommentLight.svg";
import Share from "../../Icons/Share.svg";
import ShareLight from "../../Icons (Light Mode)/ShareLight.svg";
import Saved from "../../Icons/Saved.svg";
import SavedLight from "../../Icons (Light Mode)/SavedLight.svg";
import Emojis from "../../Icons/Emojis.svg";
import EmojisLight from "../../Icons (Light Mode)/EmojisLight.svg";

const DetailedPostsModal = ({ selectedPost }) => {
    const DarkModeSetting = useContext(DarkModeContext);
    const { userName } = useContext(UserInfoContext);
    const [imgOrientation, setImgOrientation] = useState(null);

    useEffect(() => {
        if (selectedPost) {
            const img = new Image();
            img.src = selectedPost.post_url;
            img.onload = () => {
                if (img.naturalWidth > img.naturalHeight) {
                    setImgOrientation("landscape");
                } else {
                    setImgOrientation("portrait");
                }
            }
        }
    })

    const [comments, setComments] = useState([
        { id: 1, userName: "Vishal", com: "Hey Guys", time: "4w" },
        { id: 2, userName: "Pritam", com: "Love you Guys", time: "1w" },
        { id: 3, userName: "Prantik", com: "Bro", time: "3w" },
        { id: 4, userName: "Nikita", com: "Keep it up", time: "1w" },
        { id: 5, userName: "Anushka", com: "Gifts", time: "6w" }
    ])

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
            style={{ "--bs-modal-width": "75rem" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content d-flex flex-row">
                    <div
                        className="imageBox position-relative overflow-hidden w-50"
                        style={{ height: "90vh" }}
                    >
                        {selectedPost && (
                            <img
                                src={selectedPost.post_url}
                                alt="Post"
                                className="img-fluid"
                                style={{
                                    width: "100%", 
                                    height: "100%",
                                    objectFit: imgOrientation === "landscape" ? 'contain' : 'cover',
                                    objectPosition: "center",
                                }}
                            />
                        )}
                    </div>
                    {/* MetaData Section */}
                    <div className="border-start flex-grow-1">
                        <div className="border-bottom d-flex flex-row justify-content-between align-items-center p-3">
                            <div className='d-flex align-items-center gap-2' style={{ cursor: "pointer" }}>
                                <div>
                                    <img
                                        src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                        alt="Own_dp"
                                        style={{ objectFit: "cover", width: "32px", height: "32px", borderRadius: "50%" }}
                                    />
                                </div>
                                <div className='fw-semibold' style={{ fontSize: "14px" }}>lafz_dil_ke_0</div>
                            </div>
                            <div>
                                <img src={DarkModeSetting.darkMode ? ThreeDots : ThreeDotsLight} style={{ cursor: "pointer" }} alt='More' />
                            </div>
                        </div>

                        {selectedPost && (
                            <div className="p-3 border-bottom" style={{ height: "60vh" }}>
                                {selectedPost.post_desc || comments.length > 0 ? (
                                    <>
                                        {/* Post Description */}
                                        {selectedPost.post_desc && (
                                            <div className='d-flex align-items-center gap-2' style={{ cursor: "pointer" }}>
                                                <div>
                                                    <img
                                                        src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                                        alt="Own_dp"
                                                        style={{ objectFit: "cover", width: "32px", height: "32px", borderRadius: "50%" }}
                                                    />
                                                </div>
                                                <div>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <div className='fw-semibold' style={{ fontSize: "14px" }}>{userName}</div>
                                                        <div className='fw-normal' style={{ fontSize: "14px" }}>{selectedPost.post_desc}</div>
                                                    </div>
                                                    <div className='fw-light text-muted' style={{ fontSize: "12px" }}>49w</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Comments */}
                                        {comments.length > 0 && (
                                            <div>
                                                {comments.slice(0, 4).map((comment) => (
                                                    <div key={comment.id} className="py-2">
                                                        <div className='d-flex align-items-center gap-2' style={{ cursor: "pointer" }}>
                                                            <div>
                                                                <img src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                                                    alt="Own_dp" style={{ objectFit: "cover", width: "32px", height: "32px", borderRadius: "50%" }} />
                                                            </div>
                                                            <div>
                                                                <div className='d-flex flex-row gap-2'>
                                                                    <span className='fw-semibold' style={{ fontSize: "14px" }}>{comment.userName}</span>
                                                                    <span className='fw-normal' style={{ fontSize: "14px" }}>{comment.com}</span>
                                                                </div>
                                                                <div className='fw-light text-muted' style={{ fontSize: "12px" }}>{comment.time}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center text-muted">
                                        No conversations yet.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="likedSection p-3 border-bottom">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className='d-flex gap-3 flex-row' style={{ cursor: "pointer" }}>
                                    <img src={DarkModeSetting.darkMode ? Like : LikeLight} alt='Like' />
                                    <img src={DarkModeSetting.darkMode ? Comment : CommentLight} alt='Comment' />
                                    <img src={DarkModeSetting.darkMode ? Share : ShareLight} alt='Share' />
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                    <img src={DarkModeSetting.darkMode ? Saved : SavedLight} alt='Save' />
                                </div>
                            </div>

                            <div className="mt-2 d-flex align-items-center gap-1">
                                <div>
                                    <img src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                        alt="Own_dp" style={{ objectFit: "cover", width: "25px", height: "25px", borderRadius: "50%" }} />
                                    <img src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                        alt="Own_dp" style={{ objectFit: "cover", width: "25px", height: "25px", borderRadius: "50%", marginLeft: "-5px" }} />
                                </div>
                                <div style={{ fontSize: "14px" }}>Liked by <span className='fw-semibold'>sahil_adak</span> and <span className='fw-semibold'>4 others</span></div>
                            </div>
                            <span className='fw-light text-muted' style={{ fontSize: "13px" }}>January 12</span>
                        </div>

                        <div className='px-3'>
                            <div className="d-flex">
                                <img src={DarkModeSetting.darkMode ? Emojis : EmojisLight} alt="Emojis" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedPostsModal;