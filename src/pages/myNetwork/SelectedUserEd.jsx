import { message,Result, Divider } from 'antd'
import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap'
import Empty_img from '../../assets/illustrat_Image/not_img.png'

import { useParams } from 'react-router-dom';
import { monthLists } from '../../services/Anastomosys_service';
import { SelectedUserEducations, userDetails } from '../../services/api_services';
import '../../style/viewprofile.css'
import { useSelector } from 'react-redux';



function SelectedUserEd() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [EducationList, setEducationList] = useState([])
    const { id } = useParams()
    const eduBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Selected_USERID": id,
        "skip": 0,
        "limit": 10

    }

    const SelectedUserEductionList = async () => {
        await SelectedUserEducations(eduBody).then(res => {
            // console.log('select user education', res);
            if (res.data.success) {
                setEducationList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        SelectedUserEductionList()
    }, [])

    return (
        <div className='user_education'>
            <Card >
                <div className="heading">
                    <h2>Education</h2>

                </div>
                {EducationList.length == 0 ? <Result
                    title="Your Education not Available."
                /> : EducationList.map((item,index) => {
                    return (
                        <div key={index}>
                        <div className="experience_item">
                                <div className="company_logo">
                                    {item.Whether_Univeristy_From_DB == true ? <img src={item.University_Information.Image_Information.Image550} /> : <img src={Empty_img} />}

                                </div>
                                <div className="company_info">
                                    <div className="myEduction_head">
                                        <h2>{item.University_Name}</h2>
                                       
                                    </div>
                                    <div className="education_data">
                                        <p>{item.Degree_Title} ({item.Field_of_Study}) </p>
                                        <p>Grade  {item.Grade}  </p>
                                        <p>{monthLists[item.Start_Month]}-{item.Start_Year} to {monthLists[item.End_Month]}-{item.End_Year}</p>
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




export default SelectedUserEd
