import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { BsCardImage } from "react-icons/bs";
import CreateImgPostForm from './CreateImgPostForm';



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
            <p onClick={showModal} style={{ cursor: 'pointer' }}>
                <BsCardImage className='camera_icons' /> Image
            </p>
            <div className='create_post'>
                <Modal title="Create Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    <CreateImgPostForm handleCancel={handleCancel} />
                </Modal>
            </div>
        </div >
    );
}

export default CreateImgPost