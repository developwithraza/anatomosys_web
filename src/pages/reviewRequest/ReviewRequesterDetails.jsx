import { Button, Divider } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import '../../style/leftSideBar.css'
import { useNavigate } from 'react-router-dom';


function ReviewRequesterDetails({RequesterInfo}) {
    const navigate = useNavigate()
    
    return (
        <div className='profile_card left_Side_Bar'>
            <Card style={{ width: '100%' }} >
                <div className="user_profile">
                    
                    {RequesterInfo.Whether_Image_Available == true && <span> <img src={RequesterInfo.Image_Information.Image250} /></span>
                    }
                </div>

                <Card.Body>
                    <Card.Title className='user_title'>
                        <h2>{RequesterInfo.Whether_Basic_Information_Available == true && RequesterInfo.Name}</h2>
                        <p id='spesilist'>{RequesterInfo.Whether_Professional_Details_Available == true && RequesterInfo.Professional_Details.Specialisation_Title}</p>
                        <p>{RequesterInfo.Whether_Basic_Information_Available == true && RequesterInfo.Hospital_Name}</p>
                    </Card.Title>
                    <Divider style={{ marginTop: '-.2rem' }} />
                    <Card.Text className='user_specilist'>
                        <div className="followers">
                            <Button type='link' >Followers  {RequesterInfo.Total_Followers}</Button>
                            <Divider type='vertical' style={{ background: 'black', marginTop: '.7rem' }} />
                            <Button type='link' id='following' >Following  {RequesterInfo.Total_Following}</Button>
                        </div>
                    </Card.Text>
                    <Card.Text className='user_about'>
                        <h4>About</h4>
                        <p>{RequesterInfo.Whether_Basic_Information_Available == true && RequesterInfo.Bio}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <LeftReviewRequest /> */}


        </div>
    )
}



export default ReviewRequesterDetails
