import { Button, Divider, Empty, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { Scrollbar } from 'react-scrollbars-custom';
import { ChatroomPostChat, FilterAllChatroomChat, RemoveAllChatPostSelf, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services';
import Empty_Img from "../../assets/illustrat_Image/not_img.png"
import MsgOption from './MsgOption';
import { Card, Col, InputGroup } from 'react-bootstrap';
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import ModalImage from "react-modal-image";

import { usePubNub } from 'pubnub-react';
import { useSelector } from 'react-redux';
import InputEmoji from "react-input-emoji";

function ChatRoom({ chatRoomData, chatNow, shwoChatRoomChat, ShowAllChatRoomList }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [showMsg, setShowMsg] = useState(chatNow)
    const [allChats, setAllChats] = useState([])
    const [chatCount, setChatCount] = useState(null)
    const [chatDec, setChatDec] = useState("")
    const [mediaType, setMediaType] = useState(1)
    const [chatImg, setChatImg] = useState("")
    const [chatVideo, setchatVideo] = useState("")
    const [uploadImg, setUploadImg] = useState("")
    const [uploadVedio, setUploadVedio] = useState("")
    const [reviewImg, setReviewImg] = useState("")
    const [reviewVideo, setReviewVideo] = useState("")
    const [reviewMsg, setReviewMsg] = useState(false)
    const [reviewMsgs, setReviewMsgs] = useState(false)
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const pubnub = usePubNub();
    const [channels] = useState([chatRoomData.ChatroomID]);
    const messagesEndRef = useRef(null)
    const [showEmoji, setShowEmoji] = useState(false)








    useEffect(() => {
        const listenerParams = { chatDec }
        pubnub.addListener(listenerParams);
        pubnub.subscribe({ channels: channels });
        // console.log("pubnub_subscribe", pubnub.subscribe({ channels: channels }));


        shwoChatRoomChat && FilterAllChatRoomChatData()
        return () => {
            pubnub.unsubscribe({ channels })
            pubnub.removeListener(listenerParams)

        }
    }, [pubnub, channels]);



    const chatBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomData.ChatroomID,
        "UserChatroomID": chatNow == true && chatRoomData.UserChatroomData.UserChatroomID,
        "skip": 0,
        "limit": 100
    }

    const FilterAllChatRoomChatData = async () => {
        await FilterAllChatroomChat(chatBody).then(res => {
            // console.log(' filter chatroom all chats', res);
            if (res.data.success) {
                setAllChats(res.data.extras.Data)
                setChatCount(res.data.extras.Count)

            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        shwoChatRoomChat && FilterAllChatRoomChatData()
    }, [chatRoomData])


    //create chat
    const createChatBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomData.ChatroomID,
        "UserChatroomID": chatNow == true && chatRoomData.UserChatroomData.UserChatroomID,
        "Media_Type": mediaType,
        "Description": chatDec,
        "ImageID": chatImg,
        "VideoID": chatVideo
    }
    console.log(createChatBody)

    const createChatHandler = async () => {
        await ChatroomPostChat(createChatBody).then(res => {
            // console.log(' create post chat', res);
            if (res.data.success) {
                setChatDec("")
                if (chatDec) {
                    pubnub
                        .publish({ channel: channels[0], chatDec })
                        .then(() => setChatDec(''));

                }
                FilterAllChatRoomChatData()
                setReviewMsg(false)
                setReviewMsgs(false)
                setChatImg("")
                setchatVideo("")
                setMediaType(1)
                setReviewImg("")
                setReviewVideo("")
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields()
    }

    //chat vedio image 
    const uploadVedioHandler = (e) => {
        setUploadVedio(e.target.files[0]);
        setReviewVideo(URL.createObjectURL(e.target.files[0]));
        setMediaType(3)
        // console.log("mediaType", mediaType);

    }
    const uploadVedioClick = async () => {
        const fdv = new FormData();
        fdv.append('video', uploadVedio)
        fdv.append('Whether_Thumbnail_Image_Available', "false")


        await UploadPostVedio(fdv).then(res => {
            if (res.data.success) {
                setchatVideo(res.data.extras.VideoID)
                setReviewMsgs(true)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }

    const uploadImgHandler = (e) => {
        setUploadImg(e.target.files[0]);
        setMediaType(2)
        setReviewImg(URL.createObjectURL(e.target.files[0]));
        // console.log("UploadImg", e.target.files[0]);

    }

    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', uploadImg)

        await UploadUserImage(fd).then(res => {
            if (res.data.success) {
                setChatImg(res.data.extras.ImageID)
                setReviewMsg(true)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }

    useEffect(() => {
        uploadImg != "" && uploadimageClick()
        uploadVedio != "" && uploadVedioClick()
    }, [uploadImg, uploadVedio])



    const RemoveAllBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ChatroomID": chatRoomData.ChatroomID,
        "UserChatroomID": chatNow == true && chatRoomData.UserChatroomData.UserChatroomID,

    }
    const RemoveAllChat = async () => {
        await RemoveAllChatPostSelf(RemoveAllBody).then(res => {
            if (res.data.success) {
                // console.log("remove all chat", res);
                FilterAllChatRoomChatData()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }
    const handleOnEnter = (e) => {
        console.log(e)
    }


    return (
        <div className='chating_section'>
            <div className="chating_heading">
                <div className="chating_user_info">
                    {chatNow == true && chatRoomData.SelectUserData.Whether_Image_Available == true ? <img src={chatRoomData.SelectUserData.Image_Information.Image250} /> : <img src={Empty_Img} />}
                    <p>{chatNow == true && chatRoomData.SelectUserData.Name}</p>
                    <p style={{ marginLeft: '.5rem', color: "black" }}>{chatNow == true && chatRoomData.SelectUserData.Whether_Professional_Details_Available == true && chatRoomData.SelectUserData.Specialisation_Name}</p>
                </div>
                <div className="all_chat_clear">
                    <Button type='link' onClick={RemoveAllChat}>Clear Chat</Button>
                </div>
            </div>
            <Divider className='chat_section_devider' />
            <Scrollbar style={{ width: '100%', height: '50vh', padding: '0', margin: '0' }} ref={messagesEndRef}>
                {allChats.length == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : allChats.map((msg, index) => {
                    return (
                        <div className="store_message" key={index}>
                            <div className={`${msg.USERID == getUSerData.USERID ? "send_message" : "recevied_message"}`} >
                                <div className="message_information">
                                    <div className='send_message_img'>
                                        {msg.User_Information.Whether_Image_Available == true ? <img src={msg.User_Information.Image_Information.Image250} /> : <img src={Empty_Img} />}
                                    </div>
                                    <div className="message_user_info">
                                        <p>{msg.User_Information.Name}</p>
                                        {msg.Media_Type == 2 &&
                                            <ModalImage
                                                small={msg.Image_Information.Image550}
                                                large={msg.Image_Information.Image550}
                                                alt="Image"
                                                showRotate={true}

                                            />
                                        }
                                        {/* {open && <Lightbox
                                            medium={msg.Image_Information.Image550}
                                            large={msg.Image_Information.Image550}
                                            alt="Post Image"
                                            onClose={closeLightbox}
                                        />} */}
                                        {msg.Media_Type == 3 && <video controls >
                                            <source src={msg.Video_Information.Video_Original_URL} type="video/mp4" />
                                        </video>}
                                        <p>{msg.Description}</p>
                                    </div>
                                </div>
                                <div className="message_info_option">
                                    <p>{new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                    {msg.USERID == userDetails.userID && <MsgOption chatMsgInfo={msg} FilterAllChatRoomChatData={FilterAllChatRoomChatData} chatRoomData={chatRoomData} />}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </Scrollbar>
            <div className="message_input_divider">
                <div className="message_input_divider_item"></div>
            </div>
            <div className="post_image_message">
                {reviewMsg == true && <img src={reviewImg} />}
                {reviewMsgs == true && <video controls >
                    <source src={reviewVideo} type="video/mp4" />
                </video>}
            </div>
            {shwoChatRoomChat &&
                <div className="create_message_section">
                    <div className="create_message">
                        <Form
                            form={form}
                            layout="vertical"
                            name="login_user"
                            className="send_chat_msg"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={createChatHandler}
                            onFinishFailed={onFinishFailed}

                        >
                            <Col md={12}>
                                <InputEmoji
                                    value={chatDec}
                                    onChange={setChatDec}
                                    cleanOnEnter
                                    onEnter={handleOnEnter}
                                    placeholder="Type a message"
                                    borderColor={"#e8aa00"}
                                   
                                />
                            </Col>
                            <div className="message_chat_btn">
                                <div className="video_msg_Upload">
                                    <div className="message_image">
                                        <label htmlFor="file-input">
                                            <AiOutlineCamera className='camera_icon' />
                                        </label>
                                        <input id="file-input" type="file" onChange={uploadImgHandler} />
                                    </div>
                                    <div className="message_vedio">
                                        <label htmlFor="Vedio_file-input">
                                            <AiFillYoutube className='camera_icon' />
                                        </label>
                                        <input id="Vedio_file-input" type="file" onChange={uploadVedioHandler} />
                                    </div>



                                </div>
                                <div className="message_send_btn">
                                    <Button type='default' htmlType='submit'>Send</Button>
                                </div>

                            </div>
                        </Form>
                    </div>








                </div>
            }

        </div>
    )
}



export default ChatRoom