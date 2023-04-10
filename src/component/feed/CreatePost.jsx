import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import CreatePostForm from './CreatePostForm';



function CreatePost({ userData,UserProfileDetails,AllPostLoad }) {
  
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
                Create post
            </p>
      <div className='create_post'>
        <Modal title="Create Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <CreatePostForm handleCancel={handleCancel} AllPostLoad={AllPostLoad}/>
        </Modal>
      </div>
    </div >
  );
}

export default CreatePost