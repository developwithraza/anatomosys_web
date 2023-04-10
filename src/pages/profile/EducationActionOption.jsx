import { Alert, Dropdown, Menu, Space, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { MdModeEditOutline, MdOutlineClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/feed_post.css'
import { DeleteComments, RemoveMyEducation, RemoveRegularPost, SavePost, UnSavePost, userDetails } from '../../services/api_services';

import EditEducation from './EditEducation';
import { useSelector } from 'react-redux';



function EducationActionOption({ eduInfo, ShwoAllEductionList }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    //delete education
    const RemoveMyEducations = async (id) => {
        await RemoveMyEducation({
            "ApiKey": userDetails.ApiKey,
            "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
            "EducationID": eduInfo.EducationID
        }).then(res => {
            if (res.data.success) {
                ShwoAllEductionList()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }
    const cancel = (e) => {
        // console.log(e);
    }

    const menu = (
        <Menu
            items={[

                {
                    key: '1',
                    label: (
                        <EditEducation eduInfo={eduInfo} ShwoAllEductionList={ShwoAllEductionList} />
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Education"
                            description="Are you sure to delete this Experience ?"
                            onConfirm={RemoveMyEducations}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                           <p><MdOutlineClose className="exp_delete" /> Delete</p> 
                        </Popconfirm>

                    ),
                },

            ]}
        />
    );




    return (

        <div className='more_option'>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                        <FiMoreHorizontal style={{ fontSize: '1rem', margin: '0 .5rem', cursor: 'pointer' }} />
                    </Dropdown>

                </Space>
            </Space>
        </div>
    )
}



export default EducationActionOption
