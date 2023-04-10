import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import AddEducationForm from './AddEducationForm';




function AddEducation({  ShwoAllEductionList }) {
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
        <Modal title="Add My Education" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <AddEducationForm ShwoAllEductionList={ShwoAllEductionList} handleCancel={handleCancel}/>
        </Modal>
      </div>
    </div >
  );
}


export default AddEducation