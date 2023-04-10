
import { Button, Divider } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import { newsAndArtical } from '../../services/Anastomosys_service';
import '../../style/rightSidebar.css'
import { AiOutlinePlus } from "react-icons/ai";

import { active_user } from './ActiveUser';

function RightActiveProfile() {
    return (
        <div className='active_profile_card'>
            <Card style={{ width: '100%' }} >
                <div className="titles">
                    <Card.Title>
                        <p>Active Profile</p>
                    </Card.Title>
                </div>
                <Card.Text>
                    {active_user.map((active) => {
                        return (
                            <div className="active_profile">
                                <div className="active_Img">
                                    <img src={active.Img_Scr} />
                                </div>
                                <div className="active_info">
                                    <p style={{fontWeight:'600',fontSize:'1rem'}}>{active.Name}</p>
                                    <p style={{color:"black",fontSize:'1rem',fontWeight:'600'}}>{active.Specielist}</p>
                                    <p style={{color:"black",fontSize:'.8rem'}}>{active.About}</p>
                                </div>
                                <div className="active_follow">
                                    <Button type='link' >
                                        <p> <span><AiOutlinePlus /></span> Follow</p>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </Card.Text>
                <div className="more_View_section">
                    <div className="more_view">
                        <p>More View</p>
                    </div>
                    <div className="more_circle">

                    </div>
                </div>
            </Card>

        </div>
    )
}





export default RightActiveProfile
