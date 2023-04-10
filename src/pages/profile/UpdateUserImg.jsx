import { Modal } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Form, message } from 'antd';
import { useEffect } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { UpdateUserImage, UploadUserImage, userDetails } from '../../services/api_services';
import { useSelector } from 'react-redux';


const UpdateUserImg = ({ UserProfileDetails, userData }) => {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const [updateImg, setUpdateImg] = useState("")
    const [imageId, setImageId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);

  
    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setImageId("")
    };
    const uploadImgHandler = (e) => {
        setUpdateImg(e.target.files[0]);
        // console.log("updateImg", e.target.files[0]);

    }
    useEffect(() => {
        updateImg != "" && uploadimageClick()
    }, [updateImg])
    
    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', updateImg)
        await UploadUserImage(fd).then(res => {
            if (res.data.success) {
                setImageId(res.data.extras.ImageID)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Image_Available": imageId ? true : false,
        "ImageID": imageId
    }
    const submithandler = async () => {
        const responce = await UpdateUserImage(body)
        // console.log(responce);
        if (responce.data.success) {
            message.success(responce.data.extras.Status)
            UserProfileDetails()
            handleCancel()
        } else {
            message.error(responce.data.extras.msg);
        }
    }

    return (
        <>

            <p onClick={showModal}>
                <AiOutlinePlus className='edit_Cover_img' />
            </p>
            <Modal
                footer={false}
                title="Update User Image"
                open={isModalVisible}
                onCancel={handleCancel}
                width={300}

            >
                <>

                    <Form

                        layout="vertical"
                        name="create_Driver"
                        className="driver-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <input type='file' className='inputImg' onChange={uploadImgHandler} />

                        <div className="updateImgBtn">
                            <Form.Item>
                                <Button type='default' onClick={handleCancel}>
                                    cancel
                                </Button>

                            </Form.Item>
                            <Form.Item>
                                <Button type="primary"
                                    onClick={submithandler}
                                    className="login-form-button">
                                    Update
                                </Button>

                            </Form.Item>

                        </div>


                    </Form>
                </>
            </Modal>
        </>
    );
};



export default UpdateUserImg
