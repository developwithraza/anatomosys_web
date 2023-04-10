import { Alert, Dropdown, Menu, Space, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../style/event.css'
import { CancelEvent, DeleteComments, RemoveEvent, RemoveRegularPost, SavePost, UnSavePost, userDetails } from '../../services/api_services';
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { BsFlagFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import EditEvent from './EditEvent';
import { useSelector } from 'react-redux';



function MyEventOption({ eventData,FilterMyEventLists }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    //remove regular post
    const cancelBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": eventData.EventID
    }
    const CancelMyEvent = async () => {
        await CancelEvent(cancelBody).then(res => {
            if (res.data.success) {
                // console.log("cancel ", res);
                FilterMyEventLists()
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }


    const removeBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": eventData.EventID
    }
    const RemoveMyEvent = async () => {
        await RemoveEvent(removeBody).then(res => {
            if (res.data.success) {
                // console.log("remove ", res);
                FilterMyEventLists()
            }
        }).catch(err => {
            console.log(err.data.response.extras.msg);
        })
    }


    const cancel = (e) => {
        // console.log(e);
        // message.error('Click on No');
    };


    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <EditEvent eventData={eventData} FilterMyEventLists={FilterMyEventLists}/>
                    ),
                },

                {
                    key: '2',
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Post?"
                            onConfirm={CancelMyEvent}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <p className='optionItems'
                            >
                                <FcCancel className='more_option_icon' /> Cancel Event
                            </p>
                        </Popconfirm>

                    ),
                },

                {
                    key: '3',
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Post?"
                            onConfirm={RemoveMyEvent}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <p className='optionItems'
                            >
                                <MdDeleteOutline className='more_option_iconss' /> Remove Event
                            </p>
                        </Popconfirm>

                    ),
                },

            ]}
        />
    );




    return (

        <div className='more_options'>
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





export default MyEventOption