import { Button, Result, message, Spin } from 'antd'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import { PublishPaper, RemoveMyResearch, userDetails } from '../../services/api_services';
import { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';


function ResearchItem({ MyResearchPublic, myResearch, dataCount }) {
    const navigate = useNavigate()

    const publicationRemove = async (id) => {
        await RemoveMyResearch({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "PublicationID": id
        }).then(res => {
            console.log(res);
            if (res.data.success) {
                message.success(res.data.extras.Status)
                // console.log('Remove My research public', res);
                MyResearchPublic()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }


    const PublicPublicationHandle = async (id) => {
        await PublishPaper({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "PublicationID": id
        }).then(res => {
            console.log('public paper', res);
            if (res.data.success) {
                message.success(res.data.extras.Status)
                MyResearchPublic()
                console.log("public paper", res);
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }


    return (
        <div className='research_item'>
            {myResearch.length == 0 ? <Result
                title="Your Research Publication not Available."

            /> : myResearch.map((item, index) => {
                return (
                    <div key={index}>

                        <Card >

                            <div className="research_card_title">
                                <div className="research_title">
                                    <p style={{ fontWeight: '600', color: 'white' }}>{item.Publication_Title}</p>
                                </div>
                                <div className="research_action">
                                    {item.Whether_Atleast_One_Review > 0 && item.Publication_Status == 2 && <Button type='default' onClick={(id) => PublicPublicationHandle(item.PublicationID)}>Publish Paper</Button>}
                                    {item.Publication_Status == 3 && <Button type='link' id='paper_publish'> Paper Published</Button>
                                    }
                                    {item.Total_Successfully_Reviewed != 0 ? <p><MdModeEditOutline className='research_public_icons' style={{ cursor: "not-allowed" }} /></p> : 
                                        <MdModeEditOutline className='research_public_icons'  onClick={() => navigate(`/edit_my_research/${item.PublicationID}`,{ state: item })}/>
                                   }
                                    <p onClick={(id) => publicationRemove(item.PublicationID)}><AiOutlineClose style={{ color: 'white', cursor: 'pointer', fontSize: "1.2rem" }} /></p>
                                </div>
                            </div>
                            <div className="my_reserch_publish">
                                {HTMLReactParser(item.Publication_Description.substring(0, 250))}<span>...</span>
                            </div>

                            <div className="research_review">
                                <p >Total Review : {item.Total_Successfully_Reviewed}</p>
                                <Button type='link' className='send_review' onClick={() => navigate(`/review_request_send/${item.PublicationID}`)}>Send for Review</Button>
                                <Button type='link' className='send_review' onClick={() => navigate(`/send_review_reviewer_list/${item.PublicationID}`)}>Sent Review</Button>
                                <Button type='link' className='view_detail'
                                    onClick={() => navigate(`/publish_details/${item.PublicationID}`)}
                                >View Details</Button>
                            </div>
                        </Card>

                    </div>
                )
            })}
        </div>
    )
}

export default ResearchItem
