import { Button, Divider, Modal, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Booking_Status, Events_Status, Event_lists, Event_Modes, Event_Types } from '../../services/Anastomosys_service'
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { CancelEventBooking, FetchEventBookingInformation, FetchEventCompleteData, FilterAllEventJoinees, userDetails } from '../../services/api_services';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import Divider_Img from "../../assets/illustrat_Image/div2.png"
import '../../style/event.css'
import { CloseOutlined } from '@ant-design/icons';
import { async } from '@firebase/util';
import PeopleYouKnow from '../profile/PeopleYouKnow';
import { useSelector } from 'react-redux';


function EventBookDetails() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()

    const [eventData, setEventData] = useState([])
    const [bookData, setBookData] = useState([])
    const [countData, setCountData] = useState(null)
    const [getbook, setGetBook] = useState(false)

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "BookingID": id

    }

    const EventBookInfo = async () => {
        await FetchEventBookingInformation(userBody).then(res => {
            // console.log('event book info', res);
            if (res.data.success) {
                setBookData(res.data.extras.Data)
                setEventData(res.data.extras.Data.Event_Information)
                setGetBook(true)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        EventBookInfo()
    }, [])

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": bookData.EventID,
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
    }, [bookData])


    const cancelBookedEvent =async (id) => {
        await CancelEventBooking({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "BookingID": id
        }).then(res => {
            if (res.data.success) {
                // console.log('Cancel Event Booking', res);
                EventBookInfo()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
        
      };
      const cancel = (e) => {
        // console.log(e);
      };

    return (
        <div className='container event_details_section'>
            <Row>
                <Col md={8}>
                    <div className="event_details">
                        <Card id='main_card'>
                            <div className="event_book_detail_title">
                                <p>{bookData.Event_Title}</p>
                                <p>Booking Number : {bookData.Booking_Number}</p>
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
                                            <div className="program_item_right">
                                                <span className='event_progran_head'>Event Date & Time : </span>
                                                <p>{new Date(eventData.Event_Date_Time).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <Divider style={{ margin: '.3rem 0' }} />

                                        <div className="program_item">

                                            <div className="program_item_left">
                                                <span className='event_progran_head'>Booking Status : </span>
                                                {bookData.Booking_Status == 1 && <p style={{ color: 'blue' }}>{Booking_Status[bookData.Booking_Status]}</p>}
                                                {bookData.Booking_Status == 2 && <p style={{ color: 'green' }}>{Booking_Status[bookData.Booking_Status]}</p>
                                                }
                                                {bookData.Booking_Status == 3 && <p style={{ color: 'red' }}>{Booking_Status[bookData.Booking_Status]}</p>}
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
                                {bookData.Booking_Status == 2 &&
                                    <Popconfirm
                                        title="Are you sure tocancel your Event Booking ?"
                                        description="Are you sure tocancel your Event Booking ?"
                                        onConfirm={(id)=>cancelBookedEvent(bookData.BookingID)}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='default' >Cancel Booking</Button>
                                    </Popconfirm>
                                }
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



export default EventBookDetails
