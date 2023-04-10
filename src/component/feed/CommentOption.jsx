import { Avatar, Dropdown, Menu, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/feed_post.css'
import { DeleteComments, userDetails } from '../../services/api_services';
import EditPostComment from './EditPostComment';
import { useSelector } from 'react-redux';




function CommentOption({ commentData, ShowAllPostComment, selectPost  }) {
    const navigate = useNavigate()
    
    const deletBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "PostID": commentData.PostID,
        "CommentID": commentData.CommentID
    }
    const DeletePostComment = async () => {
        await DeleteComments(deletBody).then(res => {
            if (res.data.success) {
                // console.log("delet commet", res);
                ShowAllPostComment()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <EditPostComment commentData={commentData} selectPost={selectPost} ShowAllPostComment={ShowAllPostComment}/>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <p style={{ color: 'red', marginBottom: '0' }} className='menuItem' onClick={DeletePostComment}>
                            <MdDeleteOutline className='comment_option_icon' /> Delete
                        </p>
                    ),
                },

            ]}
        />
    );

    return (

        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                        <FiMoreHorizontal style={{ fontSize: '1rem', margin: '0 .5rem', cursor: 'pointer' }} />
                    </Dropdown>

                </Space>
            </Space>
        </>
    )
}



export default CommentOption
