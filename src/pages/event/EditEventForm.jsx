import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { CreateEvents, EditEvents, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import '../../style/feed_post.css'
import { Event_Mode_List, Event_Type_List } from '../../services/Anastomosys_service';
import { MdMyLocation } from "react-icons/md";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
function EditEventForm({ handleCancel, FilterMyEventLists, eventData }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD  HH:MM';
    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [reviewImg, setReviewImg] = useState(eventData.Image_Information.Image250)
    const [uploadImg, setUploadImg] = useState("")
    const [eventType, setEventType] = useState(eventData.Event_Type)
    const [eventMode, setEventMode] = useState(eventData.Event_Mode)
    const [date, setDate] = useState(eventData.Event_Date_Time)
    const [ImageId, setImageID] = useState(eventData.Image_Information.ImageID)
    const [lat, setLat] = useState(eventData.Latitude)
    const [lng, setLng] = useState(eventData.Longitude)
    const [userInput, setUserInput] = useState({
        Event_Title: eventData.Event_Title,
        Contact_Person_Name: eventData.Contact_Person_Name,
        Contact_Phone: eventData.Contact_Phone,
        Contact_Email: eventData.Contact_Email,
        Event_Link: eventData.Event_Link,
        Amount: eventData.Amount,
        Maximum_Joinees: eventData.Maximum_Joinees,
        Event_Venue: eventData.Event_Venue,
        Event_Description: eventData.Event_Description,
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
        // console.log('onOk: ', value);
    };

    const eventBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EventID": eventData.EventID,
        "Event_Title": userInput.Event_Title,
        "Contact_Person_Name": userInput.Contact_Person_Name,
        "Contact_Phone": userInput.Contact_Phone,
        "Contact_Email": userInput.Contact_Email,
        "Event_Description": userInput.Event_Description,
        "Event_Link": userInput.Event_Link,
        "Maximum_Joinees": userInput.Maximum_Joinees,
        
        "Event_Venue": userInput.Event_Venue,
        "Latitude": lat==null ? 0 : lat,
        "Longitude": lng==null ? 0 : lng,
        "Whether_Image_Available": ImageId != "" ? true : false,
        "ImageID": ImageId,
        "Event_Date_Time": date

    }

    const submithandler = async () => {
        await EditEvents(eventBody).then(res => {
            // console.log('create event', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                handleCancel()
                onReset()
                FilterMyEventLists()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    const uploadImgHandler = (e) => {
        setUploadImg(e.target.files[0]);
        setReviewImg(URL.createObjectURL(e.target.files[0]));
        // console.log("UploadImg", e.target.files[0]);

    }
    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', uploadImg)

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
                name="editEvent"
                className="Edit_Event"
                initialValues={{
                    Event_Title: eventData.Event_Title,
                    Contact_Person_Name: eventData.Contact_Person_Name,
                    Contact_Phone: eventData.Contact_Phone,
                    Contact_Email: eventData.Contact_Email,
                    Event_Link: eventData.Event_Link,
                    Amount: eventData.Amount,
                    Maximum_Joinees: eventData.Maximum_Joinees,
                    Event_Venue: eventData.Event_Venue,
                    Event_Description: eventData.Event_Description,
                }}
            >
                <Row >
                    <Col md={6}>
                        <Form.Item
                            name="Event_Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event_Title !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Event_Title"
                                defaultValue={userInput.Event_Title}
                                onChange={handleChange("Event_Title")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={6}>
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
                                placeholder="Contact_Person_Name"
                                defaultValue={userInput.Contact_Person_Name}
                                onChange={handleChange("Contact_Person_Name")}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col md={6}>
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
                                placeholder="Contact_Phone"
                                defaultValue={userInput.Contact_Phone}
                                onChange={handleChange("Contact_Phone")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={6}>
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
                                placeholder="Contact_Email"
                                defaultValue={userInput.Contact_Email}
                                onChange={handleChange("Contact_Email")}
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
                                defaultValue={eventType}
                                disabled
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
                                defaultValue={eventMode}
                                disabled
                            >
                                {Event_Mode_List.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col md={6}>
                        <Form.Item
                            name="Amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Amount !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Amount"
                                defaultValue={userInput.Amount}
                                onChange={handleChange("Amount")}
                                disabled={eventType == 1}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Event_Link"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event_Link !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Event_Link"
                                defaultValue={userInput.Event_Link}
                                onChange={handleChange("Event_Link")}
                                disabled={eventMode == 2}

                            />

                        </Form.Item>
                    </Col>

                </Row>
                <Row >
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
                                placeholder="Maximum_Joinees"
                                defaultValue={userInput.Maximum_Joinees}
                                onChange={handleChange("Maximum_Joinees")}

                            />
                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Event_Venue"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Event_Venue !',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Event_Venue"
                                defaultValue={userInput.Event_Venue}
                                onChange={handleChange("Event_Venue")}
                                disabled={eventMode == 1}

                            />

                        </Form.Item>
                    </Col>

                </Row>
                <Row >
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
                            <DatePicker onChange={onChange} onOk={onOk} defaultValue={dayjs((JSON.stringify(date))
                                , dateFormat)} format={dateFormat} showTime={{
                                    format: 'HH:mm',
                                }} />

                        </Form.Item>
                    </Col>
                    <Col md={6} >
                        <Button type='default' className='locationBtn' onClick={getLocationHandle} disabled={eventMode == 1}><MdMyLocation className='location' />User Location</Button>
                    </Col>
                </Row>
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
                            placeholder="Write Event Description ...."
                            defaultValue={userInput.Event_Description}
                            onChange={handleChange("Event_Description")}
                            // ref={focusInput}
                            showCount
                            autoSize

                        />

                    </Form.Item>
                </Col>
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
                                onClick={submithandler}
                                className="login-form-button">
                                Update
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </div>
    )
}



export default EditEventForm
