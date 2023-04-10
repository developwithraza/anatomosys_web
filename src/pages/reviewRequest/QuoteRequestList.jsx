import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Button, Divider, Input } from 'antd'
import { fakeUserList } from '../../services/Anastomosys_service'
import { useNavigate } from 'react-router-dom'
import { BsSliders } from "react-icons/bs";
import '../../style/review_request.css'


function QuoteRequestList() {
    const navigate = useNavigate()

    
    return (
        <div className='container quote_request'>
            <Row>
                <Col md={8}>
                    <Card>
                        
                        <div className="review_request_title">
                            <p>Review Request : Research on the human genome and genetic markes </p>
                        </div>
                        <div className="review_request_filter">
                            <p><span style={{ marginRight: '.5rem' }}><BsSliders /></span> Filter By : </p>
                            <Button type='default' >City</Button>
                            <div className="review_request_search_filter">
                                <Input
                                    placeholder='Search by Name'
                                    allowClear
                                ></Input>
                            </div>
                        </div>
                        <Divider style={{ marginTop: '-.2rem' }} />
                        <div className="review_request_userList">
                            {fakeUserList.map((user) => {
                                return (
                                    <>
                                        <div className="review_request_list_item">
                                            <div className="review_request_user_img">
                                                <img src={user.Img_Url} />
                                            </div>
                                            <div className="user_quote_request_info">
                                                <p className='quote_user_name'>{user.Nmae}</p>
                                                <p>{user.Field}</p>
                                                <p>{user.disc}</p>
                                            </div>
                                            <div className="_quote_request_action">
                                                <p>Quote Amount : $ 199 </p>
                                                <Button type='link' onClick={() => navigate('/quote_request_details')}>Accepted</Button>
                                            </div>
                                        </div>
                                        <Divider style={{ marginTop: '-.2rem' }} />
                                    </>
                                )
                            })}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default QuoteRequestList
