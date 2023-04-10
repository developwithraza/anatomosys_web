import React, { useState } from 'react';
import { Button, Modal, Select, Form, Input, Result } from 'antd';
import '../../style/feed_post.css'
import { BsFlagFill } from "react-icons/bs";
import { filterAllReport, filterAllUserReport, ReportPost, ReportUserProfile, userDetails } from '../../services/api_services';
import { useEffect } from 'react';
import { Card, Alert, Col, Row } from 'react-bootstrap';
import { FiUserX } from "react-icons/fi";



function UserReport({ userAllReqularPost, postData }) {
    const [error, setError] = useState(false)
    const [greet, setGreet] = useState(false)
    const [reportList, setReportList] = useState([])
    const [reportTitle, setReportTitle] = useState("")
    const [reportId, setReportId] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const reportBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID
    }
    const FilterAllReportList = async () => {
        await filterAllUserReport(reportBody).then(res => {
            if (res.data.success) {
                setReportList(res.data.extras.Data)
                // console.log("report list", res);
            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        FilterAllReportList()
    }, [])

    const reportsBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Report_USERID": postData.USERID,
        "ReportID": reportId,
        "Report_Comment": reportTitle,

    }
    console.log("report body");

    const reportHandleCofirm = async () => {
        await ReportUserProfile(reportsBody).then(res => {
            if (res.data.success) {
                // console.log("remove ", res);
                setGreet(true)
            }
        }).catch(err => {
            setError(err.response.data.extras.msg);
        })
    }


    const selectreportHandler = (value) => {
        setReportId(value)
    }
    return (
        <div className='post_report'>
            <p className='optionItems' onClick={showModal}>
                <FiUserX className='more_option_icon' /> Report User
            </p>
            <div className='create_post'>
                <Modal title="Reporting on User Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <div className="report_list">
                        <Card border="light" style={{ width: '100%' }}>
                            {!greet && <Card.Title>Why are you reporting this ?</Card.Title>}
                            {greet ? <Result
                                status="success"
                                title="Send Report SuccessFully!"
                                subTitle={reportTitle}

                            /> : <div className="reporting_resion">
                                <Form
                                    name="Report_post"
                                    className="reportPost"
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <Row >

                                        <Col md={12}>
                                            <Form.Item
                                                name="Reports"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter Department !',
                                                    },

                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Select Report"
                                                    optionFilterProp="children"
                                                    onChange={selectreportHandler}
                                                    allowClear={true}
                                                >
                                                    {reportList.map((option) => (
                                                        <Select.Option key={option.ReportID} value={option.ReportID} label={option.Report_Title}>
                                                            {option.Report_Title}
                                                        </Select.Option>
                                                    ))}

                                                </Select>

                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>

                                            <Form.Item
                                                name="Report_Title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter Report_Title !',
                                                    },

                                                ]}
                                            >
                                                <Input
                                                    placeholder="Report Commnet"
                                                    onChange={(e) => setReportTitle(e.target.value)}

                                                />

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className="repost_send_btn">
                                        <Button type='primary' onClick={reportHandleCofirm}>Send Report</Button>
                                    </div>
                                </Form>
                            </div>
                            }
                        </Card>
                        <div className="report_done">
                            {greet && <Button type='primary' onClick={() => { setIsModalOpen(false); userAllReqularPost() }}>Done</Button>}
                        </div>
                    </div>
                </Modal>
            </div >
        </div >
    );
}



export default UserReport
