import { Modal, Input } from 'antd';
import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { Button, Form, message } from 'antd';
import { useEffect } from 'react';
import { EditPostComments, userDetails } from '../../services/api_services';
import '../../style/feed_post.css'
import { useSelector } from 'react-redux';



const EditPostComment = ({ commentData,ShowAllPostComment }) => {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCommentData, setEditCommentData] = useState(commentData.Comment_Information)
    const [showPostBtn, setShowPostBtn] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const editbody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PostID": commentData.PostID,
        "CommentID": commentData.CommentID,
        "Comment_Information": editCommentData
    }

    const submithandler = async () => {
        await EditPostComments(editbody).then(res => {
            // console.log('edit comment post', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                handleCancel()
                ShowAllPostComment()
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }
    
    return (
        <>
            <p className='menuItem' style={{ color: 'green', marginBottom: '0' }} onClick={showModal} >
                <MdModeEditOutline className='comment_option_icon' /> Edit Comment
            </p>
            <Modal
                footer={false}
                title="Edit Post Commnet"
                // width={300}
                open={isModalVisible} onCancel={handleCancel}
            >
                <>
                    <Form

                        layout="vertical"
                        name="create_Driver"
                        className="driver-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div className="edit_comment">
                            <div className="user_img">
                                <img src={commentData.User_Information.Image_Information.Image550
                                } />
                            </div>
                            <div className="Edit_input_Comment">
                                <Input.TextArea
                                    placeholder='Edit a Comment..'
                                    name='comment'
                                    defaultValue={editCommentData}
                                    onChange={(event) => {
                                        setEditCommentData(event.target.value)
                                        setShowPostBtn(true)
                                    }}
                                    autoSize


                                />
                                <div className="comment_post_btn">
                                    {showPostBtn && <Button type='primary' onClick={submithandler}>Post</Button>}
                                </div>
                            </div>
                        </div>
                    </Form>
                </>
            </Modal>
        </>
    );
};


export default EditPostComment
