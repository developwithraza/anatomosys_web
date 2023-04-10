import { Button, Divider, message, Spin } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { FilterAllTrendingUsers, FollowUser, UnFollow, userDetails } from '../../services/api_services'
import "../../style/viewprofile.css"
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import { useSelector } from 'react-redux'

function PeopleYouKnow() {


    const [users, setUsers] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(6)
    const [dataCount, setDataCount] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const initialPosts = slice(users, 0, limit)
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": skip,
        "limit": limit
    }

    const SuggestedUser = async () => {
        await FilterAllTrendingUsers(userBody).then(res => {
            // console.log('trenading  user', res);
            if (res.data.success) {
                setUsers(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                setIsMoreLoading(false)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    useEffect(() => {
        SuggestedUser()
    }, [limit])

    const FollowHandle = async (id) => {
        await FollowUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
                SuggestedUser()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

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
                SuggestedUser()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );

    const loadMore = () => {
        setLimit(limit + 3)
        setIsMoreLoading(true)

        if (limit >= dataCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    return (
        <div className='suggest_users'>
            <Card>
                <div className="suggest_user_heading">
                    <p>People You May Know</p>
                </div>
                {initialPosts.map((item) => {
                    return (
                        <div key={item.USERID}>
                            {item.USERID != userDetails.userID && <>
                                <div className="suggest_user_items" >
                                    <Link to={`/select_following_user/${item.USERID}`}>
                                        <div className="trending_users">
                                            <div className="user_item_img">
                                                {item.Whether_Image_Available == true ? <img src={item.Image_Information.Image550} /> : <img src={Empty_Img} />}

                                            </div>
                                            <div className="user_item_info">
                                                <p style={{ fontWeight: '600', fontSize: '1rem', color: '#0676b7' }}>{item.Name}</p>
                                                <p style={{ color: '#e8aa00', fontSize: '1rem', fontWeight: '500' }}>{item.Whether_Professional_Details_Available == true && item.Specialisation_Name}</p>
                                                <p style={{ fontSize: '.8rem', color: 'black' }}>{item.Hospital_Name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="suggest_user_follower">
                                        {item.Whether_Following == false &&
                                            <div className="post_follower">
                                                <Button type='link' onClick={(id) => FollowHandle(item.USERID)}><p><span><AiOutlinePlus style={{ marginTop: '-3px' }} /></span>Follow</p></Button>
                                            </div>
                                        }
                                        {item.Whether_Following == true &&
                                            <div className="user_following">
                                                <Button type='link' onClick={(id) => unFollowHandle(item.USERID)}><p><span><BsCheck2All style={{ marginTop: '-3px' }} /></span>Following</p></Button>
                                            </div>
                                        }


                                    </div>
                                </div>

                                <Divider style={{ margin: ' .5rem 0' }} />
                            </>
                            }

                        </div>
                    )
                })}
                <div className="suggest_user_view_all">
                    <div className="suggest_all_View">
                        {isCompleted ? (
                            <div className="load_more">
                                <Button type='link' disabled> no more </Button>
                            </div>
                        ) : (
                            <div className="load_more">
                                <Button type='link' onClick={loadMore}>{isMoreLoading && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />}Load more </Button>
                            </div>
                        )}
                    </div>
                    <div className="suggest_user_view_circle">

                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PeopleYouKnow
