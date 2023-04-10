import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { AiFillYoutube } from "react-icons/ai";
import CreateImgPostForm from './CreateImgPostForm';
import CreateVedioPost from './CreateVedioPost';



function CreateImgPost({ userData, UserProfileDetails }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='post_creates'>
            <p onClick={showModal} style={{cursor:'pointer'}}>
            <AiFillYoutube className='camera_icons' /> Video
            </p>
            <div className='create_post'>
                <Modal title="Create Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    <CreateVedioPost handleCancel={handleCancel} />
                </Modal>
            </div>
        </div >
    );
}

export default CreateImgPost