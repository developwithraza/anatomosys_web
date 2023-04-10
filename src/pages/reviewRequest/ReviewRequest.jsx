import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "../../style/review_request.css"
import { BsSliders } from "react-icons/bs";
import { message, Button, Divider, Result, Empty } from 'antd';
import { fakeUserList } from '../../services/Anastomosys_service';
import { Link, useNavigate } from 'react-router-dom';
import { FilterAllReceivedReviewRequests, ReviewPublicationSuccessfully, userDetails, userProfileInfo } from '../../services/api_services';
import { useState, useEffect } from 'react';
import DefaultImg from '../../assets/illustrat_Image/not_img.png'
import ShowMoreText from "react-show-more-text";
import TreandingReviewer from './TreandingReviewer';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';

function ReviewRequest() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate = useNavigate()
    const [totalRequest, setTotalRequest] = useState(null)
    const [reviewRequestList, setReviewRequestList] = useState([])
    const [RequestStatus, setRequestStatus] = useState(null)
    const [userRole, setUserRole] = useState("")
    const [userData, setUserData] = useState([])

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    }

    const UserProfileDetails = async () => {
        await userProfileInfo(userBody).then(res => {
            // console.log('User details in review requeest', res);
            if (res.data.success) {
                setUserRole(res.data.extras.Data.All_Roles)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    const requestBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Status_Filter": RequestStatus != null ? true : false,
        "Request_Status": RequestStatus,
        "skip": 0,
        "limit": 30

    }


    const AllRecievedReviewRequest = async () => {
        await FilterAllReceivedReviewRequests(requestBody).then(res => {
            // console.log('revived review request', res);
            if (res.data.success) {
                setReviewRequestList(res.data.extras.Data)
                setTotalRequest(res.data.extras.Count)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {

        AllRecievedReviewRequest()
        UserProfileDetails()
    }, [])
    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }


    const sendReviewComplated = async (review_id) => {
        await ReviewPublicationSuccessfully({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Review_RequestID": review_id
        }).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status);
                AllRecievedReviewRequest()
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
                        {!userRole ? <Result
                            status="warning"
                            title="You are not a Reviewer user."
                            extra={
                                <Button type="primary" key="console">

                                    Send Reviewer Request
                                </Button>
                            }
                        /> : <div className="review_data">
                            <div className="review_request_title">
                                <BiArrowBack style={{ color: 'white', marginRight: '.5rem', cursor: 'pointer' }} onClick={() => navigate(-1)} />
                                <p>Invitations</p>
                            </div>
                            <div className="total_request">
                                <p>Seen All - {totalRequest}</p>
                            </div>

                            <div className="review_request_userList">
                                {totalRequest == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : reviewRequestList.map((reviewer) => {
                                    return (
                                        <div className='all_requested_list1' key={reviewer.Review_RequestID}>
                                            <div className="request_status">
                                                <div className="request_status_title">
                                                    <p>Status : {reviewer.Request_Status_Logs[reviewer.Request_Status_Logs.length - 1].Comment}</p>
                                                </div>
                                            </div>
                                            <div className='seen_review_request'>
                                                <div className="review_publish_info">
                                                    <div className="publication_info">

                                                        <div className="review_request_send_img">
                                                            {reviewer.Publication_Information.Whether_Image_Available == true ? <img src={reviewer.Publication_Information.Image_Information.Image550} /> : <img src={DefaultImg} />}
                                                        </div>
                                                        <div className="user_request_send_info">
                                                            <p>{reviewer.Publication_Information.Publication_Title}</p>
                                                            <ShowMoreText
                                                                /* Default options */
                                                                lines={1}
                                                                more="Show more"
                                                                less="Show less"
                                                                className="content-css"
                                                                anchorClass="show-more-less-clickable"
                                                                onClick={executeOnClick}
                                                                expanded={false}
                                                                width={500}
                                                                truncatedEndingComponent={"..... "}
                                                            >
                                                                <p>{reviewer.Publication_Information.Publication_Description}</p>

                                                            </ShowMoreText>

                                                        </div>
                                                    </div>
                                                    <div className="send_reviewver_info">
                                                        <p style={{ fontWeight: '600' }}>Requester : </p>
                                                        <div className="review_requester_img">
                                                            {reviewer.Requester_Information.Whether_Image_Available == true ? <img src={reviewer.Requester_Information.Image_Information.Image550} /> : <img src={DefaultImg} />}
                                                        </div>
                                                        <div className="user_request_send_info">
                                                            <p style={{ color: "white" }}>{reviewer.Requester_Information.Name}</p>
                                                            <p>{reviewer.Requester_Information.Whether_Professional_Details_Available == true && reviewer.Requester_Information.Professional_Details.Specialisation_Title}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="request_action">

                                                    <Button type='default' onClick={() => navigate(`/Send_Review_Detials/${reviewer.Review_RequestID}`)}>
                                                        View Details
                                                    </Button>
                                                    {reviewer.Request_Status == 3 && <Button type='default' onClick={(review_id) => sendReviewComplated(reviewer.Review_RequestID)}>Send Review Complate</Button>}
                                                    {reviewer.Request_Status == 4 && <Button type='link'>Rejected Quote</Button>}
                                                    {reviewer.Request_Status == 5 && <Button type='link' disabled>Mark as Completed</Button>}

                                                </div>
                                            </div>
                                            <Divider style={{ margin: '0', backgroundColor: "white", height: "1rem" }} />

                                        </div>
                                    )
                                })}
                            </div>

                        </div>}

                    </Card>
                </Col>
                <Col md={4}>
                    <TreandingReviewer />
                </Col>
            </Row>
        </div>
    )
}

export default ReviewRequest
