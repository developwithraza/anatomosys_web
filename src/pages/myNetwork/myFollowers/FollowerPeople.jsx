import { Button, Divider, message, Spin } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AllFollowersuser, BlockUser, FollowUser, UnFollow, userDetails } from '../../../services/api_services'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import Empty_Img from '../../../assets/illustrat_Image/not_img.png'
import { useSelector } from 'react-redux'

function FollowerPeople() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [followerList, setFollowerList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const initialPosts = slice(followerList, 0, limit)

    const followerBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": skip,
        "limit": limit
    }
    const AllFollowersUserList = async () => {
        await AllFollowersuser(followerBody).then(res => {
            // console.log('follower list', res);
            if (res.data.success) {
                setFollowerList(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                setIsMoreLoading(false)
            }
        }).catch(err => {
            message.error(err.data.extras.msg);

        })
    }
    useEffect(() => {
        AllFollowersUserList()
    }, [limit])


    const BlockHandle = async (id) => {
        await BlockUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {

                AllFollowersUserList()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

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
        <div className='following_people'>
            <div className="total_following">
                <p>Your followers {dataCount} people</p>
            </div>
            {initialPosts && followerList.map((user) => {
                return (
                    <div key={user.USERID}>
                        <div className='following_people_section'>
                            <div className='follower_people_section'>
                                <Link to={`/select_following_user/${user.USERID}`}>
                                    <div className="following_people_list"  >
                                        <div className="following_user_img">
                                            {user.Whether_Image_Available == true ? <img src={user.Image_Information.Image550} /> : <img src={Empty_Img} />}

                                        </div>
                                        <div className="following_user_data">
                                            <p>{user.Name}</p>
                                            <p className='specilist'>{user.Specialisation_Name}</p>

                                            <p >{user.Hospital_Name}</p>
                                        </div>

                                    </div>
                                </Link>
                                <div className="unfollowing_btn">

                                    <Button type='default' onClick={(id) => BlockHandle(user.USERID)}>Block</Button>
                                </div>
                            </div>

                        </div>
                        <Divider style={{ margin: '0' }} />

                    </div>
                )
            })}

            {isCompleted ? (
                <div className="load_more_cpmment">
                    <Button type='link' disabled> no more </Button>
                </div>
            ) : (
                <div className="load_more_cpmment">
                    <Button type='link' onClick={loadMore}>{isMoreLoading && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />}Load more </Button>
                </div>
            )}
        </div>
    )
}

export default FollowerPeople
