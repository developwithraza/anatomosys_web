import { Button, message } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { MyResearchDetails, userDetails } from '../../services/api_services';
import Empty_Img from '../../assets/illustrat_Image/not_img.png'
import '../../style/researchpublic.css'
import { Publication_Status, request_status } from '../../services/Anastomosys_service';
import TreandingReviewer from '../reviewRequest/TreandingReviewer';
import { BiArrowBack } from "react-icons/bi";
import HTMLReactParser from 'html-react-parser';
import { HiOutlineDocumentText } from "react-icons/hi";
import { useSelector } from 'react-redux';

function PublicationDetails() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    let doc = 0;
    const navigate = useNavigate()
    const { id } = useParams()
    const [mypublush, setMyPublish] = useState([])

    const publicBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PublicationID": id
    }

    // console.log("userBody", publicBody);

    const showPublishDetails = async () => {
        await MyResearchDetails(publicBody).then(res => {
            console.log('MyPublish', res);
            if (res.data.success) {
                setMyPublish(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.responce.data.extras.msg);

        })
    }
    useEffect(() => {
        showPublishDetails()
    }, [])



    return (
        <div className='container review_request_details_section'>
            <Row>
                <Col md={8}>
                    <div className="request_review_details">
                        <Card>
                            <div className="review_request_details_title">
                                <BiArrowBack style={{ color: 'white', marginRight: '.5rem', cursor: 'pointer' }} onClick={() => navigate(-1)} />
                                <p>{mypublush.Publication_Title}</p>
                            </div>
                            <div className="request_details_img">
                                {mypublush.Whether_Image_Available == true ? <img src={mypublush.Image_Information.Image550} /> :
                                    <img src={Empty_Img} />
                                }
                            </div>
                            <div className="review_request_topic">
                                <Card>
                                    <p>Review Request : {mypublush.Total_Review_Requested} </p>
                                </Card>
                            </div>
                            <div className="request_details_summary">
                                <Card>
                                    <p style={{ fontWeight: '600', marginBottom: '1rem' }}>About the research</p>
                                    <p>{HTMLReactParser(String(mypublush.Publication_Description))}</p>
                                </Card>
                            </div>
                            <div className="proposal_available">
                                <p>Publication Status : {Publication_Status[mypublush.Publication_Status]}</p>
                            </div>
                            <div className="attechment">
                                {mypublush.Whether_Document_Available==true && mypublush.Document_Information.map((docs) => {
                                    return (
                                        <div className='publish_docs'>
                                            <a href={docs.Document_URL}><HiOutlineDocumentText style={{marginTop:'-.5rem'}}/> Attechment {doc + 1}</a>
                                        </div>
                                    )
                                })}


                            </div>
                            <div className="view_qoutes">
                                {/* <Button type='primary' onClick={()=>navigate()}>View Quotes</Button> */}
                            </div>

                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <TreandingReviewer />
                </Col>
            </Row>
        </div>
    )
}



export default PublicationDetails