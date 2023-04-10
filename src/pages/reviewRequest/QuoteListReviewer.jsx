import { Button, Divider } from 'antd';
import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function QuoteListReviewer() {
    const navigate=useNavigate()
    return (
        <div className='container review_request_details_section'>
            <Row>
                <Col md={8}>
                    <div className="request_review_details">
                        <Card>
                            <div className="review_request_details_title">
                                <p>Research n the human genom and genetic marker </p>
                            </div>
                            <div className="request_details_img">
                                <img src='https://media.istockphoto.com/id/1213724568/photo/micorscope-is-used-by-researcher-who-use-her-hands-holding-and-adjusting.jpg?s=612x612&w=0&k=20&c=dWAiuptYNEC8Re2EuyjlX1KfFFcTg97d70Qyjy3Cjck=' />
                            </div>
                            <div className="review_request_topic">
                                <Card>
                                    <p>Review Request : Research on the human genome and genetic markes </p>
                                </Card>
                            </div>
                            <div className="request_details_summary">
                                <Card>
                                    <p style={{fontWeight:'600',marginBottom:'1rem'}}>About the research</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique deserunt saepe iste ullam temporibus a ut praesentium porro harum molestias laboriosam aliquam reprehenderit ad asperiores nemo minima at natus ipsa, illo aliquid soluta! Sapiente temporibus, reiciendis voluptates dolorem quas molestias eum repellendus rem laboriosam officia in inventore perspiciatis veritatis nobis porro tempora dolor enim iusto nulla labore quam debitis eveniet nihil alias. Consequuntur tempore numquam totam provident soluta fugiat aliquam nam eum vero enim quam sapiente, ea culpa ab qui alias est voluptatibus porro sit facilis ullam! Nam voluptates veniam, cumque id amet, dolorum ipsa maiores, expedita sint cum dignissimos optio ea. Cupiditate sit exercitationem aut perferendis quod consectetur aperiam eaque, nemo voluptate vitae voluptas, aliquid possimus magnam ipsam, minus fuga praesentium reiciendis tempore. Incidunt exercitationem inventore, </p>
                                </Card>
                            </div>
                            <div className="proposal_available">
                                <p>In Review</p>
                            </div>
                            <div className="request_process">
                                <p>Request send : 10</p>
                                <Divider type="vertical" style={{backgroundColor:'black',}}/>
                                <p>in Process : 2</p>
                            </div>
                            <div className="attechment">
                                <p>Attechment</p>
                                <p><FaRegEdit className='attechment_icon'/></p>
                            </div>
                           
                            <div className="view_qoutess">
                                <Button type='link'>Request more Review</Button>
                                <Button type='primary' onClick={()=>navigate("/send_quote_review")}>Publish</Button>
                            </div>
                        </Card>
                        
                    </div>
                </Col>
            </Row>
        </div>
    )
}




export default QuoteListReviewer
