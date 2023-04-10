import React from 'react'
import { Divider } from 'antd'
import { Col, Row, Card } from 'react-bootstrap'
import { fakeUserList } from '../../services/Anastomosys_service'
import '../../style/notification.css'

function Notifications() {
    return (
        <div className='container notification'>
            <Row>
                <Col md={8}>
                    <div className="notification_page">
                        <Card>
                            <div className="notification_title">
                                <p>Notification</p>
                            </div>
                            {fakeUserList.map((user) => {
                                return (
                                    <>
                                        <div className='notification_section'>
                                            <div className="notification_list" key={user.id}>
                                                <div className="following_user_img">
                                                    <img src={user.Img_Url} />
                                                </div>
                                                <div className="notification_data">
                                                    <p>{user.Nmae} <span className='notify'>{user.disc}</span></p>
                                                    
                                                </div>

                                            </div>
                                            <div className="unfollowing_btn">
                                                <p>5 days</p>
                                            </div>
                                        </div>
                                        <Divider style={{marginTop:'-.2rem'}}/>

                                    </>
                                )
                            })}

                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Notifications
