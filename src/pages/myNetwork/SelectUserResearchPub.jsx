import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { SelectedUserPublication, userDetails } from '../../services/api_services';
import '../../style/viewprofile.css'
import { useSelector } from 'react-redux';


function SelectUserResearchPub() {
  const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

  const [userPub, setuserPub] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  const body = {
    "ApiKey": userDetails.ApiKey,
    "USERID": getUSerData.USERID,
    "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
    "Selected_USERID": id,
    "Whether_Search_Filter": searchInput != "" ? true : false,
    "Search_Input": searchInput,
    "skip": 0,
    "limit": 1
  }
  const showSeletedUserPublication = async () => {
    await SelectedUserPublication(body).then(res => {
      if (res.data.success) {
        setuserPub(res.data.extras.Data)
        // console.log('User research public', res);

      }
    }).catch(err => {
      console.log(err.response.data.extras.msg);
    })
  }

  useEffect(() => {
    showSeletedUserPublication()
  }, [])

  return (
    <div className='reserch_publication'>
      {userPub.map((item) => {
        return (
          <Card >
            <div className="heading">
              <h2>Research Publications</h2>
            </div>
            <div className="publication_content">
              <h2>{item.Publication_Title}</h2>
              <p>{item.Publication_Description}</p>
            </div>
            <div className="total_review_section">
              <div className="total_review">
                <p>Total Review : {item.Total_Successfully_Reviewed}</p>
                <Button type='link' onClick={() => navigate(`/publish_details/${item.PublicationID}`)}>View Details</Button>
              </div>
              <div className="total_review_circle">
              </div>
            </div>

            <div className="view_all">
              <Button type='link' onClick={() => navigate(`/selected_user_research_all_view/${item.USERID}`)}>View All</Button>
            </div>
          </Card>
        )
      })}

    </div>
  )
}



export default SelectUserResearchPub
