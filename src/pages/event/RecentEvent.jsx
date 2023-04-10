import { Button, Divider } from 'antd'
import React from 'react'
import { Card } from 'react-bootstrap'
import { fakeUserList } from '../../services/Anastomosys_service'
import "../../style/viewprofile.css"

function RecentEvent() {
    return (
        <div className='suggest_user'>
            <Card>
                <div className="suggest_user_heading">
                    <p>Recent Event</p>
                </div>
                {fakeUserList.map((item) => {
                    return (
                        <>
                            <div className="suggest_user_item" key={item.id}>
                                <div className="user_item_img">
                                    <img src={item.Img_Url} />
                                </div>
                                <div className="user_item_info">
                                    <p style={{ fontWeight: '600', fontSize: '1rem', color: '#0676b7' }}>{item.Nmae}</p>
                                    <p style={{ color: 'black', fontSize: '1rem', fontWeight: '600' }}>{item.Field}</p>
                                    <p style={{ fontSize: '1rem', color: 'black' }}>{item.disc}</p>
                                </div>
                                <div className="suggest_user_follower">
                                    <Button type='link' ><span>Follow</span></Button>
                                </div>
                            </div>

                            <Divider style={{margin:'.5rem 0'}}/>
                        </>
                    )
                })}
                <div className="suggest_user_view_all">
                    <div className="suggest_all_View">
                        <p>All View</p>
                    </div>
                    <div className="suggest_user_view_circle">

                    </div>
                </div>
            </Card>
        </div>
    )
}

export default RecentEvent
