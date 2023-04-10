import { Avatar, Dropdown, Menu, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import '../../style/feed_post.css'
import { DeleteComments, RemoveAllChatPostSelf, RemoveOneChatPostSelf, RemoveSelfChatPostforAll, userDetails } from '../../services/api_services';
import { useSelector } from 'react-redux';


function MsgOption({ FilterAllChatRoomChatData, chatMsgInfo, chatRoomData }) {
    const navigate = useNavigate()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)





    const deletBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatMsgInfo.ChatroomID,
        "UserChatroomID": chatRoomData.UserChatroomData.UserChatroomID,
        "ChatID": chatMsgInfo.ChatID
    }
    const RemoveFromMe = async () => {
        await RemoveOneChatPostSelf(deletBody).then(res => {
            if (res.data.success) {
                // console.log("remove chat", res);
                FilterAllChatRoomChatData()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }

    const RemoveBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatMsgInfo.ChatroomID,
        "UserChatroomID": chatRoomData.UserChatroomData.UserChatroomID,
        "ChatID": chatMsgInfo.ChatID
    }
    const RemoveFromAll = async () => {
        await RemoveSelfChatPostforAll(RemoveBody).then(res => {
            if (res.data.success) {
                // console.log("remove chat", res);
                FilterAllChatRoomChatData()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }



    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <p style={{ color: '#e8aa00', marginBottom: '0' }} className='menuItem' onClick={RemoveFromMe}>
                            <MdOutlineClose className='chat_option_icon' /> Delete for me
                        </p>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <p style={{ color: '#e8aa00', marginBottom: '0' }} className='menuItem' onClick={RemoveFromAll}>
                            <MdOutlineClose className='chat_option_icon' /> Delete for all
                        </p>
                    ),
                },
                // {
                //     key: '3',
                //     label: (
                //         <p style={{color:'#e8aa00',  marginBottom: '0' }} className='menuItem' onClick={RemoveAllChat}>
                //             <MdOutlineClose className='chat_option_icon' /> Remove All Chat
                //         </p>
                //     ),
                // },

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





export default MsgOption
