import { Button, Divider, message,Result } from 'antd'
import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import "../../style/researchpublic.css"
import { BsSliders } from "react-icons/bs";
// import ResearchItem from './ResearchItem'
import { FilterAllMyResearchPublic, SelectedUserInformation, SelectedUserPublication, userDetails } from '../../services/api_services';
import { useUserAuth } from '../../context/AuthUserContect';
import { useNavigate, useParams } from 'react-router-dom';
import TreandingReviewer from '../reviewRequest/TreandingReviewer';
import { useSelector } from 'react-redux';

function SelectedUserAllResearchView() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { userData } = useUserAuth()
    const [searchInput, setSearchInput] = useState("")
    const [selectUserData, setSelectUserData] = useState([])
    const [userResearch,setUserResearch]=useState([])
    const navigate=useNavigate()
    const { id } = useParams()
    const userbody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id
    }
    const SeletedUserDetails = async () => {
        await SelectedUserInformation(userbody).then(res => {
            if (res.data.success) {
                setSelectUserData(res.data.extras.Data)
                // console.log('selected user info', res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SeletedUserDetails()

    }, [])


    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id,
        "Whether_Search_Filter": searchInput != "" ? true : false,
        "Search_Input": searchInput,
        "skip": 0,
        "limit": 10
    }
    const SeletedUserResearchPublicList = async () => {
        await SelectedUserPublication(body).then(res => {
            if (res.data.success) {
                setUserResearch(res.data.extras.Data)
                // console.log('user research publication', res);

            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SeletedUserResearchPublicList()

    }, [])



    return (
        <div className='container research_section'>
            <Row>
                <Col md={8}>

                    <Card>
                        <div className="research_heading">
                            <h2>Research Publication</h2>
                        </div>
                        <div className="research_user_info">
                            <div className="research_user_cover">
                                {selectUserData.Whether_Cover_Picture_Available == true ? <img src={selectUserData.Cover_Picture_Information.Image550
                                } /> : <img src='https://www.gallaghermalpractice.com/img/blog/i-Stock-486589550.jpg' />}

                            </div>
                            <div className="reserch_user_data">
                                <h2>{selectUserData.Name}</h2>
                                <p style={{ fontWeight: '600' }}>{selectUserData.Whether_Professional_Details_Available == true && selectUserData.Specialisation_Name}</p>
                                <p>{selectUserData.Bio}</p>
                            </div>
                            <div className="papers">
                                <p className='total_paper'>Total Papers : 10</p>
                                <Divider type='vertical' />
                                <p className='public_paper'>Public Papers : 8</p>
                            </div>
                        </div>
                        <div className="research_user_profile_img">
                            {selectUserData.Whether_Image_Available == true ? <img src={selectUserData.Image_Information.Image550} /> : <img src='https://www.shutterstock.com/image-photo/profile-picture-smiling-young-caucasian-260nw-1954278664.jpg' />
                            }

                        </div>
                        <Divider className='research_user_divider' />
                        <div className="filter_research">
                            <p><span style={{ marginRight: '1rem' }}><BsSliders /></span> Filter by :</p>
                            <Button type='primary' >Status</Button>
                            <Button type='primary' >Date Range</Button>
                        </div>
                        <Divider className='research_user_divider' />
                        <div className="research_user_item">
                            {userResearch.length == 0 ? <Result
                                title="Your Research Publication not Available."

                            /> : userResearch.map((item) => {
                                return (
                                    <Card>

                                        <div className="research_card_title">
                                                <p style={{ fontWeight: '600', color: 'white' }}>{item.Publication_Title}</p>
                                           
                                        </div>
                                        <div className="my_reserch_publish">
                                            <p>{item.Publication_Description}</p>
                                        </div>
                                        <div className="research_review">
                                            <p >Total Review : {item.Total_Successfully_Reviewed}</p>
                                            {/* <Button type='link' className='send_review' onClick={() => navigate(`/review_request_send/${item.PublicationID}`)}>Send for Review</Button> */}
                                            <Button type='link' className='view_detail'
                                                onClick={() => navigate(`/review_request_details/${item.PublicationID}`)}
                                            >View Details</Button>
                                        </div>
                                        
                                    </Card>
                                )
                            })}
                        </div>
                    </Card>


                </Col>
                <Col md={4} >
                    <TreandingReviewer />
                </Col>
            </Row>


        </div>
    )
}


export default SelectedUserAllResearchView
