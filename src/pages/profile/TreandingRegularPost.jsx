import { Button, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import { FetchAllHomeTrendingRegularPosts, userDetails } from '../../services/api_services'
import "../../style/viewprofile.css"
import ShowMoreText from "react-show-more-text";
import { Link, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

function TreandingRegularPost() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate = useNavigate()
    const [userPostList, setUserPostList] = useState([])

    const AllPostBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": 0,
        "limit": 4
    }
    const userAllReqularPost = async () => {
        await FetchAllHomeTrendingRegularPosts(AllPostBody).then(res => {
            // console.log("UserPostLister", res);

            if (res.data.success) {
                setUserPostList(res.data.extras.Data)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        userAllReqularPost()

    }, [])
    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    return (
        <div className='trending_post'>
            <Card>
                <div className="terending_post_heading">
                    <p>Trending Post</p>
                </div>
                {userPostList.map((item) => {
                    return (
                        <Link to={`/post_complete_Info/${item.PostID}`}>
                            {item.Whether_Shared_Post == true ?

                                <div className='trendingPost_post'>

                                    <div className="recent_post_infos">
                                        <Card style={{ width: '100%' }} className="recnt_posd_card">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>

                                                    <div className="recent_post_gallary">
                                                        {item.Shared_Post_Information.Gallery_Records_Information.map((gallary) => {
                                                            return (
                                                                <div className="post_content_images">
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

                                                </ListGroup.Item>
                                                <ListGroup.Item>

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

                                                </ListGroup.Item>

                                            </ListGroup>
                                        </Card>


                                    </div>
                                </div> : <Card.Text className='trendingPost_post'>
                                    <div className="recent_post_info">
                                        <Card style={{ width: '100%' }}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item><div className="recent_post_gallarys">
                                            {item.Gallery_Records_Information.map((gallary) => {
                                                return (
                                                    <div className="post_content_images">
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
                                        </div></ListGroup.Item>
                                                <ListGroup.Item> <div className="recent_post_header">
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
                                                width={200}
                                                truncatedEndingComponent={"..... "}
                                            >
                                                {item.Post_Description}
                                            </ShowMoreText>
                                        </div></ListGroup.Item>

                                            </ListGroup>
                                        </Card>
                                        
                                       
                                    </div>

                                    <Divider />
                                </Card.Text>

                            }

                        </Link>
                    )
                })}
                <div className="suggest_user_view_all">
                    <div className="suggest_all_View">
                        <Button type='link' onClick={() => navigate('/main')}>View More</Button>
                    </div>
                    <div className="suggest_user_view_circle">

                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TreandingRegularPost