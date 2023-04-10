import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";
import EditEducationForm from './EditEducationForm';




function EditEducation({ eduInfo,ShwoAllEductionList }) {
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
      <p  onClick={showModal}>
        <MdModeEditOutline className='edit_education_icon' /> Edit
      </p>
      <div className='create_post'>
        <Modal title="Add My Education" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <EditEducationForm ShwoAllEductionList={ShwoAllEductionList} handleCancel={handleCancel} eduInfo={eduInfo}/>
        </Modal>
      </div>
    </div >
  );
}


export default EditEducation