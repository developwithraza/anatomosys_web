import { message, Divider, Result, Popconfirm } from 'antd'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap'
import { MdOutlineClose } from "react-icons/md";
import { Experience_list, MonthList, monthLists } from '../../services/Anastomosys_service';
import { myAllEducation, RemoveMyEducation, userDetails } from '../../services/api_services';
import '../../style/viewprofile.css'
import AddEducation from './AddEducation';
import Empty_img from '../../assets/illustrat_Image/not_img.png'
import EducationActionOption from './EducationActionOption';
import { useSelector } from 'react-redux';


function Education() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [EducationList, setEducationList] = useState([])

    const eduBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": 0,
        "limit": 10
    }

    const ShwoAllEductionList = async () => {
        await myAllEducation(eduBody).then(res => {
            // console.log('my education', res);
            if (res.data.success) {
                setEducationList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        ShwoAllEductionList()
    }, [])


    return (
        <div className='user_education'>
            <Card >
                <div className="heading">
                    <h2>Education</h2>
                    <div className="education_action">
                        <AddEducation ShwoAllEductionList={ShwoAllEductionList} />
                    </div>
                </div>
                {EducationList.length == 0 ? <Result
                    title="Your Education not Available."
                /> : EducationList.map((item,index) => {
                    return (
                        <div key={index}>
                            <div className="experience_item">
                                <div className="company_logo">
                                    {item.Whether_Univeristy_From_DB == true && item.University_Information.Whether_Image_Available == true ? <img src={item.University_Information.Image_Information.Image550} /> : <img src={Empty_img} />}

                                </div>
                                <div className="company_info">
                                    <div className="myEduction_head">
                                        <h2>{item.University_Name}</h2>
                                        <EducationActionOption ShwoAllEductionList={ShwoAllEductionList} eduInfo={item} />
                                    </div>
                                    <div className="education_data">
                                        <p>{item.Degree_Title} ({item.Field_of_Study}) </p>
                                        <p>Grade  {item.Grade}  </p>
                                        <p>{monthLists[item.Start_Month]}-{item.Start_Year} to {monthLists[item.End_Month]}-{item.End_Year}</p>
                                    </div>

                                </div>
                            </div>
                            <Divider style={{ margin: '0' }} />
                        </div>
                    )
                })}
            </Card>
        </div>
    )
}




export default Education
