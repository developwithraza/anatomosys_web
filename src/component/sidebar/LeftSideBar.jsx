import { Button, Divider, message } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import { useUserAuth } from '../../context/AuthUserContect';
import { userDetails, userProfileInfo } from '../../services/api_services';
import '../../style/leftSideBar.css'
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


function LeftSideBar() {
    const { user } = useUserAuth()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])

    // const userBody = {
    //     "ApiKey": userDetails.ApiKey,
    //     "USERID": userDetails.userID,
    //     "SessionID":userDetails.sessionID,
    // }
    // console.log("userBody", userBody);

    // const UserProfileDetails = async () => {
    //     await userProfileInfo(userBody).then(res => {
    //         console.log('User details in nabvar', res);
    //         if (res.data.success) {
    //             setUserData(res.data.extras.Data)
    //             console.log("user", user);
    //         }
    //     }).catch(err => {
    //         message.error(err.response.data.extras.msg);
    //     })
    // }

    // useEffect(() => {
    //     user && UserProfileDetails()
    // }, [user])

    return (
        <div className='profile_card left_Side_Bar'>
            <Card style={{ width: '100%' }} >
                <div className="user_profile">
                    {getUSerData.Whether_Image_Available == false && <span><img src={user.photoURL} /></span>
                    }
                    {getUSerData.Whether_Image_Available == true && <span> <img src={getUSerData.Image_Information.Image250} /></span>
                    }
                </div>

                <Card.Body>
                    <Card.Title className='user_title'>
                            <Card.Text>{getUSerData.Whether_Basic_Information_Available == true ? getUSerData.Name : user.displayName}</Card.Text>
                            <Card.Text id='spesilist'>{getUSerData.Whether_Professional_Details_Available == true && getUSerData.Professional_Details.Specialisation_Title}</Card.Text>
                            <Card.Text>{getUSerData.Whether_Basic_Information_Available == true && getUSerData.Hospital_Name}</Card.Text>
                        
                    </Card.Title>
                    <Divider style={{ marginTop: '-.2rem' }} />
                    <Card.Text className='user_specilist'>
                        <span className="followers">
                            <Button type='link' onClick={() => navigate('/my_network')}>Followers  {getUSerData.Total_Followers}</Button>
                            {/* <Divider type='vertical' style={{ background: 'black', marginTop: '.7rem' }} /> */}
                            <Button type='link' id='following' onClick={() => navigate('/my_network')}>Following  {getUSerData.Total_Following}</Button>
                        </span>
                    </Card.Text>
                    <Card.Text className='user_about'>
                            <span>About</span>
                            <span>{getUSerData.Whether_Basic_Information_Available == true && getUSerData.Bio}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <LeftReviewRequest /> */}


        </div>
    )
}

export default LeftSideBar
