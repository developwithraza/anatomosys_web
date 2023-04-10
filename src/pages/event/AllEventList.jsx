import { Button, Divider, Input, Select, Spin } from 'antd'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BsSliders } from "react-icons/bs";
import { useState } from 'react';
import { FilterAllEvent, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import Empty_Image from '../../assets/illustrat_Image/not_img.png'
import '../../style/event.css'
import { Events_Status, Events_Status_Lists, Event_Modes, Event_Types, Event_Type_List } from '../../services/Anastomosys_service';
import Empty_Event from '../../assets/illustrat_Image/empty_event.webp'

import { slice } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons';
import { MdOutlineRefresh } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import AddEvent from './AddEvent';
import { useSelector } from 'react-redux';
function AllEventList() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [searchInput, setSearchInput] = useState("")
    const [userFilter, setUserFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [eventList, setEventList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const initialPosts = slice(eventList, 0, limit)

    const navigate = useNavigate()

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Search_Filter": searchInput != "" ? true : false,
        "Search_Input": searchInput,
        "Whether_User_Filter": false,
        "Selected_USERID": userFilter,
        "Whether_Status_Filter": statusFilter != "" ? true : false,
        "Event_Status": statusFilter,
        "skip": skip,
        "limit": limit

    }
    // console.log("userBody", userBody);

    const FilterAllEvents = async () => {
        await FilterAllEvent(userBody).then(res => {
            // console.log('filter all event', res);
            if (res.data.success) {
                setEventList(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                setIsMoreLoading(false)
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        FilterAllEvents()
    }, [limit, searchInput, statusFilter])

    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
        ) {
            setLimit((pre) => pre + 3)
            // console.log(limit)
            setIsMoreLoading(true)
        }
        if (limit >= dataCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", loadMore)
        return () => window.removeEventListener("scroll", loadMore)
    }, [limit <= dataCount])

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );
    // event filter


    const EventStatusFilter = (value) => {
        setStatusFilter(value)
    }

    return (
        <div className='all_events'>

            <Row>
                <Col md={4}>
                    <div className="search_envet">
                        <Input placeholder='Search .....' allowClear onChange={(e) => {
                            setSearchInput(e.target.value);
                        }
                        } />
                    </div>
                </Col>

                <Col md={4}>
                    <div className="event_status_filter">
                        <Select
                            showSearch
                            placeholder="Select Event Status"
                            optionFilterProp="children"
                            onChange={EventStatusFilter}
                            allowClear={true}
                        >
                            {Events_Status_Lists.map((option) => (
                                <Select.Option key={option.key} value={option.key} label={option.values}>
                                    {option.values}
                                </Select.Option>
                            ))}

                        </Select>
                    </div>
                </Col>
            </Row>



            <Divider className='filter_divider' />
            {dataCount == 0 ? <div className="empty_event_title">
                <div className="empty_event_img">
                    <img src={Empty_Event} />
                </div>
                <div className="event_message">
                    <p>No Any Event</p>
                    {/* <p>You are not attending any Events</p> */}
                </div>
            </div> :
                initialPosts.map((event) => {
                    return (
                        <div className="multiple_event_list" key={event.EventID}>
                            <Link to={`/event_details/${event.EventID}`}>
                                <Card>
                                    <div className="eventlist_title">
                                        <div className="event_list_item">
                                            <p>{event.Event_Title}</p>

                                        </div>
                                        <div className="action_event">
                                            <p className={`${event.Event_Mode == 1 ? 'onlineEvent' : 'oflineEvent'}`}>{Event_Modes[event.Event_Mode]}
                                            </p>

                                        </div>

                                    </div>
                                    <div className="event_list">
                                        <div className="event_img">
                                            {event.Whether_Image_Available == true ? <img src={event.Image_Information.Image550} /> : <img src={Empty_Image} />}

                                        </div>
                                        <div className="event_info">
                                            <div className="event_Head">
                                                <p >Hosted by : <span className='hosted'>{event.Contact_Person_Name}</span></p>
                                                <p >Event ID: <span >{event.Event_ID}</span></p>
                                            </div>
                                            <div className="event_schedule">
                                                <p>Event Date : {new Date(event.Event_Date_Time).toLocaleDateString()}</p>
                                                <p>Event Time : {new Date(event.Event_Date_Time).toLocaleTimeString()}</p>
                                            </div>

                                            <div className="event_schedule">
                                                <p>Type : {Event_Types[event.Event_Type]}</p>
                                                <p>Fee : ₹ {event.Event_Type == 2 ? event.Amount : "0"}</p>
                                            </div>
                                            <div className="event_schedule">
                                                <p>Event Status : <span className={`${event.Event_Status == 1 && 'onlineEvent'} ${event.Event_Status == 2 && 'completeEvent'} ${event.Event_Status == 3 && 'cancelEvent'}`}>
                                                    {Events_Status[event.Event_Status]}
                                                </span></p>
                                                <Button type='link' onClick={() => navigate(`/event_details/${event.EventID}`)}>View Details</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>

                        </div>
                    )
                })
            }
            {isCompleted ? <div className="more_loading"> <Button type='link' disabled>No More Event</Button> </div> : isMoreLoading && <div className="more_loading">
                <div className="lds-ellipsis"><div></div><div></div><div></div></div>
            </div>


            }
        </div>
    )
}

export default AllEventList