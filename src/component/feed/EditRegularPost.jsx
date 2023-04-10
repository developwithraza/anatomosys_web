import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";

import EditRegularPostForm from './EditRegularPostForm';



function EditRegularPost({ postData, userAllReqularPost }) {
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
        <div className='edit_post'>
            <p className='optionItem'  onClick={showModal}>
                <MdModeEditOutline className='more_option_icon' /> Edit Post
            </p>
            <div className='create_post'>
                <Modal title="Edit Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    <EditRegularPostForm handleCancel={handleCancel} userAllReqularPost={userAllReqularPost} postData={postData} />
                </Modal>
            </div>
        </div >
    );
}


export default EditRegularPost
