import { Button, message } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { AcceptQoutesRequest, MyResearchDetails, PublishPaper, RejectQoutesRequest, ReviewRequestsDetail, userDetails } from '../../services/api_services';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import '../../style/researchpublic.css'
import { Publication_Status, request_status } from '../../services/Anastomosys_service';
import HTMLReactParser from 'html-react-parser';
import { HiOutlineDocumentText } from "react-icons/hi";
import { useSelector } from 'react-redux';

function ReviewRequestsDetails() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    let doc = 0;
    const navigate = useNavigate()
    const { id } = useParams()
    const [reviewRequestList, setReviewRequestList] = useState([])
    const [pubInfo, setPubInfo] = useState([])
    const [showQoute, setShowQoute] = useState(false)

    const requestDetailsBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Review_RequestID": id
    }


    const showReviewRequestDetails = async () => {
        await ReviewRequestsDetail(requestDetailsBody).then(res => {
            // console.log('send review request details', res);
            if (res.data.success) {
                setReviewRequestList(res.data.extras.Data)
                setPubInfo(res.data.extras.Data.Publication_Information)
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }
    useEffect(() => {
        showReviewRequestDetails()
    }, [])

    const handleViewQoute = () => {
        setShowQoute((pre) => !pre)
    }

    const QouteAcceptHandle = async (ReviewId) => {
        await AcceptQoutesRequest({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Review_RequestID": ReviewId
        }).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status)
                showReviewRequestDetails()
                // console.log("accept qoute request", res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    const QouteRejectHandle = async (ReviewId) => {
        await RejectQoutesRequest({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Review_RequestID": ReviewId
        }).then(res => {
            // console.log('send review request', res);
            if (res.data.success) {
                message.success(res.data.extras.Status)
                showReviewRequestDetails()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }


    return (
        <div className='container review_request_details_section'>
            <Row>
                <Col md={8}>
                    <div className="request_review_details">
                        <Card>
                            <div className="review_request_details_title">
                                <p>{pubInfo.Publication_Title}</p>
                            </div>
                            <div className="request_details_img">
                                {pubInfo.Whether_Image_Available == true ? <img src={pubInfo.Image_Information.Image550} /> :
                                    <img src={Empty_Img} />
                                }
                            </div>
                            <div className="review_request_topic">
                                <Card>
                                    <p>Review Request Status: {request_status[reviewRequestList.Request_Status]} </p>
                                </Card>
                            </div>
                            <div className="request_details_summary">
                                <Card>
                                    <p style={{ fontWeight: '600', marginBottom: '1rem' }}>About the research</p>
                                    <p>{HTMLReactParser(String(pubInfo.Publication_Description))}</p>

                                </Card>
                            </div>
                            <div className="proposal_available">
                                <p>Publication Status : {Publication_Status[pubInfo.Publication_Status]}</p>
                            </div>
                            <div className="attechment">
                                {pubInfo.Whether_Document_Available == true && pubInfo.Document_Information.map((docs) => {
                                    return (
                                        <div className='publish_docs'>
                                            <a href={docs.Document_URL}><HiOutlineDocumentText style={{ marginTop: '-.5rem' }} /> Attechment {doc + 1}</a>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="view_qoutes">
                                <Button type='primary' onClick={handleViewQoute}>View Quotes</Button>
                            </div>
                            {showQoute == true &&
                                <div className="show_qoutes_btn">
                                    {reviewRequestList.Request_Status == 1 && <p>No Qoute Available</p>}
                                    {reviewRequestList.Request_Status == 3 && <p style={{ color: 'green' }}>Qoute Accepted </p>}
                                    {reviewRequestList.Request_Status == 4 && <p style={{ color: 'red' }}>Qoute Rejected </p>}
                                    {reviewRequestList.Request_Status == 5 && <p style={{ color: 'blue' }}>Review Successfully </p>}
                                    {reviewRequestList.Request_Status == 6 && <p style={{ color: 'orange' }}>Rejected by Reviewer </p>}

                                    {
                                        reviewRequestList.Request_Status == 2 && <div className="request_send_action">
                                            <div className="qoute_info">
                                                <p>Qoute Information</p>
                                            </div>
                                            <div className="qoute_data">
                                                <p>fee start : ₹ {reviewRequestList.Amount} </p>
                                                <p>Duration :  {reviewRequestList.Days} Days </p>
                                            </div>
                                            <div className="qoute_action">
                                                <Button type='primary'
                                                    id='review_request_payment'
                                                    onClick={(ReviwerId) => QouteAcceptHandle(reviewRequestList.Review_RequestID)}>
                                                    Pay Now
                                                </Button>
                                                <Button type='default'
                                                    onClick={(ReviewId) => QouteRejectHandle(reviewRequestList.Review_RequestID)}>
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    }

                                </div>
                            }
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}



export default ReviewRequestsDetails