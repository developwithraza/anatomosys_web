import { Avatar, Dropdown, Menu, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import '../../style/feed_post.css'
import { DeleteComments, MuteChatroom, RemoveAllChatPostSelf, RemoveChatrooms, RemoveOneChatPostSelf, RemoveSelfChatPostforAll, UnmuteChatroomUrl, userDetails } from '../../services/api_services';
import { VscUnmute } from "react-icons/vsc";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

function ChatRoomOption({ chatRoomListData, ShowAllChatRoomList, chatRoomData,chatNow }) {
    const navigate = useNavigate()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)


    const muteBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomListData.ChatroomID,
        "UserChatroomID":chatNow==true && chatRoomData.UserChatroomData.UserChatroomID
    }
    const chatRoomMute = async () => {
        await MuteChatroom(muteBody).then(res => {
            if (res.data.success) {
                // console.log("mute chatroom", res);
                ShowAllChatRoomList()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }

    const unMuteBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomListData.ChatroomID,
        "UserChatroomID": chatNow==true && chatRoomData.UserChatroomData.UserChatroomID
    }
    const ChatRoomUnMute = async () => {
        await UnmuteChatroomUrl(unMuteBody).then(res => {
            if (res.data.success) {
                // console.log("un mute chat", res);
                ShowAllChatRoomList()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }

    const RemoveChatRoomBody = {

        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomListData.ChatroomID,
        "UserChatroomID":chatNow==true && chatRoomData.UserChatroomData.UserChatroomID

    }
    const RemoveChatRoom = async () => {
        await RemoveChatrooms(RemoveChatRoomBody).then(res => {
            if (res.data.success) {
                // console.log("remove  chat rooms", res);
                ShowAllChatRoomList()
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
                    label: (chatRoomListData.UserChatroomData.Whether_Mute != true ?
                        <p style={{color:'#e8aa00',  marginBottom: '0' }} onClick={chatRoomMute}>
                            <IoVolumeMuteOutline className='chat_mute_icon' />  Mute
                        </p> : <p style={{color:'#e8aa00',  marginBottom: '0' }} onClick={ChatRoomUnMute}>
                            <VscUnmute className='chat_mute_icon' />  UnMute
                        </p>
                    ),
                },
                
                {
                    key: '2',
                    label: (
                        <p style={{color:'#e8aa00',  marginBottom: '0' }} className='menuItem' onClick={RemoveChatRoom}>
                             <MdOutlineClose className='chat_option_icon' /> Remove  ChatRoom
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


export default ChatRoomOption