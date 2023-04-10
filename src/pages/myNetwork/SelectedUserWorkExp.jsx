import { Result, Divider,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { MdModeEditOutline } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { employee_type, Experience_list, monthLists } from '../../services/Anastomosys_service';
import { SelectedUserExperience, userDetails } from '../../services/api_services';
import EmptyImage from '../../assets/illustrat_Image/not_img.png'
import '../../style/viewprofile.css'
import { useSelector } from 'react-redux';




function SelectedUserWorkExp() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { id } = useParams()

    const [experienceList, setExperienceList] = useState([])

    const expBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id,
        "skip": 0,
        "limit": 10
    }


    const SelectedUserExperinceList = async () => {
        await SelectedUserExperience(expBody).then(res => {
            // console.log('my experience', res);
            if (res.data.success) {
                setExperienceList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SelectedUserExperinceList()
    }, [])


    return (
        <div className='work_experience'>
            <Card >
                <div className="heading">
                    <h2>Work Experiences</h2>
                </div>
                {experienceList.length == 0 ? <Result
                    title="Your Education not Available."
                /> : experienceList.map((item,index) => {
                    return (
                        <div key={item.ExperienceID}>
                            <div className="experience_item" >
                                <div className="company_logo">
                                    {item.Whether_Company_From_DB == true ? <img src={item.Company_Information.Image_Information.Image550} /> :
                                        <img src={EmptyImage} />
                                    }
                                </div>
                                <div className="company_info">
                                    <div className="experience_head">
                                        <h2>{item.Experience_Title}</h2>
                                    </div>
                                    <p style={{ textTransform: 'capitalize' }}>
                                        {monthLists[item.Start_Month]}-{item.Start_Year} to {item.Whether_Currently_Working == true ? "Present" : monthLists[item.End_Month]}-{item.End_Year}</p>
                                    <p>{item.Job_Location}</p>
                                    <div className="experience_skils">
                                        <p><span style={{ color: "black", fontWeight: '500' }}>Skills : </span>
                                            {item.Skills.map((items,index) => {
                                                return (
                                                    <div className="my_Skills" key={index}>
                                                        <span style={{ marginRight: '.5rem' }}>{items} ,  </span>
                                                    </div>
                                                )
                                            })}
                                        </p>

                                    </div>
                                </div>

                            </div>
                            <Divider style={{ marginTop: '1rem' }} />
                        </div>
                    )
                })}
            </Card>
        </div>
    )
}




export default SelectedUserWorkExp
