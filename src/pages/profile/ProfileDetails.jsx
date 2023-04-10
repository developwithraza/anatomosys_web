import React, { useState,useEffect } from 'react'
import { Button, Form, Select, Input, Checkbox, DatePicker, message } from 'antd'
import { PngImage_Url } from '../../assets/assest_data'
import { Col, Row } from 'react-bootstrap'
import { departmentList, Gender_Choise, specielist } from '../../services/Anastomosys_service'
import "../../style/loginPage.css"
import "../../style/profile_details.css"
import { useNavigate } from 'react-router-dom'
import { UpateUserInfo, userDetails } from '../../services/api_services'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../redux/actions/Action'
import { useUserAuth } from '../../context/AuthUserContect'


function ProfileDetails() {
    const dispatch = useDispatch()

    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const { googleSignIn, login,logout } = useUserAuth();

    const navigate = useNavigate()
    const [gender, setGender] = useState(null)
    const [Dob, setDob] = useState('')
    const [userInput, setUserInput] = useState({
        Name: "",
        Bio: "",

    })
    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }


    const userUpdatebody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID":  getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Name": userInput.Name,
        "Bio": userInput.Bio,
        "Gender": gender,
        "DOB": Dob
    }

    const onFinish = async () => {
        await UpateUserInfo(userUpdatebody).then(res => {
            // console.log('update user', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                navigate('/profession_details')
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const genderHandle = (value) => {
        setGender(value)
    }

    const onChange = (date, dateString) => {
        setDob(dateString)
    };
    // useEffect(()=>{
    //     logout()
    //     dispatch(LOGOUT())
    // },[])

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
                        <h2>Profile Details</h2>
                        <p>Stay updated on your medical world!</p>
                    </div>

                </div>
                <div className="user_profile_datas">
                    <Row>
                        <Col md={6}>
                            <div className="profile_img">
                                <img src={PngImage_Url.profile_image} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="profile_form">
                                <Form
                                    name="UpdateUser"
                                    className="update_user"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Row >
                                        <Col md={12}>

                                            <Form.Item
                                                name="Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please inter name !',
                                                    },

                                                ]}
                                            >
                                                <Input
                                                    placeholder="Name"
                                                    defaultValue={userInput.Name}
                                                    onChange={handleChange("Name")}

                                                />

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>

                                            <Form.Item
                                                name="Bio"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Maximum bio legth 120 char !',
                                                        max: 120
                                                    },

                                                ]}
                                            >
                                                <Input
                                                    placeholder="Bio"
                                                    defaultValue={userInput.Bio}
                                                    onChange={handleChange("Bio")}

                                                />

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>

                                            <Form.Item
                                                name="gender"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please inter Emagenderil !',
                                                    },

                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Select Gender"
                                                    optionFilterProp="children"
                                                    onChange={genderHandle}
                                                    allowClear={true}

                                                >
                                                    {Gender_Choise.map((option) => (
                                                        <Select.Option key={option.key} value={option.key} label={option.values}>
                                                            {option.values}
                                                        </Select.Option>
                                                    ))}

                                                </Select>

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>

                                            <Form.Item
                                                name="Dob"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter DOB !',
                                                    },

                                                ]}
                                            >
                                                <DatePicker onChange={onChange} className='user_Dob' />

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="fillUserDetals">
                                            <Form.Item>
                                                <Button type="primary"
                                                    htmlType="submit"
                                                    // onClick={submithandler}
                                                    className="login-form-button">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </div>

                                    </Row>

                                </Form>
                            </div>
                        </Col>
                    </Row>

                </div>

            </div>

        </div>
    )
}




export default ProfileDetails
