import React, { useContext, useEffect, useState } from 'react';
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
    const [newComment, setNewComment] = useState("");
    const dateObject = new Date(selectedPost.createdAt);

    const options = { month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObject);

    const [comments, setComments] = useState([
        { id: 1, userName: "Vishal", com: "Hey Guys", time: "4w" },
        { id: 2, userName: "Pritam", com: "Love you Guys", time: "1w" },
        { id: 3, userName: "Prantik", com: "Bro", time: "3w" },
        { id: 4, userName: "Nikita", com: "Keep it up", time: "1w" },
        { id: 5, userName: "Anushka", com: "Gifts", time: "6w" }
    ]);

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-theme={DarkModeSetting.darkMode ? 'dark' : 'light'}
            style={{ "--bs-modal-width": "80vw" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="row g-0">
                        {/* Image Section */}
                        <div
                            className="col-md-5 d-flex justify-content-center align-items-center"
                            style={{ height: '80vh' }}
                        >
                            {selectedPost && (
                                <img
                                    src={selectedPost.post_url}
                                    alt="Post"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                    }}
                                />
                            )}
                        </div>
                        {/* MetaData Section */}
                        <div className="col-md-7 d-flex flex-column border-start">
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center border-bottom p-3">
                                <div className="d-flex align-items-center gap-2">
                                    <img
                                        src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                        alt="User"
                                        className="rounded-circle"
                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    />
                                    <span className="fw-semibold" style={{ fontSize: '14px' }}>{userName}</span>
                                </div>
                                <img
                                    src={DarkModeSetting.darkMode ? ThreeDots : ThreeDotsLight}
                                    alt="More"
                                    className="cursor-pointer"
                                />
                            </div>

                            {/* Post Description and Comments */}
                            <div className="flex-grow-1 overflow-auto p-3">
                                {selectedPost?.post_desc && (
                                    <div className="d-flex align-items-start gap-2 mb-2">
                                        <img
                                            src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                            alt="User"
                                            className="rounded-circle"
                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <div className='d-flex flex-row gap-2'>
                                                <span className="fw-semibold" style={{ fontSize: "14px" }}>{userName}</span>
                                                <span style={{ fontSize: "14px" }}>{selectedPost.post_desc}</span>
                                            </div>
                                            <div className='fw-light text-muted' style={{ fontSize: "12px" }}>49w</div>
                                        </div>
                                    </div>
                                )}

                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="d-flex align-items-start gap-2 mb-2">
                                            <img
                                                src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                                alt="User"
                                                className="rounded-circle"
                                                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div className='d-flex flex-row gap-2'>
                                                    <span className="fw-semibold" style={{ fontSize: "14px" }}>{comment.userName}</span>
                                                    <span style={{ fontSize: "14px" }}>{comment.com}</span>
                                                </div>
                                                <div className='fw-light text-muted' style={{ fontSize: "12px" }}>{comment.time}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted">No conversations yet.</div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="border-top p-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex gap-3" style={{ cursor: 'pointer' }}>
                                        <img src={DarkModeSetting.darkMode ? Like : LikeLight} alt="Like" />
                                        <img src={DarkModeSetting.darkMode ? Comment : CommentLight} alt="Comment" />
                                        <img src={DarkModeSetting.darkMode ? Share : ShareLight} alt="Share" />
                                    </div>
                                    <img src={DarkModeSetting.darkMode ? Saved : SavedLight} alt="Save" style={{ cursor: "pointer" }} />
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div style={{ cursor: "pointer" }}>
                                        <img src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                            alt="Own_dp" style={{ objectFit: "cover", width: "25px", height: "25px", borderRadius: "50%" }} />
                                        <img src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                            alt="Own_dp" style={{ objectFit: "cover", width: "25px", height: "25px", borderRadius: "50%", marginLeft: "-5px" }} />
                                    </div>
                                    <div style={{ fontSize: "14px" }}>Liked by <strong style={{ cursor: "pointer" }}>sahil_adak</strong> and <strong style={{ cursor: "pointer" }}>4 others</strong></div>
                                </div>
                                <div className='fw-normal text-muted mt-1' style={{ fontSize: "12px" }}>{formattedDate}</div>
                            </div>

                            {/* Add Comment */}
                            <div className="px-3 py-2 border-top">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={DarkModeSetting.darkMode ? Emojis : EmojisLight} alt="Emoji" />
                                    <textarea
                                        rows="1"
                                        value={newComment}
                                        style={{ fontSize: "14px", resize: 'none' }}
                                        className="form-control border-0 bg-transparent fw-light"
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                    />
                                    <div className={`${newComment ? 'text-primary' : 'text-muted'} fw-semibold`} style={{ fontSize: "14px", cursor: newComment ? 'pointer' : 'default', pointerEvents: newComment ? 'auto' : 'none' }}>Post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedPostsModal;
