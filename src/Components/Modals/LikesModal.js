import React, { useContext } from 'react'
import { UserInfoContext } from '../ProtectedRoute/Protect_Component';

const LikesModal = ({ setlikesModalOpen, likesData }) => {
    const { userName } = useContext(UserInfoContext);

    return (
        <>
            <div className="modal-wrapper d-flex justify-content-center align-items-center">
                <div className="slctmodal d-flex flex-column">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-6" id="exampleModalLabel">
                                Likes
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setlikesModalOpen(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {likesData.length > 0 ? (
                                likesData.map((like, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <img
                                                src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                                                alt="User"
                                                className="rounded-circle"
                                                style={{ width: '37px', height: '37px', objectFit: 'cover', cursor: 'pointer' }}
                                            />
                                            <div className="d-flex flex-column" style={{ cursor: 'pointer' }}>
                                                <span className="fw-semibold" style={{ fontSize: '14px' }}>{like.user_id.username}</span>
                                                <span className="fw-semibold text-muted" style={{ fontSize: '13px' }}>{like.user_id.realname}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No likes yet!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LikesModal