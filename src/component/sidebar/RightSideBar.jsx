
import { Divider } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import { newsAndArtical } from '../../services/Anastomosys_service';
import '../../style/rightSidebar.css'
import { VscDebugBreakpointData } from "react-icons/vsc";
import RightCurrentTopic from './RightCurrentTopic';
import RightActiveProfile from './RightActiveProfile';
import PeopleYouKnow from '../../pages/profile/PeopleYouKnow';

function RightSideBar() {
    return (
        <div className='profile_card right_Side_Bar'>
            <PeopleYouKnow />

            <RightCurrentTopic />
        </div>
    )
}



export default RightSideBar
