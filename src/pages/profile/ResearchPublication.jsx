import { Button, message, Result } from 'antd'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/AuthUserContect';
import { FilterAllMyResearchPublic, userDetails } from '../../services/api_services';
import '../../style/viewprofile.css'
import { TiDeleteOutline } from "react-icons/ti";
import HTMLReactParser from 'html-react-parser';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";

function ResearchPublication({ UserProfileDetails }) {
  const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
  const navigate = useNavigate()

  const [myResearch, setMyResearch] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const body = {
    "ApiKey": userDetails.ApiKey,
    "USERID": getUSerData.USERID,
    "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    "Whether_Search_Filter": searchInput != "" ? true : false,
    "Search_Input": searchInput,
    "skip": 0,
    "limit": 1
  }
  const MyResearchPublic = async () => {
    await FilterAllMyResearchPublic(body).then(res => {
      if (res.data.success) {
        setMyResearch(res.data.extras.Data)
        // console.log('My research public', res);

      }
    }).catch(err => {
      message.error(err.response.data.extras.msg);

    })
  }
  useEffect(() => {
    MyResearchPublic()
  }, [])



  return (
    <div className='reserch_publication'>

      <Card >
        <div className="heading">
          <h2>Research Publications</h2>
          <div className="research_public_Action">
           
            {/* <MdModeEditOutline className='research_public_icons' onClick={() => navigate(`/edit_my_research/${item.PublicationID}`, { state: item })} /> */}
            <Button type='link' onClick={() => navigate('/add_my_research')}>
              <AiOutlinePlus className='research_public_icons' />
              Add Research
            </Button>
          </div>
        </div>
        {myResearch.length == 0 ? <Result
          title="Your Research Publication not Available."
        /> : myResearch.map((research, index) => {
          return (
            <div key={index}>
              <div className="publication_content">
                <h2>{research.Publication_Title}</h2>
                {HTMLReactParser(research.Publication_Description.substring(0, 250))}...
              </div>
              <div className="total_review_section">
                <div className="total_review">
                  <p>Total Review : {research.Total_Successfully_Reviewed}</p>
                  <Button type='link' className='view_all_Details' onClick={() => navigate(`/publish_details/${research.PublicationID}`)}>View Details</Button>
                </div>
                <div className="total_review_circle">
                </div>
              </div>

              <div className="view_all">
                <Button type='link' onClick={() => navigate('/all_research')}>View All</Button>
              </div>
            </div>
          )
        })}
      </Card>


    </div>
  )
}

export default ResearchPublication
