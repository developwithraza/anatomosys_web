import { Alert, Dropdown, Menu, Space } from 'antd';
import React, { useEffect } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/feed_post.css'
import { DeleteComments, SavePost, UnSavePost, userDetails } from '../../services/api_services';
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { BsFlagFill } from "react-icons/bs";
import { Link } from 'react-router-dom';



function SavePostOption({ postData, userAllReqularPost,saveMessage,UnSaveMessage }) {
    //save post
    // const saveBody = {
    //     "ApiKey": userDetails.ApiKey,
    //     "USERID": userDetails.userID,
    //     "SessionID": userDetails.sessionID,
    //     "PostID": postData.PostID,

    // }
    // const SaveRegularPost = async () => {
    //     await SavePost(saveBody).then(res => {
    //         if (res.data.success) {
    //             console.log("save commet", res);
    //             userAllReqularPost()
    //             saveMessage()
    //         }
    //     }).catch(err => {
    //         console.log(err.data.extras.msg);
    //     })
    // }
    // //unsave post
    // const unsaveBody = {
    //     "ApiKey": userDetails.ApiKey,
    //     "USERID": userDetails.userID,
    //     "SessionID": userDetails.sessionID,
    //     "PostID": postData.PostID,

    // }
    // const UnSaveRegularPost = async () => {
    //     await UnSavePost(unsaveBody).then(res => {
    //         if (res.data.success) {
    //             console.log("unsave ", res);
    //             userAllReqularPost()
    //             UnSaveMessage()
    //         }
    //     }).catch(err => {
    //         console.log(err.data.extras.msg);
    //     })
    // }

    const menuUser = (
        <Menu
            items={[
                // {
                //     key: '1',
                //     label: (postData.Saved_Information.Available == true ?
                //         <p className='optionItem' 
                //         onClick={UnSaveRegularPost}
                //         >
                //             <RiBookmarkFill className='more_option_icon' />  Unsave Post
                //         </p> : <p className='optionItem' 
                //         onClick={SaveRegularPost}
                //         >
                //             <RiBookmarkLine className='more_option_icon' />  Save Post
                //         </p>
                //     ),
                // },
                {
                    key: '2',
                    label: (
                        <p className='optionItem'  >
                            <BsFlagFill className='more_option_icon' /> Report Post
                        </p>
                    ),
                },


            ]}
        />
    );
    const menu = (
        <Menu
            items={[
                // {
                //     key: '1',
                //     label: (
                //         postData.Saved_Information.Available == true ?
                //             <p className='optionItem' 
                //             onClick={UnSaveRegularPost}
                //             >
                //                 <RiBookmarkFill className='more_option_icon' />  Unsave Post
                //             </p> : <p className='optionItem' 
                //             onClick={SaveRegularPost}
                //             >
                //                 <RiBookmarkLine className='more_option_icon' />  Save Post
                //             </p>
                //     ),
                // },
                {
                    key: '2',
                    label: (
                        <p className='optionItem'  >
                            <MdModeEditOutline className='more_option_icon' /> Edit Post
                        </p>
                    ),
                },
                // {
                //     key: '3',
                //     label: (
                //         <p className='optionItem'
                //         onClick={DeletePostComment}
                //         >
                //             <MdDeleteOutline className='more_option_icon' /> Delete Post
                //         </p>
                //     ),
                // },

            ]}
        />
    );




    return (

        <div className='more_option'>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown overlay={
                        // userDetails.userID == postData.USERID ? menu : 
                        menuUser} placement="bottomRight" trigger={['click']}>
                        <FiMoreHorizontal style={{ fontSize: '1rem', margin: '0 .5rem', cursor: 'pointer' }} />
                    </Dropdown>

                </Space>
            </Space>
        </div>
    )
}





export default SavePostOption
