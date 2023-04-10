import { message, Divider, Result, Popconfirm } from 'antd'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { employee_type, monthLists } from '../../services/Anastomosys_service';
import { FilterAlMyExperience, RemoveMyExperience, userDetails } from '../../services/api_services';
import '../../style/viewprofile.css'
import AddExperience from './AddExperience';
import EmptyImage from '../../assets/illustrat_Image/not_img.png'
import ExperienceActionOption from './ExperienceActionOption';
import { useSelector } from 'react-redux';



function WorkExperience() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const [experienceList, setExperienceList] = useState([])
    const expBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "skip": 0,
        "limit": 10
    }

    const ShwoAllExperinceList = async () => {
        await FilterAlMyExperience(expBody).then(res => {
            // console.log('my experience', res);
            if (res.data.success) {
                setExperienceList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        ShwoAllExperinceList()
    }, [])

    //remove experience 

    return (
        <div className='work_experience'>
            <Card >
                <div className="heading">
                    <h2>Work Experiences</h2>
                    <div className="heading_action">
                        <div className="experience_action">
                            <AddExperience ShwoAllExperinceList={ShwoAllExperinceList} />
                        </div>
                    </div>
                </div>
                {experienceList.length == 0 ? <Result
                    title="Your experience not Available."
                /> : experienceList.map((item) => {
                    return (
                        <div key={item.ExperienceID}>
                            <div className="experience_item" >
                                <div className="company_logo">
                                    {item.Whether_Company_From_DB == true && item.Company_Information
                                        .Whether_Image_Available == true ? <img src={item.Company_Information.Image_Information.Image550} /> :
                                        <img src={EmptyImage} />
                                    }
                                </div>
                                <div className="company_info">
                                    <div className="experience_head">
                                        <h2>{item.Experience_Title}</h2>
                                        <ExperienceActionOption expData={item} ShwoAllExperinceList={ShwoAllExperinceList} />
                                    </div>
                                    <p>{item.Company_Name} ® . {employee_type[item.Employment_Type]}</p>
                                    <p style={{ textTransform: 'capitalize' }}>
                                        {monthLists[item.Start_Month]}-{item.Start_Year} to {item.Whether_Currently_Working == true ? "Present" : monthLists[item.End_Month]}-{item.End_Year}</p>
                                    <p>{item.Job_Location}</p>
                                    <div className="experience_skils">
                                        <div><span style={{ color: "black", fontWeight: '500' }}>Skills : </span>
                                            {item.Skills.map((items, index) => {
                                                return (
                                                    <div className="my_Skills" key={index}>
                                                        <span style={{ marginRight: '.5rem' }}>{items} ,  </span>
                                                    </div>
                                                )
                                            })}
                                        </div>

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


export default WorkExperience
