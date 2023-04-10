import { Divider, Button, message } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useUserAuth } from '../../../context/AuthUserContect';
import { FollowUser, SelectedUserInfo, UnFollow, userDetails, userProfileInfo } from '../../../services/api_services';
import '../../../style/leftSideBar.css'
import '../../../style/viewprofile.css'
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
import { Link, useParams } from 'react-router-dom';
import SelectUserResearchPub from '../SelectUserResearchPub';
import SelectedUserWorkExp from '../SelectedUserWorkExp';
import SelectedUserEd from '../SelectedUserEd';
import PeopleYouKnow from '../../profile/PeopleYouKnow';

function SelectedFollowersUser() {
    const { id } = useParams()
    const [userData, setUserData] = useState([])
    const [open, setOpen] = useState(false)
    const { user, setUser } = useUserAuth()

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Selected_USERID": id
    }


    const SelectedUserDetails = async () => {
        await SelectedUserInfo(userBody).then(res => {
            // console.log("select User", res);

            if (res.data.success) {
                setUserData(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SelectedUserDetails()
    }, [])
    const messagingHnadle = () => {

    }
    const closeLightbox = () => {
        setOpen(true);
    };
    const unFollowHandle = async (id) => {
        await UnFollow({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
              
                SelectedUserDetails()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }
    const FollowHandle = async (id) => {
        await FollowUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
               
                SelectedUserDetails()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }
    return (
        <div className='container view_profiles'>
            <Row>
                <Col md={7} >
                    <Card style={{ width: '100%' }} >
                        <div className="user_review_details">
                            <div className="cover_user_img">

                                {userData.Whether_Cover_Picture_Available == true ? <span> <img src={userData.Cover_Picture_Information.Image550} /></span> : <span> <img src='https://www.shutterstock.com/image-photo/doctor-files-hand-holding-patient-260nw-525091510.jpg' /></span>
                                }

                            </div>

                            <div className="view_user_profile">
                                {userData.Whether_Image_Available == false && <span><img src={user.photoURL} /></span>
                                }

                                {userData.Whether_Image_Available == true &&
                                    <ModalImage
                                        small={userData.Image_Information.Image250}
                                        large={userData.Image_Information.Image550}
                                        alt="Image"
                                    />
                                }
                                {open && <Lightbox
                                    medium={userData.Image_Information.Image250}
                                    large={userData.Image_Information.Image550}
                                    alt="Image"
                                    onClose={closeLightbox}
                                />}
                                {/* {userData.Whether_Image_Available == true && <span> <img src={userData.Image_Information.Image250} /></span>
                                } */}
                            </div>

                        </div>
                        <Card.Body>
                            <div className="user_biodata">
                                <div className="user_data">
                                    <Card.Title className='user_titles'>
                                        <h2>{userData.Name}</h2>
                                        <h4>{userData.Bio}</h4>
                                    </Card.Title>
                                    <div className="view_follower">
                                        <Link to={`/selected_user_of_followers/${userData.USERID}`}>
                                            <p style={{ color: '#e8aa00' }} >Followers : {userData.Total_Followers}</p>
                                        </Link>
                                        <Divider type='vertical' style={{ backgroundColor: 'black', marginTop: '3px' }} />
                                        <Link to={`/selected_user_of_following/${userData.USERID}`}>
                                            <p style={{ color: "#0676b7" }}>Following : {userData.Total_Following}</p>
                                        </Link>

                                    </div>
                                    {userData.Whether_Following == true ? <div className='selected_user_action'>
                                        <div className="unfollowing_btn">
                                            <Button type='default' onClick={(id) => unFollowHandle(userData.USERID)}>Following</Button>
                                        </div>
                                        <div className="unfollowing_btn">
                                            <Button type='default' onClick={(id) => messagingHnadle(userData.USERID)}>Messaging</Button>
                                        </div>
                                    </div> : <div className="unfollowing_btn">
                                        <Button type='default' onClick={(id) => FollowHandle(userData.USERID)}>Follow</Button>
                                    </div>}

                                    <Divider />

                                </div>
                                { }
                                <div className="departmentData">
                                    <p>Profession Details</p>
                                    <p>Hospital : {userData.Hospital_Name}</p>
                                    <p>Dept. : {userData.Whether_Professional_Details_Available == true && userData.Department_Name}</p>
                                    <p>Specialist : {userData.Whether_Professional_Details_Available == true && userData.Specialisation_Name}</p>

                                </div>

                            </div>


                        </Card.Body>
                    </Card>
                    <div className="resreach_publication">
                        <SelectUserResearchPub />
                    </div>
                    <div className="work_Experince">
                        <SelectedUserWorkExp />
                    </div>
                    <div className="education">
                        <SelectedUserEd />
                    </div>
                </Col>
                <Col md={5}>
                    <PeopleYouKnow />
                </Col>
            </Row>

        </div>
    )
}


export default SelectedFollowersUser
