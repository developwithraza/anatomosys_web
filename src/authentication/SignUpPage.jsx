import React, { useState } from 'react'
import ".././style/signUpPage.css"
import { PngImage_Url } from '../assets/assest_data'
import { Button, Form, Input, Select, DatePicker, message, Alert } from 'antd';
import { Row, Col } from 'react-bootstrap'
import { useUserAuth } from '../context/AuthUserContect';
import { useNavigate } from 'react-router-dom';



function SignUpPage() {
const navigate=useNavigate()
    const {signup}=useUserAuth()
    const [error,setError]=useState("")
    const [userInput, setUserInput] = useState({
        Email: '',
        Password: '',

    })

    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }

    const submithandler = async () => {
        setError("")
        try {
            await signup(userInput.Email, userInput.Password)
            message.success("create user SuccessFull")
            navigate('/login_page')
            
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='anastomosys_login'>
            <div className="right_background">
            </div>
            <div className="formIllusTration">
                <img src={PngImage_Url.loginPageImage} />
            </div>
            <div className="left_background"></div>


            <div className="loginSection">
                <div className="loginPage_titles">
                    <div className="logoPageLogo">
                        <img src={PngImage_Url.anastomosys_logo} />
                    </div>
                    <div className="login_title">
                        <h2>Sign Up</h2>
                        <p>Stay updated on your medical world!</p>
                    </div>
                </div>
                <div className="login_form_section">
                    <Form
                        name="create_user"
                        className="create_form"
                        initialValues={{
                            remember: true,
                        }}

                    >
                        <Row>
                        {error && <Alert variant='danger' >{error}</Alert>}
                            <Col md={12}>

                                <Form.Item
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            min: 6,
                                            message: 'Please inter Email !',
                                        },

                                    ]}
                                >
                                    <Input
                                        placeholder="EmailId"
                                        value={userInput.Number}
                                        onChange={handleChange("Email")}

                                    />

                                </Form.Item>
                            </Col>
                            <Col md={12}>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            min: 6,
                                            message: 'Please Enter password !',
                                        },

                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        value={userInput.Password}
                                        onChange={handleChange("Password")}

                                    />


                                </Form.Item>
                            </Col>

                        </Row>
                        <div className="continue_btn">
                            <Form.Item>
                                <Button type="default"
                                    onClick={submithandler}
                                    className="login-form-button">
                                    Continue
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>

            </div>

        </div>
    )
}

export default SignUpPage

