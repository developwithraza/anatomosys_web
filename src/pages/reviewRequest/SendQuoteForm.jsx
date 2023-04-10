import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SendQoutes, userDetails } from '../../services/api_services';
import '../../style/review_request.css'

function SendQuoteForm({ ReviewRequesrId }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userInput, setUserInput] = useState({
        Amount: null,
        Days: null,

    })


    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handlerSuccessAlert = () => {
        handleCancel()
        navigate('/all_research')

    }
    
    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
        console.log(userInput);
    }

    const sendQuoteBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Review_RequestID": ReviewRequesrId,
        "Amount": parseInt(userInput.Amount) ,
        "Days":parseInt(userInput.Days) 
    }
    console.log(sendQuoteBody);
    const submithandler = async () => {
        await SendQoutes(sendQuoteBody).then(res => {
            console.log('send Quote', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                setIsModalVisible(true)
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);
        })
    }





    return (
        <div className='send_proposal'>
            <Row>
                {isModalVisible == true && <div className="conform_modal">
                    <Modal
                        footer={false}
                        closable={false}
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        width={500}

                        className='successAlert'
                    >
                        <div className="showAlert">
                            <Card >

                                <h2 className='alert_text'>Send Quote Successfully !</h2>
                                <p style={{ fontSize: '1rem', color: 'black' }}>Your Quote is Send . kindly wait while Requester review your request.</p>
                            </Card>
                            <div className="popup_icon">
                                <FaCheck className='success_icon' />
                            </div>
                        </div>
                        <div className="conform_ok_btn">
                            <Button type='primary' onClick={handlerSuccessAlert}>Go To My Research</Button>
                        </div>


                    </Modal>
                </div>


                }
                <div className="login_Info">
                    <Form
                        layout="vertical"
                        name="login_user"
                        className="send_proposal_form"
                        initialValues={{
                            remember: true,
                        }}

                    >
                        <Row>
                            <Col md={12}>

                                <Form.Item
                                    name="Amount"
                                    label="Require Amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Amount !',
                                        },

                                    ]}
                                >
                                    <Input
                                        type='number'
                                        placeholder="Enter Fee Amount"
                                        value={userInput.Amount}
                                        onChange={handleChange("Amount")}

                                    />

                                </Form.Item>
                            </Col>
                            <Col md={12}>

                                <Form.Item
                                    name="Days"
                                    label="Days "

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Days !',
                                        },

                                    ]}
                                >
                                    <Input
                                    type='number'
                                        placeholder="Enter Days"
                                        value={userInput.Days}
                                        onChange={handleChange("Days")}

                                    />


                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </div>

                <div className="proposal_send">
                    <Form.Item>
                        <Button type="default"
                            onClick={submithandler}
                            className="login_form_button">
                            Send
                        </Button>
                    </Form.Item>

                </div>


            </Row>
        </div>
    )
}

export default SendQuoteForm
