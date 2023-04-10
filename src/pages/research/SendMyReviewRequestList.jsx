import { message, Input, Divider, Button, Select, Empty } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AcceptQoutesRequest, MySendReviewRequests, PublishPaper, RejectQoutesRequest, userDetails } from '../../services/api_services'
import DefaultImg from '../../assets/illustrat_Image/not_img.png'
import { Col, Row, Card } from 'react-bootstrap'
import { BsSliders } from "react-icons/bs";
import { request_status_List } from '../../services/Anastomosys_service'
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux'
function SendMyReviewRequestList() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()
    const navigate = useNavigate()
    const [countData,setCountData]=useState(null)
    const [sendReviewList, setSendReviewList] = useState([])
    const [RequestStatus, setRequestStatus] = useState(null)

    const requestBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
      
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PublicationID": id,
        "Whether_Status_Filter": RequestStatus != null ? true : false,
        "Request_Status": parseInt(RequestStatus),
        "skip": 0,
        "limit": 30

    }


    const SendReviewRequestList = async () => {
        await MySendReviewRequests(requestBody).then(res => {
            // console.log('send review request', res);
            if (res.data.success) {
                setSendReviewList(res.data.extras.Data)
                setCountData(res.data.extras.Count)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SendReviewRequestList()
    }, [RequestStatus])
    //qoute action 
    
    const startMonthhandle=(value)=>{
        setRequestStatus(value)
    }
    return (
        <div className='container review_request'>
            <Row>
                <Col md={8}>
                    <Card>
                        <div className="review_data">
                            <div className="review_request_title">
                            <BiArrowBack style={{color:'white',marginRight:'.5rem',cursor:'pointer'}} onClick={()=>navigate(-1)}/>
                                <p>Send Reviewer List </p>
                            </div>
                            <div className="filter_research">
                                
                                <div className="research_search">
                                    <Select
                                        showSearch
                                        placeholder="Select Request Status"
                                        optionFilterProp="children"
                                        onChange={startMonthhandle}
                                        allowClear={true}

                                    >
                                        {request_status_List.map((option) => (
                                            <Select.Option key={option.key} value={option.key} label={option.values}>
                                                {option.values}
                                            </Select.Option>
                                        ))}

                                    </Select>
                                </div>
                            </div>
                            <Divider style={{ margin: '.5rem 0' }} />
                            <div className="review_request_userList">
                                {countData ==0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : sendReviewList.map((reviewer) => {
                                    return (
                                        <>
                                            <div className="request_status">
                                                <div className="request_status_title">
                                                    <p>Status : {reviewer.Request_Status_Logs[reviewer.Request_Status_Logs.length - 1].Comment}</p>
                                                </div>
                                            </div>
                                            <div className="request_send_to_review">
                                                <div className="review_request_send_list">
                                                    <div className="review_request_send_img">
                                                        {reviewer.Selected_User_Information.Whether_Image_Available == true ? <img src={reviewer.Selected_User_Information.Image_Information.Image550} /> : <img src={DefaultImg} />}
                                                    </div>
                                                    <div className="user_request_send_info">
                                                        <p>{reviewer.Selected_User_Information.Name}</p>
                                                        <p>{reviewer.Selected_User_Information.Whether_Professional_Details_Available == true && reviewer.Selected_User_Information.Specialisation_Title}</p>
                                                        <p>{reviewer.Selected_User_Information.Hospital_Name}</p>
                                                        <p>{reviewer.Selected_User_Information.Bio}</p>
                                                    </div>

                                                </div>
                                                <Button type='default' onClick={() => navigate(`/review_request_details/${reviewer.Review_RequestID}`)}>
                                                    View Details
                                                </Button>
                                             

                                            </div>
                                            <Divider />

                                        </>
                                    )
                                })}
                            </div>

                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SendMyReviewRequestList
