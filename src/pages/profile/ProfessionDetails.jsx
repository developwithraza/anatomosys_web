import React, { useEffect, useState } from 'react'
import { Button, Form, Select, Input, Checkbox, message } from 'antd'
import { PngImage_Url } from '../../assets/assest_data'
import { Col, Row } from 'react-bootstrap'
import { departmentList, specielist } from '../../services/Anastomosys_service'
import "../../style/loginPage.css"
import "../../style/profile_details.css"
import { Navigate, useNavigate } from 'react-router-dom'
import { filterAllDepartment, filterAllspecialisation, UpdateProfessionDetails, Uploadocument, UploadUserImage, userDetails } from '../../services/api_services'
import { useSelector } from 'react-redux'


function ProfessionDetails() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate=useNavigate()
    const [updateImg, setUpdateImg] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [departmentList, setDepartmentList] = useState([])
    const [specialisationList, setSpecialisationIdList] = useState([])
    const [specialisationId, setSpecialisationId] = useState('')
    const [imageId, setImageId] = useState([])
    const [userInput, setUserInput] = useState({
        Registration_Number: "",
        Hospital_Name: "",
    })




    const deptBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID":  getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
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
        "SessionID":  getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
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
        "SessionID":  getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Registration_Number": userInput.Registration_Number,
        "DepartmentID": departmentId,
        "SpecialisationID": specialisationId,
        "Hospital_Name": userInput.Hospital_Name,
        "Whether_Certificate_Available": imageId != '' ? true : false,
        "ImageID_Array": imageId
    }

    const submithandler = async () => {
        await UpdateProfessionDetails(professionUpdatebody).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status);
                navigate('/main')
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);


        })
    }

    const departmentHandle = (value) => {
        setDepartmentId(value)
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
        <div className='anastomosys_login'>
            <div className="right_background">

            </div>
            <div className="left_background"></div>
            <div className="loginSection">
                <div className="profile_details_titles">
                    <div className="profile_Logo">
                        <img src={PngImage_Url.anastomosys_logo} />
                    </div>
                    <div className="login_heading">
                        <h2>Profession Details</h2>
                        <p>Stay updated on your medical world!</p>
                    </div>

                </div>
                <div className="profile_form">
                    <Form
                        name="create_user"
                        className="create_form"
                        initialValues={{
                            remember: true,
                        }}

                    >
                        <Row>
                            <Col md={6}>

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

                            <Col md={6}>

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

                            <Col md={6}>

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

                                    >
                                        {departmentList.map((option) => (
                                            <Select.Option key={option.DepartmentID} value={option.DepartmentID} label={option.Department_Title}>
                                                {option.Department_Title}
                                            </Select.Option>
                                        ))}

                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col md={6}>

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
                                    >
                                        {specialisationList.map((option) => (
                                            <Select.Option key={option.SpecialisationID} value={option.SpecialisationID} label={option.Specialisation_Title}>
                                                {option.Specialisation_Title}
                                            </Select.Option>
                                        ))}

                                    </Select>

                                </Form.Item>
                            </Col>

                            <Col md={6}>
                                <div className="userImg">
                                    <div className="user_image_upload">
                                        <label for="file-input">
                                            <p>Upload Relevant  Document</p>
                                        </label>

                                        <input id="file-input" type="file" onChange={uploadImgHandler} />
                                    </div>
                                </div>

                            </Col>

                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="continue_btn">
                                    <Form.Item>
                                        <Button type="default"
                                            onClick={submithandler}
                                            className="login-form-button">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="profile_mg">
                                    <img src={PngImage_Url.profile_image} />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default ProfessionDetails
