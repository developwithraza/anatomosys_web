
import { Button, Divider, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import '../../style/rightSidebar.css'
import '../../style/leftSideBar.css'
import No_img from "../../assets/illustrat_Image/not_img.png"
import { FilterAllReceivedReviewRequests, userDetails } from '../../services/api_services';
import { useNavigate } from 'react-router-dom';
import ShowMoreText from "react-show-more-text";

function LeftReviewRequest() {
    const navigate = useNavigate()
    const [totalRequest, setTotalRequest] = useState(null)
    const [reviewRequestList, setReviewRequestList] = useState([])
    const [RequestStatus, setRequestStatus] = useState(null)

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    const requestBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Whether_Status_Filter": RequestStatus != null ? true : false,
        "Request_Status": RequestStatus,
        "skip": 0,
        "limit": 2

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
    }, [])
    return (
        <div className='review_request_card'>
            <Card style={{ width: '100%' }} >
                <div className="titles">
                    <Card.Title>
                        <p>Review Requests</p>
                    </Card.Title>
                </div>
                <Card.Text>
                    {reviewRequestList.map((req) => {
                        return (
                            <>
                                <div className="review_profile">
                                    <div className="review_Imgs">
                                        {req.Requester_Information.Whether_Image_Available == true ? <img src={req.Requester_Information.Image_Information.Image550} /> : <img src={No_img} />
                                        }
                                    </div>
                                    <div className="review_info">
                                        <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0' }}>{req.Requester_Information.Name}</p>
                                        <p style={{ color: "#e8aa00", fontSize: '1rem', fontWeight: '500' }}>{req.Requester_Information.Whether_Professional_Details_Available == true && req.Requester_Information.Professional_Details.Specialisation_Title
                                        }</p>
                                        <ShowMoreText
                                            lines={1}
                                            more="Show more"
                                            less="Show less"
                                            className="content-csss"
                                            anchorClass="show-more-less-clickable"
                                            onClick={executeOnClick}
                                            expanded={false}
                                            width={400}
                                            truncatedEndingComponent={"..... "}
                                        >
                                            <p style={{ color: "black", fontSize: '.8rem' }}>{req.Requester_Information.Bio}</p>
                                        </ShowMoreText>
                                    </div>
                                </div>
                                <div className="send_proposal">
                                   
                                    <Button type='link' className='more_detail' onClick={()=>navigate(`/Send_Review_Detials/${req.Review_RequestID}`)}><span className='view_more'>View Details</span></Button>

                                </div>
                                <Divider style={{margin:"0"}}/>
                            </>
                        )
                    })}
                </Card.Text>
                <div className="more_View_sections">
                    <div className="more_view">
                        <Button type='link' onClick={() => navigate('/review_request')}>More View</Button>
                    </div>
                    <div className="more_circle">

                    </div>
                </div>
            </Card>

        </div>
    )
}







export default LeftReviewRequest
