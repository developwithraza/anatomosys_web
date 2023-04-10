import React, { useEffect, useState } from 'react'
import '../../style/review_request.css'
import Request_Image from "../../assets/illustrat_Image/request1.jpg"
import { Card, Col, Row } from 'react-bootstrap'
import { Button, Form, Input, message } from 'antd'
import { SubmitUserReviewerRequest, Uploadocument, userDetails } from '../../services/api_services'
import Logos from '../../assets/illustrat_Image/logo.png'
import { Navigate, useNavigate } from 'react-router-dom'

function RequestForReview() {
    const [form] = Form.useForm();

    const navigate = useNavigate()
    const [updateImg, setUpdateImg] = useState([])
    const [roleDoc, setRoleDoc] = useState([])
    const [docTitle, setDocTitle] = useState("")
    const [UserRemarks, setUserRemarks] = useState("")
    const [docReview, setDocReview] = useState([])
    let docCount = 1;

    const roleBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "User_Remarks": UserRemarks,
        "Document_Information": roleDoc
    }

    const submithandler = async () => {
        await SubmitUserReviewerRequest(roleBody).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status);
                form.setFieldsValue({ DocumentTitle: "" })
                form.setFieldsValue({ UserRemarks: "" })

                navigate('/main')
                setDocReview([])
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }





    const uploadDocHandler = (e) => {
        setUpdateImg(e.target.files[0]);
        docReview.push(URL.createObjectURL(e.target.files[0]));
       

    }

    const uploadRequestReviewDoc = async () => {
        const fd = new FormData();
        fd.append('file', updateImg)

        await Uploadocument(fd).then(res => {
            if (res.data.success) {
                roleDoc.push({ "DocumentID": res.data.extras.DocumentID, "Document_Title": docTitle })
                form.setFieldsValue({ DocumentTitle: "" })
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    useEffect(() => {

        updateImg != "" && uploadRequestReviewDoc()
    }, [updateImg])



    return (
        <div className='container request_for_review'>
            <Card>
                <div className="request_for_review_section">
                    <Row>
                        <Col md={6}>
                            <div className="request_for_review_img">
                                <img src={Request_Image} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="request_for_review_form">
                                <div className="logos">
                                    <img src={Logos} />
                                </div>
                                <div className="form_titles">
                                    <p>Request for Reviewer</p>
                                </div>
                                <Form
                                    form={form}
                                    name="request_for_review"
                                    className="request_reviews"
                                    initialValues={{
                                        remember: true,
                                    }}

                                >
                                    <Row >
                                        <Col md={12}>

                                            <Form.Item
                                                name="UserRemarks"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter User Remarks !',
                                                    },

                                                ]}
                                            >
                                                <Input
                                                    placeholder="User Remarks"
                                                    value={UserRemarks}
                                                    onChange={(e) => {
                                                        setUserRemarks(e.target.value);
                                                        console.log("UserRemarks", UserRemarks)
                                                    }}

                                                />

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>

                                            <Form.Item
                                                name="DocumentTitle"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter Document Title !',
                                                    },

                                                ]}
                                            >
                                                <Input
                                                    placeholder="Document Title"
                                                    defaultValue={docTitle}
                                                    onChange={(e) => {
                                                        setDocTitle(e.target.value);
                                                        console.log("docTitle", docTitle)
                                                    }}

                                                />

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            {docTitle == "" ? <input type='file' className='inputImg'
                                                onChange={uploadDocHandler} disabled /> : <input type='file' className='inputImg'
                                                    onChange={uploadDocHandler} />}
                                        </Col>
                                        <div className="show_doc">
                                            {docReview != [] && docReview.map((item) => {
                                                return (
                                                    <li>
                                                        <a href={item} target="_blank">{updateImg.name}{docCount++}</a>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </Row>
                                    <div className="review_request_btn">
                                        <Form.Item>
                                            <Button type="primary"
                                                onClick={submithandler}
                                                className="login-form-button">
                                                Send
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>


                </div>
            </Card>
        </div>
    )
}

export default RequestForReview
