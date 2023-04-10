import { Modal } from 'antd';
import React, { useState } from 'react';
import { AiOutlineCamera } from "react-icons/ai";
import { Button, Form, message } from 'antd';
import { useEffect } from 'react';
import { UpdateUserCoverImage, UpdateUserImage, UploadUserImage, userDetails } from '../../services/api_services';
import { useSelector } from 'react-redux';


const UpdateCoverImg = ({ UserProfileDetails, userData }) => {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [updateImg, setUpdateImg] = useState("")
    const [imageId, setImageId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);

    
    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const uploadImgHandler = (e) => {
       
        setUpdateImg(e.target.files[0]);
    }

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

    useEffect(() => {
        updateImg != "" && uploadimageClick()
    }, [updateImg])

    
    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Cover_Picture_Available": imageId!="" ? true : false,
        "ImageID": imageId
    }
    
    const submithandler = async () => {
        const responce = await UpdateUserCoverImage(body)
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

            <p variant="primary" onClick={showModal}>
                <AiOutlineCamera className='edit_Cover_img' />
            </p>
            <Modal
                footer={false}
                title="Update User Cover Image"
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


export default UpdateCoverImg
