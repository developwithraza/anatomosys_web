import { Alert, Dropdown, Menu, Space, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { MdModeEditOutline, MdOutlineClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/feed_post.css'
import { DeleteComments, RemoveMyEducation, RemoveMyExperience, RemoveRegularPost, SavePost, UnSavePost, userDetails } from '../../services/api_services';

import EditExperience from './EditExperience';



function ExperienceActionOption({ expData, ShwoAllExperinceList }) {
    //delete education
    const RemoveMyExperiences = async () => {
        await RemoveMyExperience({
            "ApiKey": userDetails.ApiKey,
            "USERID": userDetails.userID,
            "SessionID": userDetails.sessionID,
            "ExperienceID": expData.ExperienceID
        }).then(res => {
            if (res.data.success) {
                ShwoAllExperinceList()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }
    const cancel=(e)=>{
        // console.log(e);
    }
    
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <EditExperience expData={expData} ShwoAllExperinceList={ShwoAllExperinceList} />
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Experience"
                            description="Are you sure to delete this Experience ?"
                            onConfirm={RemoveMyExperiences}
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





export default ExperienceActionOption