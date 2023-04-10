import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, DatePicker, message, Upload } from 'antd'
import { useState } from 'react'
import { Gender_Choise } from '../../services/Anastomosys_service'
import { userDetails, UpateUserInfo, filterAllDepartment, filterAllspecialisation, UploadUserImage, UpdateProfessionDetails } from '../../services/api_services'
import { useEffect } from 'react'
import { async } from '@firebase/util'
import { useSelector } from 'react-redux';

function UserProfessionForm({ userData, UserProfileDetails, handleCancel }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [updateImg, setUpdateImg] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [departmentList, setDepartmentList] = useState([])
    const [specialisationList, setSpecialisationIdList] = useState([])
    const [specialisationId, setSpecialisationId] = useState('')
    const [imageId, setImageId] = useState([])
    const [userInput, setUserInput] = useState({
        Registration_Number: userData.Registration_Number,
        Hospital_Name: userData.Hospital_Name,
    })




    const deptBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Search_Filter": false,
        "Search_Input": "",
        "skip": 0,
        "limit": 10
    }
    const ListAllDepartment = async () => {
        await filterAllDepartment(deptBody).then(res => {
            // console.log('department', res);
            if (res.data.success) {
                setDepartmentList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    const speceliseBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "DepartmentID": departmentId,
        "Whether_Search_Filter": false,
        "Search_Input": "",
        "skip": 0,
        "limit": 10
    }

    const ListAllspecialist = async () => {
        await filterAllspecialisation(speceliseBody).then(res => {
            // console.log('specialisation', res);
            if (res.data.success) {
                setSpecialisationIdList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        ListAllDepartment()
    }, [])

    useEffect(() => {
        ListAllspecialist()
    }, [departmentId])

    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }


    const professionUpdatebody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Registration_Number": userInput.Registration_Number,
        "DepartmentID": departmentId,
        "SpecialisationID": specialisationId,
        "Hospital_Name": userInput.Hospital_Name,
        "Whether_Certificate_Available": imageId != '' ? true : false,
        "ImageID_Array": imageId
    }

    const submithandler = async () => {
        await UpdateProfessionDetails(professionUpdatebody).then(res => {
            // console.log('update user', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                UserProfileDetails()
                handleCancel()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }

    const departmentHandle = (value) => {
        setDepartmentId(value)
    }
    const cancelhandle = () => {
        handleCancel()

    }
    const SpecialisationHandle = (value) => {
        setSpecialisationId(value)
    };


    const uploadImgHandler = (e) => {
        setUpdateImg(e.target.files[0]);
    }

    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', updateImg)

        await UploadUserImage(fd).then(res => {
            if (res.data.success) {
                imageId.push(res.data.extras.ImageID)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        updateImg != "" && uploadimageClick()
    }, [updateImg])
    

    return (
        <div className='user_update_form'>
            <Form
                name="UpdateProfession"
                className="update_profession"
                initialValues={{
                    remember: true,
                }}

            >
                <Row >
                    <Col md={12}>

                        <Form.Item
                            name="Registration_Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please inter Registration_Number !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Registration_Number"
                                defaultValue={userInput.Registration_Number}
                                onChange={handleChange("Registration_Number")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={12}>

                        <Form.Item
                            name="Hospital_Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Hospital_Name !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Hospital_Name"
                                defaultValue={userInput.Hospital_Name}
                                onChange={handleChange("Hospital_Name")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            name="Department"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Department !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Department"
                                optionFilterProp="children"
                                onChange={departmentHandle}
                                allowClear={true}
                                
                                defaultValue={userData.DepartmentID}

                            >
                                {departmentList.map((option) => (
                                    <Select.Option key={option.DepartmentID} value={option.DepartmentID} label={option.Department_Title}>
                                        {option.Department_Title}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={12}>

                        <Form.Item
                            name="Specialisation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Specialisation !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Specialisation"
                                optionFilterProp="children"
                                onChange={SpecialisationHandle}
                                allowClear={true}
                                 defaultValue={userData.SpecialisationID}
                            >
                                {specialisationList.map((option) => (
                                    <Select.Option key={option.SpecialisationID} value={option.SpecialisationID} label={option.Specialisation_Title}>
                                        {option.Specialisation_Title}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <input type='file' className='inputImg' onChange={uploadImgHandler} />
                    </Col>
                </Row>
                <div className="userUpdateBtn">
                    <Form.Item>
                        <Button
                            onClick={cancelhandle}
                        >
                            Cancel
                        </Button>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                            onClick={submithandler}
                            className="login-form-button">
                            update
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default UserProfessionForm
