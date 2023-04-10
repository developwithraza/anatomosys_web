import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { Button, Divider, Tabs } from 'antd'
import { BsSliders } from "react-icons/bs";
import { Event_lists } from '../../services/Anastomosys_service';
import { useNavigate } from 'react-router-dom';
import AllEventList from './AllEventList';
import MyEventList from './MyEventList';
import MyBookEvent from './MyBookEvent';
import AddEvent from './AddEvent';


function EventList() {
    const [events, setEvents] = useState(true)
    const navigate = useNavigate()

    return (
        <div className='event_List'>

            <Card>
                <div className="event_setions">

                    <div className="event_title">
                        <p>Event</p>
                    </div>
                    <div className="add_events_in_section">
                        <AddEvent />
                    </div>
                </div>
                <div className="event_tab_option">
                    <Tabs defaultActiveKey="1">
                        <items tab="All Event" key="1">
                            <AllEventList />
                        </items>
                        <items tab="My Book Event" key="2">
                            <MyBookEvent />
                        </items>
                        <items tab="My Event" key="3">
                            <MyEventList />
                        </items>
                    </Tabs>
                </div>
            </Card>

        </div>
    )
}

export default EventList
