
import { Divider } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { filterAllRegularSavePost, userDetails } from '../../services/api_services'
import '../../style/feed_post.css'
import SavePostOption from './SavePostOption'
import ShowMoreText from "react-show-more-text";
import { Link } from 'react-router-dom'
import TreandingRegularPost from '../../pages/profile/TreandingRegularPost'

function SaveRegularPostList() {
    const [savePostList, setSavePostList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(6)

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    const savePost = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "skip": skip,
        "limit": limit
    }
    const ShowSaveRegularPostList = async () => {
        await filterAllRegularSavePost(savePost).then(res => {
            if (res.data.success) {
                setSavePostList(res.data.extras.Data)
                // console.log("all save post list", res);
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        ShowSaveRegularPostList()
    }, [])
    return (
        <div className='container save_reguler_post'>
            <Row>
                <Col md={8}>
                    <div className="all_save_regular_post">
                        <Card>
                            <Card.Title>All Saved Post</Card.Title>
                            {/* <Divider style={{ marginTop: '-.5rem' }} /> */}
                            <div className="save_post_info">
                                <div className="save_post_user_info">
                                    {savePostList.map((savePost) => {
                                        return (
                                            <div className='save_regular_post_user' >
                                                <Link to={`/select_following_user/${savePost.USERID}`}>
                                                    <div className="save_post_user_data">

                                                        <div className='save_post_user_data_item'>
                                                            <div className="save_post_user_img">
                                                                <img src={savePost.User_Information.Image_Information.Image550} />
                                                            </div>
                                                            <div className="save_post_user_details">
                                                                <p>{savePost.User_Information.Name}</p>
                                                                <p className='specilisation'>{savePost.User_Information.Specialisation_Name}</p>
                                                                <p >{savePost.User_Information.Hospital_Name
                                                                }</p>
                                                            </div>

                                                        </div>

                                                        <div className="save_post_more_opt">
                                                            <SavePostOption />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={`/post_complete_Info/${savePost.PostID}`}>
                                                    <div className="save_post_details">
                                                        <p>{savePost.Post_Title}</p>
                                                        <div className="save_post_data">
                                                            <div className="save_post_image">
                                                                {savePost.Gallery_Records_Information.map((item) => {
                                                                    return (
                                                                        <div className='save_post_img'>
                                                                            {item.Media_Type == 1 && <img src={item.Image_Information.Image550
                                                                            } />}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            <div className="save_post_desc">
                                                                <ShowMoreText
                                                                    /* Default options */
                                                                    lines={2}
                                                                    more="Show more"
                                                                    less="Show less"
                                                                    className="content-css"
                                                                    anchorClass="show-more-less-clickable"
                                                                    onClick={executeOnClick}
                                                                    expanded={false}
                                                                    width={500}
                                                                    truncatedEndingComponent={"..... "}
                                                                >
                                                                    <p>{savePost.Post_Description} <br />{savePost.Tags.map((tag) => {
                                                                        return (
                                                                            <div className="usertags">
                                                                                <p>{tag}</p>
                                                                            </div>
                                                                        )
                                                                    })}</p>

                                                                </ShowMoreText>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Divider style={{ backgroundColor: "lightGray",margin:'.5rem 0' }} />
                                                </Link>
                                            </div>

                                        )
                                    })}

                                </div>
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <TreandingRegularPost />
                </Col>
            </Row>
        </div>
    )
}

export default SaveRegularPostList
