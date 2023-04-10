import { Button, Divider, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Events_Status, Event_lists, Event_Modes, Event_Types } from '../../services/Anastomosys_service'
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { BookEvents, FetchEventCompleteData, FilterAllEventJoinees, userDetails } from '../../services/api_services';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import Divider_Img from "../../assets/illustrat_Image/div2.png"
import PeopleYouKnow from '../profile/PeopleYouKnow';
import Payment_Done from '../../assets/illustrat_Image/payment.gif'
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';


import { loadStripe } from '@stripe/stripe-js';

import MakePaymentEvent from './MakePaymentEvent';


const key_id = "rzp_test_tvmfVUUav23Zvk"


function EventDetails() {
    // const stripe = useStripe();
    // const elements = useElements();
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()
    const [showConform, setShowConform] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventData, setEventData] = useState([])
    const [bookData, setBookData] = useState([])
    const [error, setError] = useState("")
    const [getbook, setGetBook] = useState(false)
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
                setGetBook(true)
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

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //free event handle 
    const freeBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": id

    }

    const freeEnventHandle = async () => {
        await BookEvents(freeBody).then(res => {
            // console.log('free event book', res);
            if (res.data.success) {
                setBookData(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
            setError(err.response.data.extras.msg);
        })
    }
    //paid event 
    const paidBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": id

    }

    const PaidAmountEnventHandle = async () => {
        await BookEvents(paidBody).then(res => {
            // console.log('free event book', res);
            if (res.data.success) {
                setBookData(res.data.extras.Data)
                let resData = res.data.extras.Data
                paidEventhandle(resData)

            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
            setError(err.response.data.extras.msg);
        })
    }


    var options = {
        "key": key_id, // Enter the Key ID generated from the Dashboard
        "amount": parseInt(eventData.Amount * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Vix Space",
        "description": "Event Book",
        "image": "https://vixspace.com/wp-content/uploads/2022/03/logo.png",
        "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            setShowConform(true)
            setIsModalVisible(true)
            // console.log(response.razorpay_payment_id);
            // console.log(response.razorpay_order_id);
            // console.log(response.razorpay_signature)
            // console.log("response", response)
            // console.log("options.notes.BookingID", options.notes.BookingID)
        },

        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "6200820423"
        },


        "notes": {
            "BookingID": bookData.BookingID
        },
        "theme": {
            "color": "#0676b7"
        }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });

    const paidEventhandle = (resData) => {
        options.amount = resData.Amount * 100
        options.notes.BookingID = resData.BookingID
        rzp1.open();
        // console.log("resData",resData)
        // console.log("options", options);
    }
    // stripe configrtion


    return (
        <div className='container event_details_section'>
            <Row>
                <Col md={8}>
                    {isModalVisible == true && <div className="conform_modal">
                        <Modal
                            footer={false}
                            closable={false}
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            width={500}

                            className='successAlert'
                        >
                            <div className="showAlert">
                                <Card >
                                    <p className='alert_text'>Payment Successfull !</p>
                                    <p >Booking ID : {bookData.BookingID}</p>
                                    <p >Booking Number : {bookData.Booking_Number}</p>
                                    <p >Amount : ₹ {bookData.Amount}</p>

                                </Card>
                                <div className="popup_icon">
                                    <img src={Payment_Done} />
                                    {/* <FaCheck className='success_icon' /> */}
                                </div>
                            </div>
                            <div className="conform_ok_btn">
                                <Button type='primary' onClick={() => navigate(`/event_book_details/${bookData.BookingID}`)}>Go to Booking</Button>
                            </div>


                        </Modal>
                    </div>


                    }
                    <div className="event_details">
                        <Card id='main_card'>
                            <div className="event_detail_title">
                                <BiArrowBack style={{ color: 'white', marginRight: '.5rem' }} onClick={() => navigate(-1)} />
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
                                                <span className='event_progran_head'>Event fee : </span>
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
                            {eventData.USERID != userDetails.userID && eventData.Event_Status
                                == 1 ? eventData.Event_Type == 2 ? <div className="event_join_btn">
                                    {error == "Already Joined" ? <Button type='primary' disabled>Already Join</Button> : <Button type='primary' onClick={PaidAmountEnventHandle}
                                    >Pay Now - ₹ {eventData.Amount}</Button>

                                    }
                                </div> : <div className="event_join_btn">
                                {error == "Already Joined" ? <Button type='primary' disabled >Already Joined </Button> : <Button type='primary' onClick={freeEnventHandle}>Join Event</Button>}
                            </div> : <div className='event_status_logs'>
                                <p>Event Status : <span className={`${eventData.Event_Status == 1 && 'onlineEvent'} ${eventData.Event_Status == 2 && 'completeEvent'} ${eventData.Event_Status == 3 && 'cancelEvent'}`}>
                                    {Events_Status[eventData.Event_Status]}
                                </span></p>
                            </div>}

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

export default EventDetails
