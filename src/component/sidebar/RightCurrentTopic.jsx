
import { Button, Divider, message, Spin } from 'antd';
import React from 'react'
import { Card } from 'react-bootstrap';
import { newsAndArtical } from '../../services/Anastomosys_service';
import '../../style/rightSidebar.css'
import { VscDebugBreakpointData } from "react-icons/vsc";
import { filterAllDepartment, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import { MdOutlineRefresh } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

function RightCurrentTopic() {
    const [deptList, setDeptList] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [dataCount, setDataCount] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const initialPosts = slice(deptList, 0, limit)

    const deptBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Whether_Search_Filter": false,
        "Search_Input": "",
        "skip": skip,
        "limit": limit
    }
    const ListAllDepartment = async () => {
        await filterAllDepartment(deptBody).then(res => {
            // console.log('department list', res);
            if (res.data.success) {
                setDeptList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        ListAllDepartment()
    }, [])


    const loadMore = () => {
        setLimit(limit + 3)
        setIsMoreLoading(true)

        if (limit >= dataCount) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 16,
                marginRight: '.5rem',

            }}
            spin
        />
    );


    return (
        <div className='current_topic_card'>
            <Card style={{ width: '100%' }} >
                <div className="titles">
                    <Card.Title>
                        <p>Current Department</p>
                    </Card.Title>
                </div>
                {initialPosts.map((item, index) => {
                    return (
                        <div className="more_View_sections" key={item.DepartmentID}>
                            <div className={`${index % 2 == 0 ? "coadiology" : "orthology"}`}>
                                <p>{item.Department_Title}</p>
                            </div>
                            <div className="more_circle">

                            </div>
                        </div>
                    )
                })}
                <div className="more_topic">
                    {isCompleted ? (
                        <div className="load_more_cpmment">
                            <Button type='link' disabled>{!isMoreLoading && <FcCancel style={{ marginTop: '-.2rem', marginRight: '.3rem' }} />} No More Dept.</Button>
                        </div>
                    ) : (
                        <div className="load_more_cpmment">
                            <Button type='link' onClick={loadMore}>{isMoreLoading && <Spin indicator={antIcon} style={{ marginTop: '-.5rem' }} />}{!isMoreLoading && <MdOutlineRefresh style={{ marginRight: '.3rem' }} />} Load more Dept.</Button>
                        </div>
                    )}
                </div>
            </Card>

        </div>
    )
}





export default RightCurrentTopic
