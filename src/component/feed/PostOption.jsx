import { Alert, Dropdown, Menu, Space,Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/feed_post.css'
import { DeleteComments, RemoveRegularPost, SavePost, UnSavePost, userDetails } from '../../services/api_services';
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { BsFlagFill } from "react-icons/bs";
import EditRegularPost from './EditRegularPost';
import PostReport from './PostReport';
import UserReport from './UserReport';



function PostOption({ postData, userAllReqularPost,selectUserRegularPost, saveMessage, UnSaveMessage }) {
    //save post
    const saveBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "PostID": postData.PostID,

    }
    const SaveRegularPost = async () => {
        await SavePost(saveBody).then(res => {
            if (res.data.success) {
                // console.log("save commet", res);
                userAllReqularPost()
                saveMessage()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    //unsave post
    const unsaveBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "PostID": postData.PostID,

    }
    const UnSaveRegularPost = async () => {
        await UnSavePost(unsaveBody).then(res => {
            if (res.data.success) {
                // console.log("unsave ", res);
                userAllReqularPost()
                UnSaveMessage()
            }
        }).catch(err => {
            console.log(err.responce.data.extras.msg);
        })
    }

    //remove regular post

    const removeBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "PostID": postData.PostID
    }
    const RemoveRegularPosts = async () => {
        await RemoveRegularPost(removeBody).then(res => {
            if (res.data.success) {
                // console.log("remove ", res);
                userAllReqularPost()
            }
        }).catch(err => {
            console.log(err.responce.data.extras.msg);
        })
    }
      const cancel = (e) => {
        console.log(e);
        // message.error('Click on No');
      };

    const menuUser = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (postData.Saved_Information.Available == true ?
                        <p className='optionItem' onClick={UnSaveRegularPost}>
                            <RiBookmarkFill className='more_option_icon' />  Unsave Post
                        </p> : <p className='optionItem' onClick={SaveRegularPost}>
                            <RiBookmarkLine className='more_option_icon' />  Save Post
                        </p>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <PostReport userAllReqularPost={userAllReqularPost} postData={postData} selectUserRegularPost={selectUserRegularPost}/>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <UserReport userAllReqularPost={userAllReqularPost} postData={postData} selectUserRegularPost={selectUserRegularPost}/>
                    ),
                },
                // {
                //     key: '4',
                //     label: (postData.Saved_Information.Available == true ?
                //         <p className='optionItem' onClick={UnSaveRegularPost}>
                //             <RiBookmarkFill className='more_option_icon' />  Unsave Post
                //         </p> : <p className='optionItem' onClick={SaveRegularPost}>
                //             <RiBookmarkLine className='more_option_icon' />  Save Post
                //         </p>
                //     ),
                // },

            ]}
        />
    );
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        postData.Saved_Information.Available == true ?
                            <p className='optionItem' onClick={UnSaveRegularPost}>
                                <RiBookmarkFill className='more_option_icon' />  Unsave Post
                            </p> : <p className='optionItem' onClick={SaveRegularPost}>
                                <RiBookmarkLine className='more_option_icon' />  Save Post
                            </p>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <EditRegularPost postData={postData} userAllReqularPost={userAllReqularPost}/>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Post?"
                            onConfirm={RemoveRegularPosts}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <p className='optionItem'
                            >
                                <MdDeleteOutline className='more_option_icon' /> Delete Post
                            </p>
                        </Popconfirm>

                    ),
                },

            ]}
        />
    );




    return (

        <div className='more_option'>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown overlay={userDetails.userID == postData.USERID ? menu : menuUser} placement="bottomRight" trigger={['click']}>
                        <FiMoreHorizontal style={{ fontSize: '1rem', margin: '0 .5rem', cursor: 'pointer' }} />
                    </Dropdown>

                </Space>
            </Space>
        </div>
    )
}



export default PostOption
