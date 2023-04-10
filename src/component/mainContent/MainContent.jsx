
import React from 'react'
import FeedPost from '../feed/FeedPost'
import Navbar from '../navbar/Navbar'
import LeftSideBar from '../sidebar/LeftSideBar'
import RightSideBar from '../sidebar/RightSideBar'
import { Row, Col } from 'react-bootstrap'
import '../../App.css'


// const user = JSON.parse(sessionStorage.getItem('user_data') || '{}');
// export const userDetails = {
//     userID: user.USERID,
//     sessionID: user.All_Device_Sessions.length > 0 ? user.All_Device_Sessions[user.All_Device_Sessions.length - 1].SessionID : '{}',
// }
function MainContent() {
    return (
        <>
            
            <div className='main' >

                <div className="container" >
                    <Row>
                        <Col md={3}>
                            <LeftSideBar />
                        </Col>
                        <Col md={6}>
                            <FeedPost />
                        </Col>
                        <Col md={3} >
                            <RightSideBar />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default MainContent
