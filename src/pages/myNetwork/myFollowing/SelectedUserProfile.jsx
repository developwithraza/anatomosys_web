import { Divider, message } from 'antd';
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useUserAuth } from '../../../context/AuthUserContect';
import '../../../style/leftSideBar.css'
import NotImg from '../../../assets/illustrat_Image/not_img.png'
import { SelectedUserInfo, userDetails } from '../../../services/api_services';
import { useState } from 'react';


function SelectedUserProfile({ userId }) {
    const { user, userData } = useUserAuth()
    const [selectUser, setSelectUser] = useState([])

    const selectUserBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Selected_USERID": userId
    }
    const SelectedUserDetails = async () => {
        await SelectedUserInfo(selectUserBody).then(res => {
            if (res.data.success) {
                setSelectUser(res.data.extras.Data)
                // console.log('selected user info', res);
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }
    useEffect(() => {
        SelectedUserDetails()
    }, [])


    return (
        <div className='profile_card left_Side_Bar'>
            <Card style={{ width: '100%' }} >
                <div className="user_profile">
                    {selectUser.Whether_Image_Available == true ? <img src={selectUser.Image_Information.Image550} /> : <img src={NotImg} />
                    }
                </div>
                <Card.Body>
                    <Card.Title className='user_title'>
                        <h2>{selectUser.Whether_Basic_Information_Available == true ? selectUser.Name : user.displayName}</h2>
                        <h4 id='spesilist'>{selectUser.Whether_Professional_Details_Available == true && selectUser.Specialisation_Name}</h4>
                        <h4>{selectUser.Whether_Basic_Information_Available == true && selectUser.Hospital_Name}</h4>
                    </Card.Title>
                    <Divider style={{ marginTop: '-.2rem' }} />
                    <Card.Text className='user_specilist'>
                        <div className="followers">
                            <p>Followers  {selectUser.Total_Followers}</p>
                            <Divider type='vertical' style={{ color: 'lightgray' }} />
                            <p>Following  {selectUser.Total_Following}</p>
                        </div>
                    </Card.Text>
                    <Card.Text className='user_about'>
                        <h4>About</h4>
                        <p>{selectUser.Whether_Basic_Information_Available == true && selectUser.Bio}</p>
                    </Card.Text>
                </Card.Body>
            </Card>


        </div>
    )
}


export default SelectedUserProfile
