import { Button, Divider, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Events_Status, Event_lists, Event_Modes, Event_Types } from '../../services/Anastomosys_service'
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchEventCompleteData, FilterAllEventJoinees, userDetails } from '../../services/api_services';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import Divider_Img from "../../assets/illustrat_Image/div2.png"
import PeopleYouKnow from '../profile/PeopleYouKnow';
import { useSelector } from 'react-redux';

function EventMyDetails() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()
    const [showConform, setShowConform] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventData, setEventData] = useState([])
    const [getbook, setBookData] = useState(false)
    const [countData, setCountData] = useState(null)

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": id

    }

    const EventCompleteInfo = async () => {
        await FetchEventCompleteData(userBody).then(res => {
            // console.log('event complete info', res);
            if (res.data.success) {
                setEventData(res.data.extras.Data)
                setBookData(true)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        EventCompleteInfo()
    }, [])

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": eventData.EventID,
        "skip": 0,
        "limit": 100
    }
    const EventjoineesList = async () => {
        await FilterAllEventJoinees(body).then(res => {
            if (res.data.success) {
                setCountData(res.data.extras.Count)
                // console.log('Event Joinees List', res);
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        getbook == true && EventjoineesList()
    }, [eventData])

    const handleCancel = () => {
        setIsModalVisible(false);
    };

   
    const handlerSuccessAlert = () => {
        handleCancel()
        navigate('/event_page')

    }
    return (
        <div className='container event_details_section'>
            <Row>
                <Col md={8}>
                    {isModalVisible == true && <div className="conform_modal">
                        <Modal
                            footer={false}
                            closable={false}
                            open={isModalVisible}
                            onCancel={handleCancel}
                            width={500}

                            className='successAlert'
                        >
                            <div className="showAlert">
                                <Card >

                                    <p className='alert_text'>Event Join Successfully !</p>
                                    <p style={{ fontSize: '1rem', color: 'white' }}>You details has been updated successfully. kindly wait while our admin review your request.</p>
                                </Card>
                                <div className="popup_icon">
                                    <FaCheck className='success_icon' />
                                </div>
                            </div>
                            <div className="conform_ok_btn">
                                <Button type='primary' onClick={handlerSuccessAlert}>View All Events</Button>
                            </div>


                        </Modal>
                    </div>


                    }
                    <div className="event_details">
                        <Card id='main_card'>
                            <div className="event_detail_title">
                                <p>{eventData.Event_Title}</p>
                            </div>

                            <div className="event_details_item">
                                <div className="event_details_img">
                                    {eventData.Whether_Image_Available == true ? <img src={eventData.Image_Information.Image550} /> : <img src={Empty_Img} />}

                                </div>
                                <div className="event_details_summary">
                                    <p>{eventData.Event_Description}</p>
                                </div>
                                <div className="event_program">
                                    <img src={Divider_Img} />
                                    <p>Event Program</p>
                                </div>
                                <div className="event_details_program">
                                    <Card >
                                        <div className="program_item">
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Event Date & Time : </span>
                                                <p>{new Date(eventData.Event_Date_Time).toLocaleString()}</p>
                                            </div>

                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />
                                        <div className="program_item">
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Event ID: </span>
                                                <p > {eventData.Event_ID} </p>
                                            </div>
                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />
                                        <div className="program_item">
                                            <div className="program_item_right">
                                                <span className='event_progran_head'>Event Type : </span>

                                                <p>{Event_Types[eventData.Event_Type]}</p>
                                            </div>
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Entry fee : </span>
                                                {eventData.Event_Type == 2 ? <p> ₹ {eventData.Amount}</p> : "0"}

                                            </div>

                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />
                                        <div className="program_item">
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Event Mode : </span>

                                                <p>{Event_Modes[eventData.Event_Mode]}</p>
                                            </div>
                                            {eventData.Event_Mode == 2 ? <div className="program_item_left">
                                                <span className='event_progran_head'>Event Location : </span>
                                                <a href={`https://www.google.co.in/maps/place/${eventData.Latitude},${eventData.Longitude}`} target="_balank"> View Map</a>
                                            </div> : <div className="program_item_left">
                                                <span className='event_progran_head'>Link : </span>
                                                <a href={eventData.Event_Link} target="_balank">Click Here</a>
                                            </div>}
                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />
                                        <div className="program_item">
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Total Attendence : </span>
                                                <p>{countData}/{eventData.Maximum_Joinees}</p>
                                            </div>
                                            <div className="program_item_left">
                                                <Button type='link' onClick={() => navigate(`/event_joinee_list/${eventData.EventID}`)}>View Joines</Button>
                                            </div>
                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />
                                        <div className="program_item">
                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Hosted by : </span>
                                                <p>{eventData.Contact_Person_Name}</p>
                                            </div>
                                            {eventData.Event_Mode == 2 && <div className="event_address">
                                                <p><span className='event_progran_head'>Event Address :</span>{eventData.Event_Venue}</p>
                                            </div>}

                                        </div>

                                    </Card>
                                </div>
                            </div>
                            <div className='event_status_logs'>
                                <p>Event Status : <span className={`${eventData.Event_Status == 1 && 'onlineEvent'} ${eventData.Event_Status == 2 && 'completeEvent'} ${eventData.Event_Status == 3 && 'cancelEvent'}`}>
                                    {Events_Status[eventData.Event_Status]}
                                </span></p>
                            </div>

                        </Card>
                    </div>
                </Col >
                <Col md={4}>
                    <PeopleYouKnow />
                </Col>
            </Row >
        </div >
    )
}

export default EventMyDetails
