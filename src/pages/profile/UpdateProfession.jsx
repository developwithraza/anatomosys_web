import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'antd';
import { MdModeEditOutline } from "react-icons/md";
import UserUpdateForm from './UserUpdateForm';
import '../../style/viewprofile.css'
import UserProfessionForm from './UserProfessionForm';



function UpdateProfession({ userData,UserProfileDetails }) {
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
    <div className='profession_update'>
      <p  onClick={showModal}>
        <MdModeEditOutline className='edit_Cover_img' />
      </p>
      <div className='user_update'>
        <Modal title="Update profession" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
          <UserProfessionForm userData={userData}  UserProfileDetails={UserProfileDetails} handleCancel={handleCancel}/>
        </Modal>
      </div>
    </div >
  );
}


export default UpdateProfession
