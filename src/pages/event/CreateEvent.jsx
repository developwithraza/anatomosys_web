import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdOutlineEventNote } from "react-icons/md";
import CreateEventForm from './CreateEventForm';


function CreatePost({ userData, UserProfileDetails }) {
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
        <MdOutlineEventNote className='camera_icons' /> Event
      </p>
      <div className='create_post'>
        <Modal title="Create Event" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} style={{
          top: 20,
        }}>
          <CreateEventForm handleCancel={handleCancel} />
        </Modal>
      </div>
    </div >
  );
}

export default CreatePost