import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Form, Input, Select, Button, DatePicker, message } from 'antd'
import { useState } from 'react'
import { Gender_Choise } from '../../services/Anastomosys_service'
import { userDetails, UpateUserInfo } from '../../services/api_services'
import { useSelector } from 'react-redux'

function UserUpdateForm({ userData, UserProfileDetails, handleCancel }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [gender, setGender] = useState(userData.Gender)
    const [Dob, setDob] = useState(userData.DOB)
    const [userInput, setUserInput] = useState({
        Name: userData.Name,
        Bio: userData.Bio,

    })
    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }


    const userUpdatebody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Name": userInput.Name,
        "Bio": userInput.Bio,
        "Gender": gender,
        "DOB": Dob
    }

    const submithandler = async () => {
        await UpateUserInfo(userUpdatebody).then(res => {
            // console.log('update user', res);
            if (res.data.success) {
                message.success(res.data.extras.Status
                );
                UserProfileDetails()
                handleCancel()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    const genderHandle = (value) => {
        setGender(value)
    }
    const cancelhandle = () => {
        handleCancel()

    }
    const onChange = (date, dateString) => {
        setDob(dateString)
    };

    console.log("userData",userData)
    return (
        <div className='user_update_form'>
            <Form
                name="UpdateUser"
                className="update_user"
                initialValues={{
                    remember: true,
                }}
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
                                defaultValue={gender}

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
                            <DatePicker onChange={onChange} className='user_Dob'  />

                        </Form.Item>
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

export default UserUpdateForm
