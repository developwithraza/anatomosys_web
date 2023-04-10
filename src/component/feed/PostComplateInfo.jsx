
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchRegularPostBasicInfo, FetchRegularPostCompleteInfo, ShareInnerRegularPost, ShowSavePostDetails } from '../../services/api_services';
import { Alert, Button, Divider, Input, message, Spin } from 'antd';
import { AiOutlinePlus, AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { MdThumbUp, MdOutlineThumbUpAlt, } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useUserAuth } from '../../context/AuthUserContect';
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { AddPostComment, FetchAllHomeTrendingRegularPosts, FilterAllComment, FilterAllCreatedRegualarPosts, FollowUser, GiveLikePost, RemoveLikePost, UnFollow, userDetails } from '../../services/api_services';
import ShowMoreText from "react-show-more-text";
import { LoadingOutlined } from '@ant-design/icons';
import CommentOption from './CommentOption';
import PostOption from './PostOption';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import PeopleYouKnow from '../../pages/profile/PeopleYouKnow';
import SelectedUserProfile from '../../pages/myNetwork/myFollowing/SelectedUserProfile';
import PostCreateUser from './PostCreateUser';
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import { slice } from 'lodash'
import { MdOutlineRefresh } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { useSelector } from 'react-redux';
function PostComplateInfo() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const { id } = useParams()
    const { navigate } = useNavigate()
    const [post, setPost] = useState([])
    const [userData, setUserData] = useState([])
    const [selectPost, setSelectPost] = useState([])
    const [showPostBtn, setShowPostBtn] = useState(false)
    const [saveMsg, setSaveMsg] = useState(false)
    const [unsaveMsg, setUnSaveMsg] = useState(false)
    const [userComment, setUserComment] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false)
    const [userPostList, setUserPostList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState('')
    const [currentStatus, setCurrentStatus] = useState(1)
    const [commentList, setCommentList] = useState([])
    const [commentNow, setCommentNow] = useState(false)
    const [tagList, setTagList] = useState([])
    const [open, setOpen] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [commentIsLoad, setCommentIsLoad] = useState(false)
    const [loadMoreComment, setLoadMoreComment] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [EditComment, setEditComment] = useState(false)




    const postBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "PostID": id
    }
    const RegularPostDatails = async () => {
        await FetchRegularPostCompleteInfo(postBody).then(res => {
            if (res.data.success) {
                setPost(res.data.extras.Data)
                setUserData(res.data.extras.Data.User_Information)
                setTagList(res.data.extras.Data.Tags)
                // console.log(" single post info", res);
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        RegularPostDatails()
    }, [])

    const editPosthandle = () => {
        setEditComment(true)
    }


    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    const FollowHandle = async (id) => {
        await FollowUser({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {
            // console.log("Follow", res);

            if (res.data.success) {

                RegularPostDatails()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }

    const unFollowHandle = async (id) => {
        await UnFollow({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "Selected_USERID": id,
        }).then(res => {

            if (res.data.success) {

                RegularPostDatails()
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }
    //give like on post

    const GiveLikeOnPost = async (id) => {
        await GiveLikePost({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "PostID": id,
            "Like_Type": 1

        }).then(res => {

            if (res.data.success) {

                RegularPostDatails()
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }

    //remove like from post
    const RemoveLikeFromPost = async (id) => {
        await RemoveLikePost({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "PostID": id,

        }).then(res => {

            if (res.data.success) {

                RegularPostDatails()
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }

    const handleComment = (postData) => {
        setCommentNow(true)
        // console.log("selectPost", selectPost)
        ShowAllPostComment()
    }
    //show all post comment
    const commentBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PostID": id,
        "skip": skip,
        "limit": limit
    }

    const ShowAllPostComment = async () => {
        await FilterAllComment(commentBody).then(res => {
            if (res.data.success) {
                setCommentList(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                setCommentLoading(false)
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    useEffect(() => {
        ShowAllPostComment()

    }, [currentStatus])

    //add comment on post 
    const addCommnetOnPost = async (id) => {
        await AddPostComment({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "PostID": id,
            "Comment_Information": userComment

        }).then(res => {
            // console.log("Add comment", res);
            if (res.data.success) {

                RegularPostDatails()
                ShowAllPostComment()
                setUserComment("")
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }
    // const saveMessage = () => {
    //     setSaveMsg(true)
    //     setTimeout(() => {
    //         setSaveMsg(false)
    //     }, 10000)
    // }
    // const UnSaveMessage = () => {
    //     setUnSaveMsg(true)
    //     setTimeout(() => {
    //         setUnSaveMsg(false)
    //     }, 10000)
    // }
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );

    const closeLightbox = () => {
        setOpen(true);
    };

    const sharePostHandle = async (post_id) => {
        await ShareInnerRegularPost({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "PostID": post_id
        }).then(res => {
            // console.log("Share post", res);
            if (res.data.success) {
                RegularPostDatails()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    return (
        <div className='container save_post_section'>
            <Row>
                <Col md={3}>
                    <PostCreateUser userData={userData} />
                </Col>
                <Col md={6}>
                    <div className='user_feed_posts'>
                        <div className="saveMessage">
                            {saveMsg == true && <Alert message="save post in your save post list" action={<Link to='/save_regular_post'><strong>Go to Save list</strong></Link>} type="success" showIcon closable />}
                            {unsaveMsg == true && <Alert message="unsave post  in your save post list" type="info" showIcon closable action={<Link to='/save_regular_post'><strong>Show to Save list</strong></Link>} />}
                        </div>
                        {isLoading ? <div className="loadingpost">
                            <Spin />
                        </div> :
                            <div className="all_regular_post_list">
                                <Card key={post.PostID}>
                                    <div className="share_Post">
                                        {post.Whether_Shared_Post == true && <div className='innerShare_post'>
                                            <Link to={`/select_following_user/${post.Shared_Post_Information.USERID}`} >
                                                <div className="share_post_user_info">
                                                    <div className="share_user_image">
                                                        <img src={post.Shared_Post_Information.User_Information.Image_Information.Image550} />
                                                    </div>
                                                    <div className="share_user_info">
                                                        <p>{post.Shared_Post_Information.User_Information.Name}</p>
                                                    </div>
                                                    <div className="share_post_title">
                                                        <p>Shared Post</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>}

                                        {/* <Divider style={{marginTop:'.5rem'}}/> */}
                                    </div>
                                    <Link to={`/select_following_user/${post.USERID}`} >
                                        <div className="feed_post_design">
                                            <div className="post_user_details">
                                                <div className="post_images">
                                                    {userData.Whether_Image_Available == true ?
                                                        <img
                                                            src={userData.Image_Information.Image550}
                                                            alt="Image!"
                                                        />
                                                        :
                                                        <img src={NotImg} />
                                                    }
                                                </div>
                                                <div className="post_user_info">
                                                    <p style={{ fontSize: '1rem', fontWeight: '600' }}>{userData.Name}</p>
                                                    <p style={{ fontSize: '1rem', fontWeight: '500' }} className='specilisation'>{userData.Whether_Professional_Details_Available == true && userData.Hospital_Name}</p>
                                                    <p style={{ fontSize: '1rem', color: 'gray', marginTop: '.2rem' }}>{userData.Whether_Professional_Details_Available == true && userData.Specialisation_Name}</p>
                                                </div>
                                            </div>
                                            <div className="more_option_follow">
                                                {(() => {
                                                    if (post.User_Information.USERID == getUSerData.userID) {
                                                        return null
                                                    }
                                                    else {

                                                        if (post.User_Information.Whether_Following == false) {
                                                            return <div className="post_follower">
                                                                <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><sapn><AiOutlinePlus style={{ marginTop: '-3px' }} /></sapn>Follow</p></Button>
                                                            </div>
                                                        }
                                                        else if (post.User_Information.Whether_Following == true) {
                                                            return <div className="user_following">
                                                                <Button type='link' onClick={(id) => unFollowHandle(post.USERID)}><p><sapn><BsCheck2All style={{ marginTop: '-3px' }} /></sapn>Following</p></Button>
                                                            </div>
                                                        }
                                                        else if (post.User_Information.Whether_Follower == false) {
                                                            return <div className="post_follower">
                                                                <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><sapn><AiOutlinePlus style={{ marginTop: '-3px' }} /></sapn>Follow</p></Button>
                                                            </div>
                                                        }
                                                        else if (post.User_Information.Whether_Follower == true) {
                                                            return <div className="post_follower">
                                                                <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><sapn><AiOutlinePlus style={{ marginTop: '-3px' }} /></sapn>Follow</p></Button>
                                                            </div>
                                                        }
                                                        else {
                                                            return <p></p>
                                                        }
                                                    }

                                                })()}
                                                {/* <PostOption postData={post} RegularPostDatails={RegularPostDatails} UnSaveMessage={UnSaveMessage} saveMessage={saveMessage} /> */}
                                            </div>
                                        </div>
                                    </Link>
                                    {post.Whether_Shared_Post == true ? <>

                                        <div className="post_content">
                                            <div className="post_title">
                                                <p>{post.Shared_Post_Information.Post_Title}</p>
                                            </div>
                                            <div className="post_content_item">
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
                                                    <p>{post.Shared_Post_Information
                                                        .Post_Description} <br /> <p>Tags : </p> {post.Tags.map((tag, index) => {
                                                            return (
                                                                <div className="usertags" key={index}>

                                                                    <p>{tag}</p>
                                                                </div>
                                                            )
                                                        })}</p>

                                                </ShowMoreText>

                                            </div>
                                            {post.Shared_Post_Information.Gallery_Records_Information.map((gallary, index) => {
                                                return (
                                                    <div className="post_content_images" key={index}>
                                                        {gallary.Media_Type == 1 &&
                                                            <ModalImage
                                                                small={gallary.Image_Information.Image550}
                                                                large={gallary.Image_Information.Image550}
                                                                alt="Image"
                                                            />
                                                        }
                                                        {open && <Lightbox
                                                            medium={gallary.Image_Information.Image550}
                                                            large={gallary.Image_Information.Image550}
                                                            alt="Post Image"
                                                            onClose={closeLightbox}
                                                        />}
                                                        {/* <img src={gallary.Image_Information.Image550
                                                } /> */}

                                                        {gallary.Media_Type == 2 &&

                                                            <ModalImage
                                                                small={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                large={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                alt="Image"
                                                            />
                                                        }
                                                        {open && <Lightbox
                                                            medium={gallary.Gif_Image_Information.Gif_Image_URL}
                                                            large={gallary.Gif_Image_Information.Gif_Image_URL}
                                                            alt="Post Image"
                                                            onClose={closeLightbox}
                                                        />}
                                                        {/* <img src={gallary.Gif_Image_Information.Gif_Image_URL
                                                } /> */}


                                                        {gallary.Media_Type == 4 && <video controls >
                                                            <source src={gallary.Video_Information.Video_Original_URL} type="video/mp4" />
                                                        </video>}
                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <div className="comment_share_section">
                                            <div className="like_count">
                                                <p>
                                                    {post.Like_Information.Total > 0 ? <MdThumbUp className='likeCount' /> : <MdThumbUp style={{ marginRight: ".5rem" }} />}
                                                    {/* {post.Like_Information[2] && <AiOutlineHeart className='heartCount'/>}  */}

                                                    <span className='like_comment'>{post.Like_Information.Total} Likes</span>
                                                </p>
                                                <p className='like_comment' >{post.No_of_Comments} Comment</p>
                                                <p className='like_comment'>{post.No_of_Inner_Shares} Share </p>
                                            </div>
                                            <Divider style={{ marginTop: '.5rem' }} />
                                            <div className="like_comment_share">
                                                {post.Post_Like_Information.Available == true ? <Button type='link' onClick={(id) => RemoveLikeFromPost(post.PostID
                                                )}><span className='like_icon'><MdThumbUp /></span> <p> Like</p></Button> : <Button type='link' onClick={(id) => GiveLikeOnPost(post.PostID
                                                )}><span className='comment_icon'><MdOutlineThumbUpAlt /></span> <p> Like</p></Button>}

                                                <Button type='link' onClick={(postData) => handleComment(post)}> <span className='comment_icon'><FaRegComment /></span><p> Comment</p></Button>
                                                <Button type='link' onClick={(post_id) => sharePostHandle(post.PostID)}><span className='comment_icon'><RiShareForwardLine /></span> <p> Share</p></Button>
                                            </div>
                                        </div>
                                        {commentNow == true &&
                                            <div className='post_comment' >

                                                <div className="create_comment">
                                                    <div className="user_img">
                                                        <img src={post.User_Information.Image_Information.Image550} />
                                                    </div>
                                                    <div className="imput_Comment">
                                                        <Input.TextArea
                                                            placeholder='Add a Comment..'
                                                            name='comment'
                                                            value={userComment}
                                                            // ref={focusInput}
                                                            onChange={(event) => {
                                                                setUserComment(event.target.value)
                                                                setShowPostBtn(true)
                                                            }}
                                                            autoSize


                                                        />
                                                        <div className="comment_post_btn">
                                                            {showPostBtn && <Button type='primary' onClick={(id) => addCommnetOnPost(post.PostID)}>Post</Button>}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="show_comment_section">
                                                    {commentList.map((comt, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className={selectPost.USERID == comt.USERID ? 'show_auther_comment' : 'show_multiple_comment'}>
                                                                    <div className="comment_user_info">
                                                                        {comt.User_Information.Whether_Image_Available == true ? <img src={comt.User_Information.Image_Information.Image550} /> : <img src={Empty_Img} />}
                                                                    </div>
                                                                    <div className={selectPost.USERID == comt.USERID ? 'commentAllListAuther' : 'commentAllList'}>
                                                                        <div className="comment_lists">

                                                                            <p>{comt.User_Information.Name}{selectPost.USERID == comt.USERID && <span className='auther'>Auther</span>}</p>
                                                                            <p className='multi_comment'>{comt.Comment_Information}</p>
                                                                        </div>
                                                                        <div className="commentMoreOption">
                                                                            {userDetails.userID == comt.USERID && <CommentOption commentData={comt} ShowAllPostComment={ShowAllPostComment} editPosthandle={editPosthandle} RegularPostDatails={RegularPostDatails}
                                                                                selectPost={selectPost}
                                                                            />
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                {isCompleted ? (
                                                    <div className="load_more_cpmment">
                                                        <Button type='link' disabled>{!isMoreLoading && <FcCancel style={{ marginTop: '-.2rem', marginRight: '.3rem' }} />} No More Comment</Button>
                                                    </div>
                                                ) : (
                                                    <div className="load_more_cpmment">
                                                        <Button type='link' onClick={loadMoreComment}>{commentIsLoad && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />}{!isMoreLoading && <MdOutlineRefresh style={{ marginRight: '.3rem' }} />} Load More Comment</Button>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    </>
                                        : <>

                                            <div className="post_content">
                                                <div className="post_title">
                                                    <p>{post.Post_Title}</p>
                                                </div>
                                                <div className="post_content_item">
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
                                                        <p>{post.Post_Description} <br />{post.Tags.map((tag) => {
                                                            return (
                                                                <div className="usertags">
                                                                    <p>Tags : </p>
                                                                    <p>{tag}</p>
                                                                </div>
                                                            )
                                                        })}</p>

                                                    </ShowMoreText>

                                                </div>
                                                {post.Gallery_Records_Information.map((gallary) => {
                                                    return (
                                                        <div className="post_content_images">
                                                            {gallary.Media_Type == 1 &&
                                                                <ModalImage
                                                                    small={gallary.Image_Information.Image550}
                                                                    large={gallary.Image_Information.Image550}
                                                                    alt="Image"
                                                                />
                                                            }
                                                            {open && <Lightbox
                                                                medium={gallary.Image_Information.Image550}
                                                                large={gallary.Image_Information.Image550}
                                                                alt=" Image"
                                                                onClose={closeLightbox}
                                                            />}
                                                            {/* <img src={gallary.Image_Information.Image550
                                                } /> */}

                                                            {gallary.Media_Type == 2 &&

                                                                <ModalImage
                                                                    small={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                    large={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                    alt="Image"
                                                                />
                                                            }
                                                            {open && <Lightbox
                                                                medium={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                large={gallary.Gif_Image_Information.Gif_Image_URL}
                                                                alt="Image"
                                                                onClose={closeLightbox}
                                                            />}

                                                            {gallary.Media_Type == 4 && <video controls >
                                                                <source src={gallary.Video_Information.Video_Original_URL} type="video/mp4" />
                                                            </video>}
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div className="comment_share_section">
                                                <div className="like_count">
                                                    <p>
                                                        {post.Like_Information.Total > 0 ? <MdThumbUp className='likeCount' /> : <MdThumbUp style={{ marginRight: ".5rem" }} />}
                                                        {/* {post.Like_Information[2] && <AiOutlineHeart className='heartCount'/>}  */}

                                                        <span className='like_comment'>{post.Like_Information.Total} Likes</span>
                                                    </p>
                                                    <p className='like_comment' >{post.No_of_Comments} Comment</p>
                                                    <p className='like_comment'>{post.No_of_Inner_Shares} Share </p>
                                                </div>
                                                <Divider style={{ marginTop: '.5rem' }} />
                                                <div className="like_comment_share">
                                                    {post.Post_Like_Information.Available == true ? <Button type='link' onClick={(id) => RemoveLikeFromPost(post.PostID
                                                    )}><span className='like_icon'><MdThumbUp /></span> <p> Like</p></Button> : <Button type='link' onClick={(id) => GiveLikeOnPost(post.PostID
                                                    )}><span className='comment_icon'><MdOutlineThumbUpAlt /></span> <p> Like</p></Button>}

                                                    <Button type='link' onClick={(postData) => handleComment(post)}> <span className='comment_icon'><FaRegComment /></span><p> Comment</p></Button>
                                                    <Button type='link' onClick={(post_id) => sharePostHandle(post.PostID)}><span className='comment_icon'><RiShareForwardLine /></span> <p> Share</p></Button>
                                                </div>
                                            </div>
                                            {commentNow == true &&
                                                <div className='post_comment' >

                                                    <div className="create_comment">
                                                        <div className="user_img">
                                                            <img src={post.User_Information.Image_Information.Image550} />
                                                        </div>
                                                        <div className="imput_Comment">
                                                            <Input.TextArea
                                                                placeholder='Add a Comment..'
                                                                name='comment'
                                                                // ref={focusInput}
                                                                value={userComment}
                                                                onChange={(event) => {
                                                                    setUserComment(event.target.value)
                                                                    setShowPostBtn(true)
                                                                }}
                                                                autoSize


                                                            />
                                                            <div className="comment_post_btn">
                                                                {showPostBtn && <Button type='primary' onClick={(id) => addCommnetOnPost(post.PostID)}>Post</Button>}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="show_comment_section">
                                                        {commentList.map((comt) => {
                                                            return (
                                                                <>
                                                                    <div className={selectPost.USERID == comt.USERID ? 'show_auther_comment' : 'show_multiple_comment'}>
                                                                        <div className="comment_user_info">
                                                                            <img src={comt.User_Information.Image_Information.Image550} />
                                                                        </div>
                                                                        <div className={selectPost.USERID == comt.USERID ? 'commentAllListAuther' : 'commentAllList'}>
                                                                            <div className="comment_lists">

                                                                                <p>{comt.User_Information.Name}{selectPost.USERID == comt.USERID && <span className='auther'>Auther</span>}</p>
                                                                                <p className='multi_comment'>{comt.Comment_Information}</p>
                                                                            </div>
                                                                            <div className="commentMoreOption">
                                                                                {userDetails.userID == comt.USERID && <CommentOption commentData={comt} ShowAllPostComment={ShowAllPostComment} editPosthandle={editPosthandle} RegularPostDatails={RegularPostDatails}
                                                                                    selectPost={selectPost}
                                                                                />
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                    {isCompleted ? (
                                                        <div className="load_more_cpmment">
                                                            <Button type='link' disabled>{!isMoreLoading && <FcCancel style={{ marginTop: '-.2rem', marginRight: '.3rem' }} />} No More Comment</Button>
                                                        </div>
                                                    ) : (
                                                        <div className="load_more_cpmment">
                                                            <Button type='link' onClick={loadMoreComment}>{commentIsLoad && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />}{!isMoreLoading && <MdOutlineRefresh style={{ marginRight: '.3rem' }} />} Load More Comment</Button>
                                                        </div>
                                                    )}

                                                </div>
                                            }

                                        </>
                                    }
                                </Card>

                            </div>


                        }
                    </div>
                </Col>


                <Col md={3}>
                    <PeopleYouKnow />
                </Col>
            </Row>
        </div>
    )
}



export default PostComplateInfo