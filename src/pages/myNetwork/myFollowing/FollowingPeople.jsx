import { Button, Divider, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AllFollowinguser ,UnFollow,userDetails} from '../../../services/api_services'
import Empty_Img from '../../../assets/illustrat_Image/not_img.png'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import { useSelector } from 'react-redux'

function FollowingPeople() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [followingList, setFollowingList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState(null)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const initialPosts = slice(followingList, 0, limit)

    const navigate = useNavigate()

    const followingBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": skip,
        "limit": limit
    }
    const AllFollowingUserList = async () => {
        await AllFollowinguser(followingBody).then(res => {
            if (res.data.success) {
                setFollowingList(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                // console.log('following list', res);
                setIsMoreLoading(false)

            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        AllFollowingUserList()
    }, [limit])

    const unFollowHandle = async (id) => {
        await UnFollow({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
               
                AllFollowingUserList()
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
        <div className='following_people'>
            <div className="total_following">
                <p>{dataCount} people following you</p>
            </div>
            {followingList && initialPosts.map((user) => {
                return (
                    <div key={user.USERID}>
                        <div className='following_people_section'>
                            <Link to={`/select_following_user/${user.USERID}`}>
                                <div className="following_people_list"  >
                                    <div className="following_user_img">
                                        {user.Whether_Image_Available == true ? <img src={user.Image_Information.Image550} /> : <img src={Empty_Img}/>}

                                    </div>
                                    <div className="following_user_data">
                                        <p>{user.Name}</p>
                                        <p className='specilist'>{user.Specialisation_Name}</p>
                                     
                                        <p >{user.Bio}</p>
                                    </div>

                                </div>
                            </Link>
                            <div className="unfollowing_btn">
                                <Button type='link' onClick={(id)=>unFollowHandle(user.USERID)}>Unfollow</Button>
                            </div>
                        </div>


                        <Divider style={{margin:'0'}}/>

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

export default FollowingPeople
