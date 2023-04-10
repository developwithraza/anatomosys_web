import { Button, Divider, message, Modal, } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { ReviewRequestsDetail, ReviewRequestsDetails, userDetails } from '../../services/api_services';
import NotImg from '../../assets/illustrat_Image/not_img.png'
import SendQuoteForm from './SendQuoteForm';
import { HiOutlineDocumentText } from "react-icons/hi";
import { request_status } from '../../services/Anastomosys_service';
import ReviewRequesterDetails from './ReviewRequesterDetails';
import HTMLReactParser from 'html-react-parser';
import { MdKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux';

function SendReviewDetials() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate = useNavigate()
    const { id } = useParams()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviewRequestList, setReviewRequestList] = useState([])
    const [RequestStatus, setRequestStatus] = useState(null)
    const [pubInfo, setPubInfo] = useState({})
    const [RequesterInfo, setRequesterInfo] = useState([])
    let docNum = 1;

    const requestDetailsBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Review_RequestID": id
    }


    const showReviewRequestDetails = async () => {
        await ReviewRequestsDetail(requestDetailsBody).then(res => {
            // console.log('revived review request details', res);
            if (res.data.success) {
                setReviewRequestList(res.data.extras.Data)
                setRequesterInfo(res.data.extras.Data.Requester_Information)
                setPubInfo(res.data.extras.Data.Publication_Information)
                // console.log("Publication_Information", pubInfo)


            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        showReviewRequestDetails()
    }, [])

    const handleSendQuote = () => {
        setIsModalVisible(true)
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <div className='container review_request_details_section'>
            <Row>
                <Col md={9}>
                    {isModalVisible == true && <div className="conform_modal">
                        <Modal
                            footer={false}
                            closable={false}
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            width={500}

                            className='successAlert'
                        >
                            <div className="send_quote_showAlert">
                                <p>Reviewer Proposal Details</p>
                                <SendQuoteForm ReviewRequesrId={id} />
                            </div>
                        </Modal>
                    </div>


                    }

                    <div className="request_review_details">
                        <Card>
                            <div className="review_request_details_title">
                                <p onClick={() => navigate(-1)}><MdKeyboardBackspace style={{ fontSize: '1.5rem' }} /></p>
                                <p>{pubInfo.Publication_Title}</p>
                            </div>
                            <div className="request_details_img">
                                {pubInfo.Whether_Image_Available == true ? <img src={pubInfo.Image_Information.Image550} /> : <img src={NotImg} />}

                            </div>
                            <div className="review_request_topic">
                                <Card>
                                    <p>Review Request Status: {request_status[reviewRequestList.Request_Status]} </p>
                                </Card>
                            </div>
                            <div className="request_details_summary">
                                <Card>
                                    <p style={{ fontWeight: '600', marginBottom: '1rem' }}>About the research</p>
                                    <p>{HTMLReactParser(String(pubInfo.Publication_Description))}</p>
                                </Card>
                            </div>

                            <Divider />
                            <div className="attechments">
                                {pubInfo.Whether_Document_Available == true ? pubInfo.Document_Information.map((doc,index) => {
                                    return (
                                        <div className="publication_Document" key={index}>
                                            <p>Attechment {docNum++} </p>
                                            <a href={doc.Document_URL} target="_blank"><HiOutlineDocumentText style={{ marginTop: "-.3rem" }} /> Document </a>

                                        </div>
                                    )
                                }) : <p>Document Not Upload</p>}

                            </div>
                            <Divider />
                            <div className="view_qoutes">
                                {reviewRequestList.Request_Status == 1 && <Button type='primary' onClick={handleSendQuote} >Sent Quote </Button>}
                                {reviewRequestList.Request_Status == 2 && <Button type='primary' onClick={handleSendQuote} disabled>Sent Quote Already</Button>}
                                {reviewRequestList.Request_Status == 3 && <Button type='primary'  >{request_status[reviewRequestList.Request_Status]}</Button>}
                                {reviewRequestList.Request_Status == 4 && <Button type='primary'  >{request_status[reviewRequestList.Request_Status]}</Button>}
                                {reviewRequestList.Request_Status == 5 && <Button type='primary'  >{request_status[reviewRequestList.Request_Status]}</Button>}
                                {reviewRequestList.Request_Status == 6 && <Button type='primary'  >{request_status[reviewRequestList.Request_Status]}</Button>}

                            </div>
                        </Card>

                    </div>
                </Col>
                <Col md={3}>
                    <ReviewRequesterDetails RequesterInfo={RequesterInfo} />
                </Col>
            </Row>
        </div>
    )
}






export default SendReviewDetials
