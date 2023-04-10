import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import '../../style/messaging.css'
import MessageChatingSection from './MessageChatingSection'
import { IoVolumeMuteOutline } from "react-icons/io5";


import { Button, Divider, Empty, Input } from 'antd'
import { Scrollbar } from 'react-scrollbars-custom';
import '../../style/notification.css'
import { useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
import { ApproveChatRequest, FilterAllChatroom, FilterAllNewChatroomRequest, RejectChatRequest, SearchAllChatroomList, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import ChatRoomOption from './ChatRoomOption'
import ChatRoom from './ChatRoom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
function MessagingPage() {
  const getUSerData = useSelector((state) => state.LoginReducer.auth_user)


  const [searchInput, setSearchInput] = useState("")
  const [chatRoom, setChatRoom] = useState([])
  const [chatRequest, setChatRequest] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [lastChat, setLastChat] = useState([])
  const [showRequest, setShowRequest] = useState(false)
  const [countData, setCountData] = useState(null)
  const [chatCount, setChatCount] = useState('')
  const [shwoChatRoomChat, setShowChatRoomChat] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [chatNow, setChatKnow] = useState(false)
  const [chatRoomData, setChatRoomData] = useState([])
  const [searchCount, setSearchCount] = useState([])
  const [search, setSearch] = useState(false)
  const ref = useRef(null);


  const scrollDown = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }
  // const onSearchHandle= () => {
  //   setSearch(true)
  // }
  const handleClick = () => {
    setSearch(false)
  }
  const requestBody = {
    "ApiKey": userDetails.ApiKey,
    "USERID": getUSerData.USERID,
    "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    "skip": 0,
    "limit": 10
  }

  const viewRequestHandle = async () => {
    await FilterAllNewChatroomRequest(requestBody).then(res => {
      // console.log(' request chat room', res);
      if (res.data.success) {
        setChatRequest(res.data.extras.Data)
        setCountData(res.data.extras.Count)
        setShowRequest((pre) => !pre)
      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  const chatBody = {
    "ApiKey": userDetails.ApiKey,
    "USERID": getUSerData.USERID,
    "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    "skip": 0,
    "limit": 10
  }

  const ShowAllChatRoomList = async () => {
    await FilterAllChatroom(chatBody).then(res => {
      // console.log('show all chat room', res);
      if (res.data.success) {
        setChatRoom(res.data.extras.Data)
        setChatCount(res.data.extras.Count)


      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  useEffect(() => {
    ShowAllChatRoomList()
    searchInput == "" && setSearch(false)
  }, [searchInput])
  //message accept reject

  const AcceptMsgRequest = async (C_id, CR_id) => {
    await ApproveChatRequest({
      "ApiKey": userDetails.ApiKey,
      "USERID": getUSerData.USERID,
      "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
      "ChatroomID": CR_id,
      "ChatID": C_id
    }).then(res => {
      // console.log(' request chat room', res);
      if (res.data.success) {
        setShowRequest(false)
        ShowAllChatRoomList()
      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  const RejectMsgRequest = async (C_id, CR_id) => {
    await RejectChatRequest({
      "ApiKey": userDetails.ApiKey,
      "USERID": getUSerData.USERID,
      "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
      "ChatroomID": CR_id,
      "ChatID": C_id
    }).then(res => {
      // console.log(' request chat room', res);
      if (res.data.success) {
        setShowRequest(false)
        ShowAllChatRoomList()
      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  //search chat
  const searchBody = {
    "ApiKey": userDetails.ApiKey,
    "USERID": userDetails.userID,
    "SessionID": userDetails.sessionID,
    "Search_Input": searchInput,
    "skip": 0,
    "limit": 30
  }

  const searchAllChatRooms = async () => {
    await SearchAllChatroomList(searchBody).then(res => {
      // console.log(' search chat room', res);
      if (res.data.success) {
        setSearchData(res.data.extras.Data)
        setSearchCount(res.data.extras.Count)
      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  useEffect(() => {
    searchAllChatRooms()
  }, [searchInput])

  //chat data  
  const getChatRoomHanldle = (chatData) => {
    setChatRoomData(chatData)
    searchAllChatRooms()
    setSearch(false)
    setChatKnow(true)
    setSearchInput("")
    scrollDown()
    setShowChatRoomChat(true)

  }

  return (
    <div className='container messaging_pannel' ref={ref}>
      <Row>
        <div className="messasings">
          <Card>
            <Row>
              <Col md={4}>
                <div className='message_grid '>
                  <div className="messagin_heading">
                    <p>Messaging</p>
                  </div>
                  <div className="message_searching">
                    <Row>
                      <Col md={8}>
                        <div className="search_input">
                          <Input placeholder="Search" allowClear onChange={(e) => {
                            setSearch(true)
                            setSearchInput(e.target.value)
                            console.log("on change", e.target.value)
                          }} onClick={handleClick} />
                        </div>
                      </Col>
                      <Col md={4}>
                        <Button type='link' onClick={viewRequestHandle}>View Request</Button>
                      </Col>
                    </Row>

                  </div>
                  {showRequest == true ? <Scrollbar style={{ width: '100%', height: '70vh', padding: '0', margin: '0' }}>
                    <div className="messageing">
                      {countData == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : chatRequest.map((user, index) => {
                        return (
                          <div className='user_message' key={index}>

                            <div className='messaging_section  '>
                              <div className="messaging_list" >
                                <div className="messagining_user_img">
                                  {user.User_Information.Whether_Image_Available == true ? <img src={user.User_Information.Image_Information.Image250} /> : <img src={Empty_Img} />}
                                </div>
                                <div className="message_data">
                                  <p style={{ fontWeight: '600' }}>{user.User_Information.Name}   </p>
                                </div>

                              </div>
                              <div className="chat_Action">
                                <Button type='link' className='acceptMsg' onClick={(C_id, CR_id) => AcceptMsgRequest(user.ChatID, user.ChatroomID)}>Accept</Button>
                                <Button type='link' className='rejectMsg' onClick={(C_id, CR_id) => RejectMsgRequest(user.ChatID, user.ChatroomID)}>Reject</Button>
                              </div>
                            </div>


                          </div>
                        )
                      })}
                    </div>
                  </Scrollbar> :
                    <Scrollbar style={{ width: '100%', height: '70vh', padding: '0', margin: '0' }} noScrollX="false">
                      <div className="messageing">

                        {
                          chatCount == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                            chatRoom.map((user, index) => {
                              return (
                                <div className={`user_message ${chatRoomData ==user && 'active_now'}`} onClick={(chatData) => getChatRoomHanldle(user)} key={index}>
                                  <NavLink >
                                    <div className="messaging_section" >
                                      <div className="messaging_list" key={user.SelectUserData.USERID}>
                                        <div className="messagining_user_img">
                                          {user.SelectUserData.Whether_Image_Available == true ? <img src={user.SelectUserData.Image_Information.Image250} /> : <img src={Empty_Img} />}
                                        </div>
                                        <div className="message_data">
                                          <p style={{ fontWeight: '600' }}>{user.SelectUserData.Name} {user.UserChatroomData.Whether_Mute == true && <IoVolumeMuteOutline className='mute_icons' />}</p>
                                          <p>{user.Whether_Last_Chat_Available == true && user.LastChatData.Description.substring(0, 25)}... </p>
                                        </div>

                                      </div>
                                      <div className="last_message_day">
                                        <p>{user.Whether_Last_Chat_Available == true && new Date(user.LastChatData.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        <ChatRoomOption ShowAllChatRoomList={ShowAllChatRoomList} chatRoomListData={user} chatRoomData={chatRoomData} chatNow={chatNow} />
                                      </div>
                                    </div>
                                  </NavLink>
                                </div>

                              )
                            })}
                      </div>
                    </Scrollbar>
                  }
                  {search &&
                    <div className="searching_chat_room">
                      <Scrollbar style={{ width: '100%', height: '70vh', padding: '0', margin: '0' }} noScrollX="false">
                        <div className="messageing">

                          {
                            searchCount == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                              searchData.map((user, index) => {
                                return (
                                  <div className={`${chatNow == true ? "active" : "user_message"}`} onClick={(chatData) => getChatRoomHanldle(user)}>
                                    <div className={`messaging_section ${index % 2 == 0 && "message_index"} `}>
                                      <div className="messaging_list" key={user.SelectUserData.USERID}>
                                        <div className="messagining_user_img">
                                          {user.SelectUserData.Whether_Image_Available == true ? <img src={user.SelectUserData.Image_Information.Image250} /> : <img src={Empty_Img} />}
                                        </div>
                                        <div className="message_data">
                                          <p style={{ fontWeight: '600' }}>{user.SelectUserData.Name} </p>
                                          <p>{user.Whether_Last_Chat_Available == true && user.LastChatData.Description.substring(0, 25)}... </p>
                                        </div>

                                      </div>
                                      <div className="last_message_day">
                                        <p>{user.Whether_Last_Chat_Available == true && new Date(user.LastChatData.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                                      </div>
                                    </div>
                                  </div>

                                )
                              })}
                        </div>
                      </Scrollbar>
                    </div>
                  }
                </div>
              </Col>
              <Col md={8} >
                <div className="message_diveide">
                  {/* <MessageChatingSection chatRoomData={chatRoomData} chatNow={chatNow} selectedUser={selectedUser} ShowAllChatRoomList={ShowAllChatRoomList}/> */}
                  <ChatRoom chatRoomData={chatRoomData} chatNow={chatNow} selectedUser={selectedUser} ShowAllChatRoomList={ShowAllChatRoomList} shwoChatRoomChat={shwoChatRoomChat} />
                </div>
              </Col>
            </Row>
          </Card>
        </div>

      </Row>
    </div>
  )
}

export default MessagingPage
