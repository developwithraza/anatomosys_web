import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "../../style/review_request.css"
import { BsSliders, BsCheck2All } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Input, Button, Divider, message, Alert, Empty } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FilterAllEventJoinees, FilterAllReviwer, FollowUser, SendReviewRequest, UnFollow, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import DefaultImg from '../../assets/illustrat_Image/not_img.png'
import PeopleYouKnow from '../../pages/profile/PeopleYouKnow'
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import { MdKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux';


function EventJoineeList() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()
    const [reviewerList, setReviewerList] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [sendReq, setSendReq] = useState(false)
    const [countData, setCountData] = useState(null)

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": id,
        "skip": 0,
        "limit": 50


    }
    const EventjoineesList = async () => {
        await FilterAllEventJoinees(body).then(res => {
            if (res.data.success) {
                setReviewerList(res.data.extras.Data)
                setCountData(res.data.extras.Count)
                // console.log('Event Joinees List', res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        EventjoineesList()
    }, [])


    // const FollowHandle = async (id) => {
    //     await FollowUser({
    //         "ApiKey": userDetails.ApiKey,
    //         "USERID": userDetails.userID,
    //         "SessionID": userDetails.sessionID,
    //         "Selected_USERID": id,
    //     }).then(res => {
    //         console.log("Follow", res);

    //         if (res.data.success) {
    //             // message.success(res.data.extras.Status);
    //             console.log("follow", res);
    //             EventjoineesList()
    //         }
    //     }).catch(err => {
    //         message.error(err.data.extras.Status);

    //     })
    // }

    // const unFollowHandle = async (id) => {
    //     await UnFollow({
    //         "ApiKey": userDetails.ApiKey,
    //         "USERID": userDetails.userID,
    //         "SessionID": userDetails.sessionID,
    //         "Selected_USERID": id,
    //     }).then(res => {
    //         console.log("unFollow", res);

    //         if (res.data.success) {
    //             // message.success(res.data.extras.Status);
    //             console.log("unfollow", res);
    //             EventjoineesList()
    //         }
    //     }).catch(err => {
    //         message.error(err.response.data.extras.msg);

    //     })
    // }

    return (
        <div className='container review_request'>
            <Row>
                <Col md={8}>
                    <Card>

                        <div className="review_data">
                            <div className="review_request_title">
                                <p onClick={() => navigate(-1)}><MdKeyboardBackspace style={{ fontSize: '1.5rem' }} /></p>
                                <p>Event Joinees</p>
                            </div>

                            <div className="review_request_userList">
                                {countData == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : reviewerList.map((item) => {
                                    return (
                                        <>
                                            <div className="suggest_user_items" key={item.BookingID}>
                                                <Link to={`/select_following_user/${item.USERID}`}>
                                                    <div className="trending_users">
                                                        <div className="user_item_img">
                                                            {item.Whether_Image_Available == true ? <img src={item.Image_Information.Image550} /> : <img src={Empty_Img} />}

                                                        </div>
                                                        <div className="user_item_info">
                                                            <p style={{ fontWeight: '600', fontSize: '1rem', color: '#0676b7' }}>{item.Name}</p>
                                                            <p style={{ color: '#e8aa00', fontSize: '1rem', fontWeight: '500' }}>{item.Whether_Professional_Details_Available == true && item.Professional_Details.Specialisation_Title}</p>
                                                            <p style={{ fontSize: '1rem', color: 'black' }}>{item.Hospital_Name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                {/* <div className="suggest_user_follower">
                                                    {item.Whether_Following == false &&
                                                        <div className="post_follower">
                                                            <Button type='link' onClick={(id) => FollowHandle(item.USERID)}><p><sapn><AiOutlinePlus style={{ marginTop: '-3px' }} /></sapn>Follow</p></Button>
                                                        </div>
                                                    }
                                                    {item.Whether_Following == true &&
                                                        <div className="user_following">
                                                            <Button type='link' onClick={(id) => unFollowHandle(item.USERID)}><p><sapn><BsCheck2All style={{ marginTop: '-3px' }} /></sapn>Following</p></Button>
                                                        </div>
                                                    }


                                                </div> */}
                                            </div>
                                            <Divider style={{ margin: '.5rem 0' }} />

                                        </>
                                    )
                                })}
                            </div>

                        </div>
                    </Card>
                </Col>
                <Col md={4}>
                    <PeopleYouKnow />
                </Col>
            </Row>
        </div>
    )
}



export default EventJoineeList
