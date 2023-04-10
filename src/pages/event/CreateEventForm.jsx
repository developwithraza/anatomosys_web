import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { CreateEvents, CreateRegularPost, filterAllDepartment, filterAllspecialisation, UploadPostGif, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import '../../style/feed_post.css'
import { Event_Mode_List, Event_Type_List, Privacy_Type } from '../../services/Anastomosys_service';
import { MdMyLocation } from "react-icons/md";
import { DatePicker } from 'antd';
import { useSelector } from 'react-redux';

function CreateEventForm({ handleCancel }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [reviewImg, setReviewImg] = useState("")
    const [uploadImg, setUploadImg] = useState("")
    const [eventType, setEventType] = useState(null)
    const [eventMode, setEventMode] = useState(null)
    const [date, setDate] = useState("")
    const [ImageId, setImageID] = useState('')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [userInput, setUserInput] = useState({
        Event_Title: "",
        Contact_Person_Name: "",
        Contact_Phone: "",
        Contact_Email: "",
        Event_Link: "",
        Amount: "",
        Maximum_Joinees: "",
        Event_Venue: "",
        Event_Description: "",
    })

    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }
    const onReset = () => {
        form.resetFields();
    };

    const onChange = (value, dateString) => {
        setDate(value);
    };
    const onOk = (value) => {
    };

    const eventBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Event_Title": userInput.Event_Title,
        "Contact_Person_Name": userInput.Contact_Person_Name,
        "Contact_Phone": userInput.Contact_Phone,
        "Contact_Email": userInput.Contact_Email,
        "Event_Description": userInput.Event_Description,
        "Maximum_Joinees": userInput.Maximum_Joinees,
        "Event_Type": eventType,
        "Event_Mode": eventMode,
        "Amount": userInput.Amount,
        "Event_Link": userInput.Event_Link,
        "Event_Venue": userInput.Event_Venue,
        "Latitude": lat,
        "Longitude": lng,
        "Whether_Image_Available": ImageId != "" ? true : false,
        "ImageID": ImageId,
        "Event_Date_Time": date
    }

    const onFinish = async () => {
        await CreateEvents(eventBody).then(res => {
            // console.log('create event', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                handleCancel()
                onReset()
            }
        }).catch(err => {
            message.error(err.response.data.extras.Status);

        })
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const uploadImgHandler = (e) => {
        setUploadImg(e.target.files[0]);
        setReviewImg(URL.createObjectURL(e.target.files[0]));
        // console.log("UploadImg", e.target.files[0]);

    }
    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', uploadImg)
        console.log("updateImg2", uploadImg)

        await UploadUserImage(fd).then(res => {
            if (res.data.success) {
                setImageID(res.data.extras.ImageID)

            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        uploadImg != "" && uploadimageClick()
    }, [uploadImg])

    const getLocationHandle = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)

        });
    }

    useEffect(() => {
        if (focusInput.current) {
            focusInput.current.focus();
        }
    }, [focusInput]);

    const cancelhandle = () => {
        handleCancel()
        onReset()
    }
    const EventModeHandle = (value) => {
        setEventMode(value)
    }
    const EventTypeHandle = (value) => {
        setEventType(value)
    }
    return (
        <div>
            <div className="review">
                {reviewImg != "" && <img src={reviewImg} />}

            </div>
            {reviewImg != '' && <Divider />}
            <Form
                form={form}
                name="eventUpdate"
                className="Update_Event"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Col md={12}>
                    <Form.Item
                        name="Event_Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Event Title !',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Event Title"
                            value={userInput.Event_Title}
                            onChange={handleChange("Event_Title")}
                        />
                    </Form.Item>
                </Col>
                <Col md={12}>

                    <Form.Item
                        name="Event_Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Event_Description !',
                            },

                        ]}
                    >
                        <Input.TextArea
                            placeholder="Add Description "
                            value={userInput.Event_Description}
                            onChange={handleChange("Event_Description")}
                            // ref={focusInput}
                            showCount
                            autoSize

                        />

                    </Form.Item>
                </Col>
                <Row>
                    <Col md={6}>

                        <Form.Item
                            name="Event_Date_Time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event Date Time !',
                                },

                            ]}
                        >
                            <DatePicker showTime={{
                                format: 'HH:mm',
                            }} onChange={onChange} onOk={onOk} />

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Maximum_Joinees"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Maximum_Joinees !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Maximum Joinees"
                                value={userInput.Maximum_Joinees}
                                onChange={handleChange("Maximum_Joinees")}

                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="Event_Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event_Type !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Event Type"
                                optionFilterProp="children"
                                onChange={EventTypeHandle}
                                allowClear={true}
                            >
                                {Event_Type_List.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Amount"
                            rules={eventType==2 && [
                                {
                                    required: true,
                                    message: 'Please Enter Amount !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Amount"
                                value={userInput.Amount}
                                onChange={handleChange("Amount")}
                                disabled={eventType == 1}
                            />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>

                        <Form.Item
                            name="Event Mode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event Mode !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Event Mode"
                                optionFilterProp="children"
                                onChange={EventModeHandle}
                                allowClear={true}
                            >
                                {Event_Mode_List.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={6} >
                        <Button type='default' className='locationBtn' onClick={getLocationHandle} disabled={eventMode == 1}><MdMyLocation className='location' />User Location</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="Event_Venue"
                            rules={eventMode==2 && [
                                {
                                    required: true,
                                    message: 'Please Enter Event_Venue !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Event Venue"
                                value={userInput.Event_Venue}
                                onChange={handleChange("Event_Venue")}
                                disabled={eventMode == 1}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Event_Link"
                            rules={eventMode==1 && [
                                {
                                    required: true,
                                    message: 'Please Enter Event_Link !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Event Link"
                                value={userInput.Event_Link}
                                onChange={handleChange("Event_Link")}
                                disabled={eventMode == 2}

                            />

                        </Form.Item>
                    </Col>


                </Row>

                <Row>

                </Row>


                <Row >
                    <Col md={4}>
                        <Form.Item
                            name="Contact_Person_Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Contact_Person_Name !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Contact Person Name"
                                value={userInput.Contact_Person_Name}
                                onChange={handleChange("Contact_Person_Name")}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item
                            name="Contact_Phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Contact_Phone !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Contact Phone"
                                value={userInput.Contact_Phone}
                                onChange={handleChange("Contact_Phone")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item
                            name="Contact_Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Contact_Email !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Contact Email"
                                value={userInput.Contact_Email}
                                onChange={handleChange("Contact_Email")}
                            />
                        </Form.Item>
                    </Col>
                </Row>




                {/* <Divider /> */}
                <div className="model_footers">

                    <div className="gallaryUpload">
                        <div className="gallary_image">
                            <label for="file-input">
                                <AiOutlineCamera className='camera_icon' />
                            </label>
                            <input id="file-input" type="file" onChange={uploadImgHandler} />
                        </div>
                    </div>
                    <div className="createPostBtn">
                        <Form.Item>
                            <Button
                                onClick={cancelhandle}
                            >
                                Cancel
                            </Button>

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                htmlType="submit"
                                // onClick={submithandler}
                                className="login-form-button">
                                Create
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </div>
    )
}



export default CreateEventForm
