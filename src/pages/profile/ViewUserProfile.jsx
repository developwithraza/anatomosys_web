import { Divider, Select, message, Button } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useUserAuth } from '../../context/AuthUserContect';
import { FilterAllCreatedRegualarPosts, userDetails, userProfileInfo } from '../../services/api_services';
import '../../style/leftSideBar.css'
import '../../style/viewprofile.css'
import EditUserProfile from './EditUserProfile';
import Education from './Education';
import ResearchPublication from './ResearchPublication';
import WorkExperience from './WorkExperience';
import ShowMoreText from "react-show-more-text";

import UpdateUserImg from './UpdateUserImg';
import UpdateProfession from './UpdateProfession';
import UpdateCoverImg from './UpdateCoverImg';
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { Link, useNavigate } from 'react-router-dom';
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../../redux/actions/Action';

function ViewUserProfile() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const { user } = useUserAuth();

    const dispatch=useDispatch()

    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const [recentPost, setRecentPost] = useState([])
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false)

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    }

    const UserProfileDetails = async () => {
        await userProfileInfo(userBody).then(res => {
            // console.log('User details', res);
            if (res.data.success) {
                setUserData(res.data.extras.Data)
                dispatch(UpdateUser(res.data.extras.Data))
                sessionStorage.setItem("user_data", JSON.stringify(res.data.extras.Data))
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        UserProfileDetails()
    }, [])

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    const postBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": 0,
        "limit": 2
    }

    const userRecentPost = async () => {
        await FilterAllCreatedRegualarPosts(postBody).then(res => {
            // console.log('filter recent post', res);
            if (res.data.success) {
                setRecentPost(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        userRecentPost()
    }, [])

    const closeLightbox = () => {
        setOpen(true);
    };
    return (
        <div className='view_profile'>
            <Card style={{ width: '100%' }} >
                <div className="user_review_details">
                    <div className="cover_user_img">
                        {userData.Whether_Cover_Picture_Available == true ?
                            <img src={userData.Cover_Picture_Information.Image550} /> : <img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/alt-5ae892611bf1a-5168-68b2575aab38f2c97ce8846381d07044@1x.jpg' />
                        }

                    </div>
                    <div className="update_cover_image">
                        <UpdateCoverImg UserProfileDetails={UserProfileDetails} userData={userData} />
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
                    </div>
                    <div className="updateuserImg">
                        <UpdateUserImg userData={userData} UserProfileDetails={UserProfileDetails} />
                    </div>
                </div>
                <Card.Body>
                    <div className="user_biodata">
                        <div className="user_data">
                            <div className='user_titles'>
                                <h2>{userData.Name}</h2>
                                <h4>{userData.Bio}</h4>
                            </div>
                            <div className="view_follower">
                                <Button type='link' onClick={() => navigate('/my_network')}>Followers  {userData.Total_Followers}</Button>
                                <Divider type='vertical' style={{ background: 'black', marginTop: '.7rem' }} />
                                <Button type='link' id='following' onClick={() => navigate('/my_network')}>Following  {userData.Total_Following}</Button>
                            </div>
                            <Divider style={{ margin: ".5rem" }} />
                            <div className="update_user_prifile">
                                <EditUserProfile userData={userData} UserProfileDetails={UserProfileDetails} />
                            </div>
                        </div>
                        <div className="departmentData">
                            <p> Profession Details</p>
                            <p><span className='specielist'>Hospital : </span>  {userData.Hospital_Name}</p>
                            <p><span className='specielist'>Dept. : </span> {userData.Whether_Professional_Details_Available == true && userData.Professional_Details.Department_Title}</p>
                            <p><span className='specielist'>Specialist : </span> {userData.Whether_Professional_Details_Available == true && userData.Professional_Details.Specialisation_Title}</p>

                        </div>
                        <div className="Update_Professional_Details">
                            <UpdateProfession userData={userData} UserProfileDetails={UserProfileDetails} />
                        </div>
                    </div>
                    <div className="recent_post_title">
                        <p>Recent Post</p>
                        <Button type='link' onClick={() => navigate(`/view_all_my_post`)}>View All Post</Button>
                    </div>
                    {recentPost.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.Whether_Shared_Post == true ?
                                    <Card.Text className='recent_post' key={item.PostID}>
                                        <Link to={`/post_complete_Info/${item.PostID}`}>
                                            <div className="recent_post_infos">
                                                <div className="recent_post_gallary">
                                                    {item.Shared_Post_Information.Gallery_Records_Information.map((gallary, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className="post_content_images">
                                                                    {gallary.Media_Type == 1 && <img src={gallary.Image_Information.Image250
                                                                    } />}
                                                                    {gallary.Media_Type == 2 && <img src={gallary.Gif_Image_Information.Gif_Image_URL
                                                                    } />}
                                                                    {gallary.Media_Type == 4 && <video controls >
                                                                        <source src={gallary.Video_Information.Video_Original_URL} type="video/mp4" />
                                                                    </video>}
                                                                </div>

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
                                                        {item.Shared_Post_Information.Post_Description}
                                                    </ShowMoreText>

                                                </div>
                                            </div>
                                        </Link>

                                    </Card.Text> :
                                    <Link to={`/post_complete_Info/${item.PostID}`}>
                                        {/* <Card.Text className='recent_post'> */}
                                        <Divider style={{ margin: '0' }} />
                                        <div className="recent_post_infos">
                                            <div className="recent_post_gallary">
                                                {item.Gallery_Records_Information.map((gallary, index) => {
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
                                                    {item.Post_Description}
                                                </ShowMoreText>
                                            </div>
                                        </div>

                                        {/* </Card.Text> */}
                                    </Link>

                                }
                            </div>
                        )
                    })}

                </Card.Body>
            </Card>
            <div className="resreach_publication">
                <ResearchPublication UserProfileDetails={UserProfileDetails} />
            </div>
            <div className="work_Experince">
                <WorkExperience />
            </div>
            <div className="education">
                <Education />
            </div>
        </div>
    )
}


export default ViewUserProfile
