import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "../../style/review_request.css"
import { BsSliders } from "react-icons/bs";
import { Input, Button, Divider, message, Alert, Empty } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FetchAllBlockedUser, FilterAllReviwer, SendReviewRequest, UnBlockUser, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import DefaultImg from '../../assets/illustrat_Image/not_img.png'
import { BiArrowBack } from "react-icons/bi";

function BlockList() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [reviewerList, setReviewerList] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [sendReq, setSendReq] = useState(false)
    const [countData, setCountData] = useState(null)

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "skip": 0,
        "limit": 30
    }
    const BlockedUserList = async () => {
        await FetchAllBlockedUser(body).then(res => {
            if (res.data.success) {
                setReviewerList(res.data.extras.Data)
                setCountData(res.data.extras.Count)
                // console.log('all blocked list', res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        BlockedUserList()
    }, [])
    const unBlockhandle = async (id) => {
        await UnBlockUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
                // message.success(res.data.extras.Status);
                BlockedUserList()
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

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
                                <BiArrowBack style={{ color: 'white', marginRight: '.5rem',cursor:'pointer' }} onClick={() => navigate(-1)} />
                                <p>Blocked User</p>
                            </div>

                            <div className="review_request_userList">
                                {countData == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : reviewerList.map((user) => {
                                    return (
                                        <>
                                            {user.USERID != userDetails.userID &&
                                                <>
                                                    <div className="blockList">
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
                                                            <Button type='default' onClick={(id) => unBlockhandle(user.USERID)}>Unblock</Button>
                                                        </div>
                                                    </div>
                                                    <Divider style={{ margin: ".5rem" }} />
                                                </>

                                            }
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}



export default BlockList
