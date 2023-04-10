import { Divider, Button, message } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useUserAuth } from '../../../context/AuthUserContect';
import { CreateFetchIndividualChatroom, FollowUser, SelectedUserInfo, SelectedUserRegularAllPost, UnFollow, userDetails, userProfileInfo } from '../../../services/api_services';
import '../../../style/leftSideBar.css'
import '../../../style/viewprofile.css'
import NotImg from '../../../assets/illustrat_Image/not_img.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import SelectUserResearchPub from '../SelectUserResearchPub';
import SelectedUserWorkExp from '../SelectedUserWorkExp';
import SelectedUserEd from '../SelectedUserEd';
import ShowMoreText from "react-show-more-text";
import PeopleYouKnow from '../../profile/PeopleYouKnow';
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
import { useSelector } from 'react-redux';

function SelectedFollowingUser() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [userData, setUserData] = useState([])
    const [userPost, setUserPost] = useState([])
    const [chatData, setChatData] = useState([])
    const { user, setUser } = useUserAuth()

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
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

    const chatBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Select_USERID": id
    }
    const messagingHnadle = async () => {
        await CreateFetchIndividualChatroom(chatBody).then(res => {
            // console.log("Create chat room", res);
            if (res.data.success) {
                setChatData(res.data.extras.Data.RequestData)
                message.success("Send Request")
                SelectedUserDetails()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }


    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    const unFollowHandle = async (id) => {
        await UnFollow({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
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
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {
                
                SelectedUserDetails()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }

    const userpostBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
    "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id,
        "skip": 0,
        "limit": 1
    }


    const SelectedUserAllPost = async () => {
        await SelectedUserRegularAllPost(userpostBody).then(res => {
            // console.log("select User post", res);

            if (res.data.success) {
                setUserPost(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        SelectedUserDetails()
        SelectedUserAllPost()
    }, [])



    const closeLightbox = () => {
        setOpen(true);
    };
    return (
        <div className='container view_profile'>
            <Row>
                <Col md={7} >
                    <Card style={{ width: '100%' }} >
                        <div className="user_review_details">
                            <div className="cover_user_img">

                                {userData.Whether_Cover_Picture_Available == true ? <span> <img src={userData.Cover_Picture_Information.Image550} /></span> : <span> <img src='https://www.shutterstock.com/image-photo/doctor-files-hand-holding-patient-260nw-525091510.jpg' /></span>
                                }

                            </div>

                            <div className="view_user_profile">
                                {userData.Whether_Image_Available == false && <span><img src={NotImg} /></span>
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
                                    <div className="selection_user_follower_action">

                                        <div className="view_follower">
                                            <Link to={`/selected_user_of_followers/${userData.USERID}`}>
                                                <p style={{ color: '#e8aa00' }} >Followers : {userData.Total_Followers}</p>
                                            </Link>
                                            <Divider type='vertical' style={{ backgroundColor: 'black', marginTop: '5px' }} />
                                            <Link to={`/selected_user_of_following/${userData.USERID}`}>
                                                <p style={{ color: "#0676b7" }}>Following : {userData.Total_Following}</p>
                                            </Link>

                                        </div>
                                        {userData.Whether_Following == true ? <div className='selected_user_action'>
                                            <div className="unfollowing_btn">
                                                <Button type='default' onClick={(id) => unFollowHandle(userData.USERID)}>Following</Button>
                                            </div>
                                            <div className="unfollowing_btn">
                                            {chatData.Request_Status==1 ?  <Button type='default' disabled >Send Request</Button> : chatData.Request_Status==2 ? <Button type='default' onClick={()=>navigate('/messingin_page')}>Messaging</Button> : <Button type='default' onClick={(id) => messagingHnadle(userData.USERID)}>Message</Button>}
                                            {chatData.Request_Status==3 &&  <Button type='default' disabled>Rejected</Button>}
                                                
                                            </div>
                                        </div> : <div className="unfollowing_btn">
                                            <Button type='default' onClick={(id) => FollowHandle(userData.USERID)}>Follow</Button>
                                        </div>}
                                    </div>

                                    <Divider />

                                </div>

                                <div className="departmentData">
                                    <p>Profession Details</p>
                                    <p>Hospital : {userData.Hospital_Name}</p>
                                    <p>Dept. : {userData.Whether_Professional_Details_Available == true && userData.Department_Name}</p>
                                    <p>Specialist : {userData.Whether_Professional_Details_Available == true && userData.Specialisation_Name}</p>

                                </div>

                            </div>
                            <div className="recent_post_title">
                                <p>Recent Post</p>
                                <Button type='link' onClick={() => navigate(`/select_user_regular_post/${userData.USERID}`)}>View All Post</Button>

                            </div>

                            {userPost.map((item,index) => {
                                return (
                                    <div key={index} >
                                        {item.Whether_Shared_Post == true ?
                                            <Card.Text className='recent_post'>

                                                <div className="recent_post_infos">
                                                    <div className="recent_post_gallary">
                                                        {item.Shared_Post_Information.Gallery_Records_Information.map((gallary,index) => {
                                                            return (
                                                                <div className="post_content_images" key={index}>
                                                                    {gallary.Media_Type == 1 && <img src={gallary.Image_Information.Image550
                                                                    } />}
                                                                    {gallary.Media_Type == 2 && <img src={gallary.Gif_Image_Information.Gif_Image_URL
                                                                    } />}
                                                                    {gallary.Media_Type == 4 && <video controls >
                                                                        <source src={gallary.Video_Information.Video_Original_URL} type="video/mp4" />
                                                                    </video>}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="recent_post_header">
                                                        <p style={{ fontWeight: "500" }}>{item.Shared_Post_Information.Post_Title}</p>
                                                        <ShowMoreText
                                                            /* Default options */
                                                            lines={1}
                                                            more="Show more"
                                                            less="Show less"
                                                            className="content-csss"
                                                            anchorClass="show-more-less-clickable"
                                                            onClick={executeOnClick}
                                                            expanded={false}
                                                            width={600}
                                                            truncatedEndingComponent={"..... "}
                                                        >
                                                            <p>{item.Shared_Post_Information.Post_Description}</p>
                                                        </ShowMoreText>

                                                    </div>
                                                </div>
                                            </Card.Text> : <Card.Text className='recent_post'>
                                                <Divider style={{ margin: '0' }} />
                                                <div className="recent_post_infos">
                                                    <div className="recent_post_gallary">
                                                        {item.Gallery_Records_Information.map((gallary,index) => {
                                                            return (
                                                                <div className="post_content_images" key={index}>
                                                                    {gallary.Media_Type == 1 && <img src={gallary.Image_Information.Image550
                                                                    } />}
                                                                    {gallary.Media_Type == 2 && <img src={gallary.Gif_Image_Information.Gif_Image_URL
                                                                    } />}
                                                                    {gallary.Media_Type == 4 && <video controls >
                                                                        <source src={gallary.Video_Information.Video_Original_URL} type="video/mp4" />
                                                                    </video>}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="recent_post_header">
                                                        <p style={{ fontWeight: "500" }}>{item.Post_Title}</p>
                                                        <ShowMoreText
                                                            /* Default options */
                                                            lines={2}
                                                            more="Show more"
                                                            less="Show less"
                                                            className="content-csss"
                                                            anchorClass="show-more-less-clickable"
                                                            onClick={executeOnClick}
                                                            expanded={false}
                                                            width={400}
                                                            truncatedEndingComponent={"..... "}
                                                        >
                                                            <p>{item.Post_Description}</p>
                                                        </ShowMoreText>
                                                    </div>
                                                </div>

                                            </Card.Text>
                                        }
                                    </div>
                                )
                            })}
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



export default SelectedFollowingUser
