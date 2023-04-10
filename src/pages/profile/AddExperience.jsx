import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { AiOutlinePlus } from "react-icons/ai";
import AddExperienceForm from './AddExperienceForm';




function AddExperience({  ShwoAllExperinceList }) {
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
      <p className='optionItem' onClick={showModal}>
        <AiOutlinePlus className='research_public_icons' />

      </p>
      <div className='create_post'>
        <Modal title="Add My Experience" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <AddExperienceForm ShwoAllExperinceList={ShwoAllExperinceList} handleCancel={handleCancel}/>
        </Modal>
      </div>
    </div >
  );
}



export default AddExperience