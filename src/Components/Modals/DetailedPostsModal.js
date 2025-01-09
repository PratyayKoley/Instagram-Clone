import React, { useContext, useEffect, useState, useRef } from 'react';
import { DarkModeContext } from '../../App';
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
import LikedRed from "../../Icons/LikedRed.svg";
import { UserInfoContext } from '../ProtectedRoute/Protect_Component';
import { Carousel } from 'react-bootstrap';
import LikesModal from './LikesModal';

const DetailedPostsModal = ({ selectedPost, followersIDs, followingIDs, currentUserID }) => {
    const DarkModeSetting = useContext(DarkModeContext);
    const { userName } = useContext(UserInfoContext);
    const [newComment, setNewComment] = useState("");
    const [postUserName, setPostUserName] = useState("");
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likesData, setLikesData] = useState([]);
    const [likesModalOpen, setLikesModalOpen] = useState(false);
    const textareaRef = useRef(null);
    let formattedDate;

    if (selectedPost) {
        const dateObject = new Date(selectedPost.createdAt);
        const options = { month: "long", day: "numeric" };
        formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObject);
    }

    const getName = async () => {
        try {
            const RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: selectedPost.user_id }),
            }

            const resposne = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/get-user-data-by-id`, RequestOptions);
            const data = await resposne.json();

            if (data.userData) {
                setPostUserName(data.data.username);
            }

        } catch (error) {
            console.error("Error: ", error);
            alert(error);
        }

    }

    const postComment = async () => {
        try {
            const RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: selectedPost._id,
                    commentor_name: userName,
                    comment: newComment.trim(),
                })
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/post-comment`, RequestOptions);

            const data = await response.json();

            if (!data.success) {
                alert("There was an error posting the comment. Please try again later.")
            }
            comments.push(data.commentData);
            setNewComment("");
        }
        catch (error) {
            console.error("Error: ", error);
            alert(error);
        }
    }

    const getAllComments = async () => {
        try {
            const RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_id: selectedPost._id })
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/get-comments`, RequestOptions);

            const data = await response.json();


            if (!data.success) {
                alert("There was an error. No post found.");
            }
            setComments(data.commentData)
        } catch (error) {
            console.error("Error: ", error);
            alert(error);
        }
    }

    const getLiked = async () => {
        try {
            const RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: selectedPost._id,
                    liker_id: currentUserID,
                })
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/isLiked`, RequestOptions);

            const data = await response.json();

            if (!data.success) {
                setLiked(false);
            } else {
                setLiked(true);
            }
        } catch (error) {
            console.error("Error: ", error);
            alert(error);
        }
    }

    const getAllLikes = async () => {
        try {
            const RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_id: selectedPost._id })
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/get-all-likes`, RequestOptions);

            const data = await response.json();

            if (!data.success) {
                alert("There was an error. No post found.");
            }
            setLikesData(data.likesData)
        } catch (error) {
            console.error("Error: ", error);
            alert(error);
        }
    }

    useEffect(() => {
        if (selectedPost) {
            getName();
            getAllComments();
            getLiked();
            getAllLikes();
        }
    }, [selectedPost]);

    const textareafocus = () => {
        textareaRef.current.focus();
    }

    const postUrls = selectedPost?.post_url.includes(",")
        ? selectedPost.post_url.split(",").map((url) => url.trim())
        : [selectedPost?.post_url];

    const postLikes = async () => {
        if (liked) {
            try {
                const RequestOptions = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        post_id: selectedPost._id,
                        liker_id: currentUserID,
                    })
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/post-likes`, RequestOptions);

                const data = await response.json();

                if (!data.success) {
                    alert("Invalid Post ID or User ID");
                } else {
                    setLiked(false);
                }
            } catch (error) {
                console.error("Error: ", error);
                alert(error);
            }
        } else {
            try {
                const RequestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        post_id: selectedPost._id,
                        liker_id: currentUserID
                    })
                }
                const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/post-likes`, RequestOptions);

                const data = await response.json();

                if (!data.success) {
                    alert("Invalid Post ID or User ID");
                } else {
                    setLiked(true);
                }
            } catch (error) {
                console.error("Error: ", error);
                alert(error);
            }
        }
    }

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
                            className="col-md-5 d-flex justify-content-center align-items-center h-auto"
                            style={{ height: '80vh' }}
                        >
                            {postUrls.length > 1 ? (
                                <Carousel data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"} controls={false}>
                                    {postUrls.map((url, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={url}
                                                alt={`Slide ${index + 1}`}
                                                className="img-fluid mx-auto my-auto"
                                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={postUrls[0]}
                                    alt="Post"
                                    className="img-fluid"
                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
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
                                    <span className="fw-semibold" style={{ fontSize: '14px' }}>{postUserName}</span>
                                </div>
                                <img
                                    src={DarkModeSetting.darkMode ? ThreeDots : ThreeDotsLight}
                                    alt="More"
                                    className="cursor-pointer"
                                />
                            </div>

                            {/* Post Description and Comments */}
                            <div className="flex-grow-1 overflow-auto p-3" style={{ height: "60vh", maxHeight: "60vh" }}>
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
                                                <span className="fw-semibold" style={{ fontSize: "14px" }}>{postUserName}</span>
                                                <span style={{ fontSize: "14px" }}>{selectedPost.post_desc}</span>
                                            </div>
                                            <div className='fw-light text-muted' style={{ fontSize: "12px" }}>49w</div>
                                        </div>
                                    </div>
                                )}

                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment._id} className="d-flex align-items-start gap-2 mb-2">
                                            <img
                                                src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                                alt="User"
                                                className="rounded-circle"
                                                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div className='d-flex flex-row gap-2'>
                                                    <span className="fw-semibold" style={{ fontSize: "14px" }}>{comment.user_name}</span>
                                                    <span style={{ fontSize: "14px" }}>{comment.comment_desc}</span>
                                                </div>
                                                <div className='fw-light text-muted' style={{ fontSize: "12px" }}>12w</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className="text-center fw-bold fs-5">No comments yet.</div>
                                        <div className='text-muted text-center' style={{ fontSize: "14px" }}>Start the conversation.</div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="border-top p-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex gap-3" style={{ cursor: 'pointer' }}>
                                        <img src={liked ? (LikedRed) : (DarkModeSetting.darkMode ? Like : LikeLight)} alt="Like" onClick={postLikes} />
                                        <img src={DarkModeSetting.darkMode ? Comment : CommentLight} alt="Comment" onClick={textareafocus} />
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
                                    {likesData.length > 0 ? (
                                        <div style={{ fontSize: "14px" }}>
                                            {likesData.find(
                                                (like) =>
                                                    followersIDs.includes(like.user_id._id) ||
                                                    followingIDs.includes(like.user_id._id)
                                            ) ? (
                                                <>
                                                    Liked by{" "}
                                                    <span className='fw-semibold' style={{ cursor: "pointer" }}>
                                                        {likesData.find(
                                                            (like) =>
                                                                followersIDs.includes(like.user_id._id) ||
                                                                followingIDs.includes(like.user_id._id)
                                                        )?.user_id.username}
                                                    </span>{" "}
                                                    and{" "}
                                                    <span className='fw-semibold' style={{ cursor: "pointer" }} onClick={() => setLikesModalOpen(true)}>
                                                        {likesData.length - 1} others
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <strong style={{ cursor: "pointer" }}>
                                                        {likesData.length} likes
                                                    </strong>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        "Be the first one to like it"
                                    )}
                                </div>
                                <div className='fw-normal text-muted mt-1' style={{ fontSize: "12px" }}>{formattedDate}</div>
                            </div>

                            {/* Add Comment */}
                            <div className="px-3 py-2 border-top">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={DarkModeSetting.darkMode ? Emojis : EmojisLight} alt="Emoji" />
                                    <textarea
                                        ref={textareaRef}
                                        rows="1"
                                        value={newComment}
                                        style={{ fontSize: "14px", resize: 'none' }}
                                        className="form-control border-0 bg-transparent fw-light"
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                    />
                                    <div onClick={postComment} className={`${newComment ? 'text-primary' : 'text-muted'} fw-semibold`} style={{ fontSize: "14px", cursor: newComment ? 'pointer' : 'default', pointerEvents: newComment ? 'auto' : 'none' }}>Post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {likesModalOpen && <LikesModal setlikesModalOpen={setLikesModalOpen} likesData={likesData} />}
        </div >
    );
};

export default DetailedPostsModal;
