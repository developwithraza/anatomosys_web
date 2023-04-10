import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import '../../style/feed_post.css'
import { MdOutlineEventNote } from "react-icons/md";
import CreateEventForm from './CreateEventForm';


function AddEvent({ userData, UserProfileDetails }) {
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
    <div className='Add_events'>
      <Button type='default' onClick={showModal}  >
        Add Event
      </Button>
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


export default AddEvent