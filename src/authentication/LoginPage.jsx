import React, { useState, useEffect } from 'react'
import ".././style/loginPage.css"

import { PngImage_Url } from '../assets/assest_data'
import { Button, Form, Input, message, DatePicker, Divider } from 'antd';
import { Row, Col, Alert } from 'react-bootstrap'
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthUserContect';
import { FetchPubnubInformation, SplashScreen, userDetails, userProfileInfo, validUser } from '../services/api_services';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, LOGOUT } from '../redux/actions/Action';




function LoginPage() {

    const dispatch = useDispatch()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [loggedUser, setLoggedUser] = useState([])



    const [form] = Form.useForm();
    const [ApiKey, setApiKey] = useState("")
    const [userToken, setUserToken] = useState('')
    const [userId, setUserId] = useState('')
    const [error, setError] = useState('')
    const { googleSignIn, login, logout } = useUserAuth();
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({
        Email: '',
        Password: '',
    })
    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }


    const onFinish = async (e) => {
        await login(userInput.Email, userInput.Password).then(res => {

            setUserToken(res.user.accessToken)
            setUserId(res.user.uid)
        }).catch(err => {
            setError(err.message);
            // console.log(err.message);
        })

    }


    const googleLoginhandle = async () => {
        await googleSignIn().then(res => {
            console.log(res);
            setUserToken(res.user.accessToken)
            setUserId(res.user.uid)
        }).catch(err => {
            setError(err.message);
        })
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const splashBody = {
    //     "DeviceID": "VIVO123",
    //     "DeviceType": 1,
    //     "DeviceName": "VIVO",
    //     "AppVersion": 1

    // }
    // const splashScreenData = async () => {
    //     await SplashScreen(splashBody).then(res => {
    //         console.log("splace screen",res);
    //         if (res.data.success) {
    //             sessionStorage.setItem("user_api_key", JSON.stringify(res.data.extras.Data.ApiKey))
    //             const userInfo = JSON.parse(sessionStorage.getItem('user_api_key') || '{}');
    //             setApiKey(userInfo)
    //             console.log("  userInfo", userInfo);
    //             pubNubData()
    //         }
    //     }).catch(err => {
    //         setError(err.response.data.extras.msg);

    //     })
    // }

    const pubNubData = async () => {
        await FetchPubnubInformation({ "ApiKey": "TESTING123" }).then(res => {
            // console.log("pubNub", res);
            if (res.data.success) {
                sessionStorage.setItem("Pub_Nub", JSON.stringify(res.data.extras.Data))

            }
        }).catch(err => {
            setError(err.response.data.extras.msg);

        })
    }
    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": userDetails.sessionID
    }

    const UserProfileDetails = async () => {
        await userProfileInfo(userBody).then(res => {
            // console.log('auth user detalis', res);
            if (res.data.success) {
                dispatch(LOGIN(res.data.extras.Data))

            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    const validUserBody = {
        "ApiKey": "TESTING123",
        "USERID": userId,
        "accessToken": userToken
    }
    const userCredential = async () => {
        await validUser(validUserBody).then(res => {
            // console.log('valid user', res);
            if (res.data.success) {
                pubNubData()
                dispatch(LOGIN(res.data.extras.Data))
                sessionStorage.setItem("user_data", JSON.stringify(res.data.extras.Data))
                UserProfileDetails()
                navigate('/main')
                // setTimeout(() => {
                //     const data = JSON.parse(sessionStorage.getItem('user_data') || '{}')
                //     if (data.Whether_Basic_Information_Available == true) {
                //         UserProfileDetails()
                //         navigate('/main')
                //     } else {
                //         navigate('/Profile_details')
                //         UserProfileDetails()
                //     }
                // }, 100)

            }
        }).catch(err => {
            setError(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        logout()
        dispatch(LOGOUT())
    }, [])

    useEffect(() => {

        userToken != '' && userCredential()
    }, [userId, userToken])

    return (
        <div className='anastomosys_login'>
            <div className="right_background">
            </div>
            <div className="left_background"></div>
            <div className="loginSection">
                <Row>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Col md={5}>
                        <div className="login_section">
                            <div className="loginPage_title">
                                <div className="logoPageLogo">
                                    <img src={PngImage_Url.anastomosys_logo} />
                                </div>
                            </div>
                            <div className="illustration_imgs">
                                <img src={PngImage_Url.signpage_Illus} />
                            </div>
                        </div>
                    </Col>
                    <Col md={7}>
                        <div className="login_fields">
                            <div className="search_Input">
                                <div className="login_title">
                                    <h2>SignIn</h2>
                                    <p>Stay updated on your medical world!</p>
                                </div>
                                <div className="login_Info">
                                    <Form
                                        form={form}
                                        name="login_user"
                                        className="login_form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Row>
                                            <Col md={12}>

                                                <Form.Item
                                                    name="Email"
                                                    rules={[
                                                        {
                                                            required: true,
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
                                                    name="pasword"
                                                    rules={[
                                                        {
                                                            required: true,
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
                                        <div className="login_btn">
                                            <Form.Item>
                                                <Button type="default"
                                                    htmlType='submit'
                                                    // onClick={submithandler}

                                                    className="login_form_button"
                                                >
                                                    Login
                                                </Button>
                                            </Form.Item>

                                        </div>
                                    </Form>
                                </div>
                                {/* <div className="forget_password">
                                    <Button type='link' >Forget Password</Button>
                                </div> */}
                            </div>

                        </div>
                        <div className="login_divider">
                            <div className="divider_left"></div>
                            <p>OR</p>
                            <div className="divider_left"></div>
                        </div>
                        <div className="other_option">
                            <Button type='default' block
                                onClick={googleLoginhandle}
                            >
                                <div className="opton_button">
                                    <p ><FcGoogle /></p>
                                    <p style={{ color: "red" }}>Login With Google</p>
                                </div>
                            </Button>
                            <Button type='default' block>
                                <div className="opton_button">
                                    <p ><FaFacebook /></p>
                                    <p style={{ color: 'blue' }}>Login With Facebook</p>
                                </div>
                            </Button>
                            <Button type='default' block>
                                <div className="opton_button">
                                    <p><FaApple /></p>
                                    <p style={{ color: 'black' }}>Login With Apple ID</p>
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>

            </div>

        </div>
    )
}

export default LoginPage
