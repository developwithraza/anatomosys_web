import { Button, Divider, Input, message, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import "../../style/researchpublic.css"
import { BsSliders } from "react-icons/bs";
import ResearchItem from './ResearchItem'
import { FilterAllMyResearchPublic, userDetails, userProfileInfo } from '../../services/api_services';
import { useUserAuth } from '../../context/AuthUserContect';
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import TreandingReviewer from '../reviewRequest/TreandingReviewer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ResearchPage() {
    const { user } = useUserAuth()
    const navigate=useNavigate()

    const [searchInput, setSearchInput] = useState("")
    const [myResearch, setMyResearch] = useState([])
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [dataCount, setDataCount] = useState(null)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const initialPosts = slice(myResearch, 0, limit)
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)


    const [userData, setUserData] = useState([])

    const userBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    }

    const UserProfileDetails = async () => {
        await userProfileInfo(userBody).then(res => {
            // console.log('User details in nabvar', res);
            if (res.data.success) {
                setUserData(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }

    useEffect(() => {
        user && UserProfileDetails()
    }, [user])

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Search_Filter": searchInput != "" ? true : false,
        "Search_Input": searchInput,
        "skip": skip,
        "limit": limit
    }
    const MyResearchPublic = async () => {
        await FilterAllMyResearchPublic(body).then(res => {
            if (res.data.success) {
                setMyResearch(res.data.extras.Data)
                setDataCount(res.data.extras.Count)
                // console.log('My research public', res);
                setIsMoreLoading(false)



            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        MyResearchPublic()
    }, [searchInput])
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );

    const loadMore = () => {
        setLimit(limit + 3)
        setIsMoreLoading(true)
        MyResearchPublic()

        if (limit >= dataCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }


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
                                {userData.Whether_Cover_Picture_Available == true ? <img src={userData.Cover_Picture_Information.Image550
                                } /> : <img src='https://www.gallaghermalpractice.com/img/blog/i-Stock-486589550.jpg' />}

                            </div>
                            <div className="reserch_user_data">
                                <h2>{userData.Name}</h2>
                                <p style={{ fontWeight: '600' }}>{userData.Whether_Professional_Details_Available == true && userData.Professional_Details.Specialisation_Title}</p>
                                <p>{userData.Bio}</p>
                            </div>
                            <div className="papers">
                                <p className='total_paper'>Total Papers : {dataCount}</p>
                            </div>
                        </div>
                        <div className="research_user_profile_img">
                            {userData.Whether_Image_Available == true ? <img src={userData.Image_Information.Image550} /> : <img src='https://www.shutterstock.com/image-photo/profile-picture-smiling-young-caucasian-260nw-1954278664.jpg' />
                            }

                        </div>
                        <Divider className='research_user_divider' />
                        <div className="filter_research">
                            {/* <p><span style={{ marginRight: '1rem' }}><BsSliders /></span> </p> */}
                            <div className="research_search">
                                <Input placeholder='Search .....' allowClear onChange={(e) => {
                                    setSearchInput(e.target.value);

                                }
                                } />
                            </div>
                        </div>
                        <div className="add_my_publication">

                            <div className="my_research_heading">
                                <p>My Research</p>
                            </div>
                            <div className="add_my_publication_btn">
                                <Button type='primary' onClick={()=>navigate("/add_my_research")}>Add My Research</Button>
                            </div>
                        </div>
                        <div className="research_user_item">
                            <ResearchItem MyResearchPublic={MyResearchPublic} myResearch={myResearch} dataCount={dataCount} />
                            {isCompleted ? (
                                <div className="load_more_cpmment">
                                    <Button type='link' disabled> no more Post</Button>
                                </div>
                            ) : (
                                <div className="load_more_cpmment">
                                    <Button type='link' onClick={loadMore}>{isMoreLoading && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />} Load more Post </Button>
                                </div>
                            )}
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

export default ResearchPage
