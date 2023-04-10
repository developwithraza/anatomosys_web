import React from 'react'
import '../../style/myNetwork.css';
import { Col, Row, Card } from 'react-bootstrap'
import { Tabs } from 'antd'
import FollowingPeople from './myFollowing/FollowingPeople';
import FollowerPeople from './myFollowers/FollowerPeople';
import PeopleYouKnow from '../profile/PeopleYouKnow';
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function MyNetwork() {
    const navigate=useNavigate()
    return (
        <div className='container myNetwork'>
            <Row>
                <Col md={8}>
                    <div className="myNetworks">
                        <Card>
                            <div className="my_network_title">
                                <p onClick={()=>navigate(-1)}><MdKeyboardBackspace style={{fontSize:'1.5rem'}}/></p>
                                <p>Go Back</p>
                            </div>
                            <div className="event_tab_option">
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Following" key="1">
                                        <FollowingPeople />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Followers" key="2">
                                        <FollowerPeople />
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <PeopleYouKnow />
                </Col>
            </Row>
        </div>
    )
}

export default MyNetwork
