import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";
import EditEventForm from './EditEventForm';




function EditEvent({ eventData, FilterMyEventLists }) {

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
            <p className='optionItems'  onClick={showModal}>
                <MdModeEditOutline className='more_option_icon' /> Edit Event
            </p>
            <div className='create_post'>
                <Modal title="Edit Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    <EditEventForm handleCancel={handleCancel} FilterMyEventLists={FilterMyEventLists} eventData={eventData} />

                </Modal>
            </div>
        </div >
    );
}




export default EditEvent
