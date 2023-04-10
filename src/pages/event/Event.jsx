import React from 'react'
import { Row,Col } from 'react-bootstrap'
import '../../style/event.css'
import PeopleYouKnow from '../profile/PeopleYouKnow'
import EventList from './EventList'

function Event() {
  return (
    <div className='container event_section'>
        <Row>
          <Col md={8}>
              <EventList  />
          </Col>
          <Col md={4}>
            <PeopleYouKnow />
          </Col>
        </Row>
    </div>
  )
}

export default Event
