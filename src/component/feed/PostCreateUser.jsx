import { Button, Divider } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import '../../style/leftSideBar.css'
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostCreateUser({userData}) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const navigate = useNavigate()

    return (
        <div className='profile_card left_Side_Bar'>
            <Card style={{ width: '100%' }} >
                <div className="user_profile">
                    {getUSerData.Whether_Image_Available == false && <span><img src={NotImg} /></span>
                    }
                    {getUSerData.Whether_Image_Available == true && <span> <img src={getUSerData.Image_Information.Image250} /></span>
                    }
                </div>

                <Card.Body>
                    <Card.Title className='user_title'>
                        <h2>{getUSerData.Whether_Basic_Information_Available == true && getUSerData.Name }</h2>
                        <p id='spesilist'>{getUSerData.Whether_Professional_Details_Available == true && getUSerData.Professional_Details.Specialisation_Title}</p>
                        <p>{getUSerData.Whether_Basic_Information_Available == true && getUSerData.Hospital_Name}</p>
                    </Card.Title>
                    <Divider style={{ marginTop: '-.2rem' }} />
                    <Card.Text className='user_specilist'>
                        <div className="followers">
                            <Button type='link' onClick={() => navigate('/my_network')}>Followers  {getUSerData.Total_Followers}</Button>
                            <Divider type='vertical' style={{ background: 'black', marginTop: '.7rem' }} />
                            <Button type='link' id='following' onClick={() => navigate('/my_network')}>Following  {getUSerData.Total_Following}</Button>
                        </div>
                    </Card.Text>
                    <Card.Text className='user_about'>
                        <h4>About</h4>
                        <p>{getUSerData.Whether_Basic_Information_Available == true && getUSerData.Bio}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <LeftReviewRequest /> */}


        </div>
    )
}



export default PostCreateUser
