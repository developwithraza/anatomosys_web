import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import AddEducationForm from './AddEducationForm';
import EditEducationForm from './EditEducationForm';
import EditExperienceForm from './EditExperienceForm';




function EditExperience({ expData,ShwoAllExperinceList }) {
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
        <Modal title="Edit Experience" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <EditExperienceForm ShwoAllExperinceList={ShwoAllExperinceList} handleCancel={handleCancel} expData={expData}/>
        </Modal>
      </div>
    </div >
  );
}



export default EditExperience