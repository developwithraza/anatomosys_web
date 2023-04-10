import { Card } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Divider, Spin, message, Input, Alert } from 'antd'
import '../../style/feed_post.css'
import { AiOutlinePlus, AiOutlineLike, AiOutlineHeart } from "react-icons/ai";
import { MdThumbUp, MdOutlineThumbUpAlt, } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useUserAuth } from '../../context/AuthUserContect';
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { AddPostComment, FetchAllHomeForYouRegularPost, FetchAllHomeTrendingRegularPosts, FilterAllComment, FilterAllCreatedRegualarPosts, FollowUser, GiveLikePost, RemoveLikePost, ShareInnerRegularPost, UnFollow, userDetails } from '../../services/api_services';
import ShowMoreText from "react-show-more-text";
import CommentOption from './CommentOption';
import PostOption from './PostOption';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import { MdOutlineRefresh } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../redux/actions/Action';

function  UserPost({ AllPostLoad }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    


    const { logout, user } = useUserAuth();
    const [showAllComments,setShowAllcomments]=useState(false)
    const navigate = useNavigate()
    const focusInput = useRef(null);
    const [editComment, setEditComment] = useState(false)
    const [saveMsg, setSaveMsg] = useState(false)
    const [unsaveMsg, setUnSaveMsg] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)
    const [commentList, setCommentList] = useState([])
    const [showPostBtn, setShowPostBtn] = useState(false)
    const [userComment, setUserComment] = useState("")
    const [selectPost, setSelectPost] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [userPostList, setUserPostList] = useState([])
    const [commentIsLoad, setCommentIsLoad] = useState(false)
    const [commentCount, setCommentCount] = useState('')
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const initialPosts = slice(userPostList, 0, limit)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        if (focusInput.current) {
            focusInput.current.focus();
        }
    }, [focusInput]);
    //loading post
    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
        ) {
            setLimit((pre) => pre + 3)
            // console.log(limit)
            setIsMoreLoading(true)
        }
        if (limit >= dataCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", loadMore)
        return () => window.removeEventListener("scroll", loadMore)
    }, [limit <= dataCount])
    //laod more comment 
    const loadMoreComment = () => {
        setLimit(limit + 3)
        // console.log(limit)
        setCommentIsLoad(true)
        if (limit >= commentCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    //save and un save message
    const saveMessage = () => {
        setSaveMsg(true)
        setTimeout(() => {
            setSaveMsg(false)
        }, 10000)
    }
    const UnSaveMessage = () => {
        setUnSaveMsg(true)
        setTimeout(() => {
            setUnSaveMsg(false)
        }, 10000)
    }
    const AllPostBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": skip,
        "limit": limit
    }
    

    const userAllReqularPost = async () => {
        await FetchAllHomeForYouRegularPost(AllPostBody).then(res => {
            // console.log("UserPostLister", res);
            if (res.data.success) {
                setUserPostList(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                setIsLoading(false)
                setTimeout(() => {
                    setIsMoreLoading(false)
                }, 1000)
            }
        }).catch(err => {
            if (err.response.data.extras.msg === "Session Expired") {
                logout().then(res => {
                    dispatch(LOGOUT())
                    sessionStorage.clear()
                    navigate('/login_page')
                }).catch(err => {
                    message.error(err.message);

                })
            }

        })
    }

    useEffect(() => {
        userAllReqularPost()
    }, [limit])
    useEffect(() => {
        AllPostLoad == true && userAllReqularPost()
    }, [])

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

            if (res.data.success) {
                // console.log("follow", res);
                userAllReqularPost()
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
                // console.log("unfollow", res);
                userAllReqularPost()
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
                // console.log("like", res);
                userAllReqularPost()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    //remove like from post
    const RemoveLikeFromPost = async (id) => {
        await RemoveLikePost({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "PostID": id,

        }).then(res => {

            if (res.data.success) {

                userAllReqularPost()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    const handleComment = (postData) => {
        setSelectPost(postData)
        setShowAllcomments(true)
        // ShowAllPostComment()
    }
    //show all post comment
    const commentBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PostID": selectPost.PostID,
        "skip": skip,
        "limit": limit
    }

    const ShowAllPostComment = async () => {
        await FilterAllComment(commentBody).then(res => {
            if (res.data.success) {
                setCommentList(res.data.extras.Data)
                setCommentCount(res.data.extras.Count)
                setCommentLoading(false)
                // console.log("all commet", res);
                setIsLoading(false)
                setCommentIsLoad(false)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    useEffect(() => {

        showAllComments  && ShowAllPostComment()

    }, [showAllComments, limit])

    //add comment on post 
    const addCommnetOnPost = async (id) => {
        await AddPostComment({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "PostID": id,
            "Comment_Information": userComment

        }).then(res => {
            if (res.data.success) {
                userAllReqularPost()
                ShowAllPostComment()
                setUserComment("")
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }


    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );

    const editPosthandle = () => {
        setEditComment(true)
    }

    const closeLightbox = () => {
        setOpen(true);
    };

    const sharePostHandle = async (post_id) => {
        await ShareInnerRegularPost({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "PostID": post_id
        }).then(res => {
            // console.log("Share post", res);
            if (res.data.success) {
                // message.success(res.data.extras.Status);
                userAllReqularPost()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    return (
        <div className='user_feed_post'>
            <div className="saveMessage">
                {saveMsg == true && <Alert message="save post in your save post list" action={<Link to='/save_regular_post'><strong>Go to Save list</strong></Link>} type="success" showIcon closable />}
                {unsaveMsg == true && <Alert message="unsave post  in your save post list" type="info" showIcon closable action={<Link to='/save_regular_post'><strong>Show to Save list</strong></Link>} />}
            </div>
            {isLoading ? <div className="loadingpost">
                <Spin />
            </div> : initialPosts.map((post) => {
                return (
                    <div className="all_regular_post_list" key={post.PostID}>
                        <Card >
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
                            </div>
                            <div className="feed_post_design">
                                <Link to={`/select_following_user/${post.USERID}`} >
                                    <div className="post_user_details">
                                        <div className="post_images">
                                            {post.User_Information.Whether_Image_Available == true ?
                                                <img
                                                    src={post.User_Information.Image_Information.Image550}
                                                    alt="Image!"
                                                />
                                                :
                                                <img src={NotImg} />
                                            }
                                        </div>
                                        <div className="post_user_info">
                                            <p style={{ fontSize: '1rem', fontWeight: '600' }}>{post.User_Information.Name}</p>
                                            <p style={{ fontSize: '1rem', fontWeight: '500' }} className='specilisation'>{post.User_Information.Whether_Professional_Details_Available == true && post.User_Information.Hospital_Name}</p>
                                            <p style={{ fontSize: '1rem', color: 'gray', marginTop: '.2rem' }}>{post.User_Information.Whether_Professional_Details_Available == true && post.User_Information.Specialisation_Name}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="more_option_follow">
                                    {(() => {
                                        if (post.User_Information.USERID == userDetails.userID) {
                                            return null
                                        }
                                        else {

                                            if (post.User_Information.Whether_Following == false) {
                                                return <div className="post_follower">
                                                    <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><span><AiOutlinePlus style={{ marginTop: '-3px' }} /></span>Follow</p></Button>
                                                </div>
                                            }
                                            else if (post.User_Information.Whether_Following == true) {
                                                return <div className="user_following">
                                                    <Button type='link' onClick={(id) => unFollowHandle(post.USERID)}><p><span><BsCheck2All style={{ marginTop: '-3px' }} /></span>Following</p></Button>
                                                </div>
                                            }
                                            else if (post.User_Information.Whether_Follower == false) {
                                                return <div className="post_follower">
                                                    <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><span><AiOutlinePlus style={{ marginTop: '-3px' }} /></span>Follow</p></Button>
                                                </div>
                                            }
                                            else if (post.User_Information.Whether_Follower == true) {
                                                return <div className="post_follower">
                                                    <Button type='link' onClick={(id) => FollowHandle(post.USERID)}><p><span><AiOutlinePlus style={{ marginTop: '-3px' }} /></span>Follow</p></Button>
                                                </div>
                                            }
                                            else {
                                                return <p></p>
                                            }
                                        }

                                    })()}
                                    <PostOption postData={post} userAllReqularPost={userAllReqularPost} UnSaveMessage={UnSaveMessage} saveMessage={saveMessage} />
                                </div>
                            </div>
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
                                            <div>{post.Shared_Post_Information
                                                .Post_Description} <br /><p>Tags : </p> {post.Tags.map((tag, index) => {
                                                    return (
                                                        <div className="usertags" key={index}>
                                                            <p>{tag}</p>
                                                        </div>
                                                    )
                                                })}</div>

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
                                {post.PostID == selectPost.PostID &&
                                    <div className='post_comment' >

                                        <div className="create_comment">
                                            <div className="user_img">
                                                <img src={selectPost.User_Information.Image_Information.Image550} />
                                            </div>
                                            <div className="imput_Comment">
                                                <Input.TextArea
                                                    placeholder='Add a Comment..'
                                                    autoSize
                                                    name='comment'
                                                    value={userComment}
                                                    ref={focusInput}
                                                    onChange={(event) => {
                                                        setUserComment(event.target.value)
                                                        setShowPostBtn(true)
                                                    }}


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
                                                        <div className={selectPost.USERID == comt.USERID ? 'show_auther_comment' : 'show_multiple_comment'}  >
                                                            <div className="comment_user_info">
                                                                {comt.User_Information.Whether_Image_Available == true ? <img src={comt.User_Information.Image_Information.Image550} /> : <img src={Empty_Img} />}
                                                            </div>
                                                            <div className={selectPost.USERID == comt.USERID ? 'commentAllListAuther' : 'commentAllList'}>
                                                                <div className="comment_lists">

                                                                    <p>{comt.User_Information.Name}{selectPost.USERID == comt.USERID && <span className='auther'>Auther</span>}</p>
                                                                    <p className='multi_comment'>{comt.Comment_Information}</p>
                                                                </div>
                                                                <div className="commentMoreOption">
                                                                    {userDetails.userID == comt.USERID && <CommentOption commentData={comt} ShowAllPostComment={ShowAllPostComment} editPosthandle={editPosthandle} userAllReqularPost={userAllReqularPost}
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
                                                <div>{post.Post_Description} <br />   <p>Tags : </p> { post.Tags.map((tag, index) => {
                                                    return (
                                                        <div className="usertags" key={index}>
                                                            
                                                            <p>{tag}</p>
                                                        </div>
                                                    )
                                                })}</div>

                                            </ShowMoreText>

                                        </div>
                                        {post.Gallery_Records_Information.map((gallary, index) => {
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
                                    {post.PostID == selectPost.PostID &&
                                        <div className='post_comment' >

                                            <div className="create_comment">
                                                <div className="user_img">
                                                    <img src={selectPost.User_Information.Image_Information.Image550} />
                                                </div>
                                                <div className="imput_Comment">
                                                    <Input.TextArea
                                                        placeholder='Add a Comment..'
                                                        name='comment'
                                                        autoSize

                                                        ref={focusInput}
                                                        value={userComment}
                                                        onChange={(event) => {
                                                            setUserComment(event.target.value)
                                                            setShowPostBtn(true)
                                                        }}

                                                    />
                                                    <div className="comment_post_btn">
                                                        {showPostBtn && <Button type='primary' onClick={(id) => addCommnetOnPost(post.PostID)}>Post</Button>}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="show_comment_section">
                                                {commentList.map((comt) => {
                                                    return (
                                                        <div key={comt.USERID}>
                                                            <div className={selectPost.USERID == comt.USERID ? 'show_auther_comment' : 'show_multiple_comment'} >
                                                                <div className="comment_user_info">
                                                                    <img src={comt.User_Information.Image_Information.Image550} />
                                                                </div>
                                                                <div className={selectPost.USERID == comt.USERID ? 'commentAllListAuther' : 'commentAllList'}>
                                                                    <div className="comment_lists">

                                                                        <p>{comt.User_Information.Name}{selectPost.USERID == comt.USERID && <span className='auther'>Auther</span>}</p>
                                                                        <p className='multi_comment'>{comt.Comment_Information}</p>
                                                                    </div>
                                                                    <div className="commentMoreOption">
                                                                        {userDetails.userID == comt.USERID && <CommentOption commentData={comt} ShowAllPostComment={ShowAllPostComment} editPosthandle={editPosthandle} userAllReqularPost={userAllReqularPost}
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
                            }
                        </Card>

                    </div>
                )
            })}

            {isCompleted ? <div className="more_loading"> <Button type='link' disabled>No More Post</Button> </div> : isMoreLoading && <div className="more_loading">
                <div class="lds-ellipsis"><div></div><div></div><div></div></div>
            </div>


            }
        </div>
    )
}

export default UserPost
