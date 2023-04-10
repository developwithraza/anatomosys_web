import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "../../style/review_request.css"
import { BsSliders } from "react-icons/bs";
import { Input, Button, Divider, message, Alert } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FilterAllReviwer, SendReviewRequest, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import DefaultImg from '../../assets/illustrat_Image/not_img.png'
import TreandingReviewer from '../reviewRequest/TreandingReviewer';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';

function ReviewRequestSend() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()
    const [reviewerList, setReviewerList] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [sendReq, setSendReq] = useState(false)

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Search_Filter": searchInput != "" ? true : false,
        "Search_Input": searchInput,
        "skip": 0,
        "limit": 10

    }
    const ReviewRequestSendList = async () => {
        await FilterAllReviwer(body).then(res => {
            if (res.data.success) {
                setReviewerList(res.data.extras.Data)
                // console.log('all reviewer list', res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        ReviewRequestSendList()
    }, [searchInput])


    const SendReviewRequestMessage = () => {
        setSendReq(true)
        setTimeout(() => {
            setSendReq(false)
        }, 10000)
    }

    const sendReviewRequestHandle = async (UserId) => {
        await SendReviewRequest({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "PublicationID": id,
            "Selected_USERID": UserId
        }).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status)
                // console.log('send review request', res);
                SendReviewRequestMessage()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    return (
        <div className='container review_request'>
            <Row>
                <Col md={8}>
                    <Card>
                        <div className="saveMessage">
                            {sendReq == true && <Alert message="save post in your save post list" action={<Link to={`/send_review_reviewer_list/${id}`}><strong>Go to Send My Reviewer List</strong></Link>} type="success" showIcon closable />}

                        </div>
                        <div className="review_data">
                            <div className="review_request_title">
                                <BiArrowBack style={{ color: 'white', marginRight: '.5rem', cursor: 'pointer' }} onClick={() => navigate(-1)} />
                                <p>Reviewer List</p>
                            </div>
                            <div className="filter_research">
                                <p><span style={{ marginRight: '1rem' }}><BsSliders /></span> </p>
                                <div className="research_search">
                                    <Input placeholder='Search .....' allowClear onChange={(e) => {
                                        setSearchInput(e.target.value);

                                    }
                                    } />
                                </div>
                            </div>
                            <Divider />
                            <div className="review_request_userList">
                                {reviewerList.map((user) => {
                                    return (
                                        <>
                                            {user.USERID != userDetails.userID &&
                                                <>
                                                    <div className="request_send_to_review">
                                                        <div className="review_request_send_list">
                                                            <div className="review_request_send_img">
                                                                {user.Whether_Image_Available == true ? <img src={user.Image_Information.Image550} /> : <img src={DefaultImg} />}
                                                            </div>
                                                            <div className="user_request_send_info">
                                                                <p>{user.Name}</p>
                                                                <p>{user.Whether_Professional_Details_Available == true && user.Specialisation_Title}</p>
                                                                <p>{user.Hospital_Name}</p>
                                                                <p>{user.Bio}</p>
                                                            </div>

                                                        </div>
                                                        <div className="request_send_actions">
                                                            <Button type='default'
                                                                onClick={(UserId) => sendReviewRequestHandle(user.USERID
                                                                )}>Request</Button>
                                                        </div>
                                                    </div>
                                                    <Divider style={{ margin: '.5rem 0' }} />
                                                </>

                                            }
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                    </Card>
                </Col>
                <Col md={4}>
                    <TreandingReviewer />
                </Col>
            </Row>
        </div>
    )
}

export default ReviewRequestSend
