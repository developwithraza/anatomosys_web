import React from 'react'
import {Row,Col} from 'react-bootstrap'
import PeopleYouKnow from './PeopleYouKnow'
import ViewUserProfile from './ViewUserProfile'
import '../../style/viewprofile.css'

function ViewProfile() {
  return (
    <div className='container main_feed'>
        <Row>
            <Col md={7}>
                <ViewUserProfile />
            </Col>
            <Col md={5}>
                <PeopleYouKnow />
            </Col>
        </Row>
    </div>
  )
}

export default ViewProfile
