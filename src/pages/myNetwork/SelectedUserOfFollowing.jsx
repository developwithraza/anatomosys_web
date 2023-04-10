import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "../../style/review_request.css"
import "../../style/myNetwork.css"
import { Input, Button, Divider, message, Pagination } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FollowUser, SelectedUserFollowings, UnFollow, userDetails } from '../../services/api_services';
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { useSelector } from 'react-redux';


function SelectedUserOfFollowing() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const [userData, setUserData] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const [dataCount, setDataCount] = useState('')
    const [currentStatus, setCurrentStatus] = useState(1)

    const SelecteduserBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id,
        "skip": skip,
        "limit": limit
    }

    const SelectedUserFollowersList = async () => {
        await SelectedUserFollowings(SelecteduserBody).then(res => {
            // console.log("select User following", res);
            if (res.data.success) {
                setUserData(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
            }
        }).catch(err => {
            message.error(err.data.extras.msg);

        })
    }
    useEffect(() => {
        SelectedUserFollowersList()
    }, [currentStatus])


    //pagination
    const pageChangeHandle = (value, pageSize) => {
        setCurrentStatus(value);
        setSkip((value - 1) * pageSize)
    };
    const FollowHandle = async (id) => {
        await FollowUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
                
                SelectedUserFollowersList()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    const unFollowHandle = async (id) => {
        await UnFollow({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
                
                SelectedUserFollowersList()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    return (
        <div className='container selected_user_following'>
            <Row>
                <Col md={8}>
                    <Card>
                        <div className="review_data">

                            {userData.map((user) => {
                                return (
                                    <>
                                        <div className='seen_review_request'>

                                            <Link to={`/select_following_user/${user.USERID}`}>
                                                <div className="following_people_list" key={user.USERID} >
                                                    <div className="following_user_img">
                                                        {user.Whether_Image_Available == true ? <img src={user.Image_Information.Image550} /> : <img src={NotImg} />}

                                                    </div>
                                                    <div className="following_user_data">
                                                        <p>{user.Name}</p>
                                                        <p className='specilist'>{user.Specialisation_Name}</p>
                                                        {/* <p style={{ fontWeight: '600', fontSize: '1rem' }}>{user.Department_Name}</p> */}
                                                        <p >{user.Hospital_Name}</p>
                                                    </div>

                                                </div>
                                            </Link>
                                        
                                            {user.Whether_Following == true ? <div className="followingBtn">
                                                <Button type='default' onClick={(id) => unFollowHandle(user.USERID)}>Following</Button>
                                            </div> : <div className="followBtn">
                                                <Button type='link' onClick={(id) => FollowHandle(user.USERID)}>Follow</Button>
                                            </div>
                                            }


                                        </div>
                                        <Divider />

                                    </>
                                )
                            })}


                        </div>
                        <div className="paginationSection">
                            <Pagination total={dataCount} current={currentStatus} onChange={pageChangeHandle} showTotal={() => `Total Records : ${dataCount} `} pageSize={limit} defaultCurrent={1} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}



export default SelectedUserOfFollowing
