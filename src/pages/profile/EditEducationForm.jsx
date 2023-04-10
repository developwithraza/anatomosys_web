import { Input, message, Button, Form, Select, Divider, AutoComplete, DatePicker } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { CreatemyEducation, CreateRegularPost, CretaeMyResearch, EditmyEducationDetails, filterAllDepartment, filterAllspecialisation, FilterAllUniversity, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import '../../style/feed_post.css'
import { Link } from 'react-router-dom';
import { MonthList } from '../../services/Anastomosys_service';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';


function EditEducationForm({ handleCancel, ShwoAllEductionList, eduInfo }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchUniversity, setSearchUniversity] = useState("")
    const [universityList, setUniversityList] = useState([])
    const [startMonth, setStartMonth] = useState(eduInfo.Start_Month)
    const [endMonth, setEndMonth] = useState(eduInfo.End_Month)
     
    const [endYear, setEndYear] = useState(eduInfo.End_Year)
    const [universityId, setUnivarsityId] = useState(eduInfo.UniversityID)
    const [UniversityName, setUniversityName] = useState(eduInfo.University_Name)
    const [options, setOptions] = useState([])
    const [userUniver, setUserUniver] = useState(eduInfo.University_Name)

    const [userInput, setUserInput] = useState({
        Degree_Title: eduInfo.Degree_Title,
        Field_of_Study: eduInfo.Field_of_Study,
        Grade: eduInfo.Grade,
        Description: eduInfo.Description,
        Start_Year: eduInfo.Start_Year,
        End_Year: eduInfo.End_Year,

    })

    const universityBody = {
        "ApiKey": userDetails.ApiKey,
        "Whether_Search_Filter": searchUniversity != "" ? true : false,
        "Search_Input": searchUniversity,
        "skip": skip,
        "limit": limit
    }

    const AllUniversityList = async () => {
        await FilterAllUniversity(universityBody).then(res => {
            // console.log('create edu', res);
            if (res.data.success) {
                setUniversityList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.reponce.data.extras.msg);
        })
    }
    useEffect(() => {
        searchUniversity != "" && AllUniversityList()
    }, [searchUniversity])


    const onSearch = (value) => {
        setSearchUniversity(value)
        let res = []
        res = universityList.map((item) => ({
            value: item.UniversityID,
            label: item.University_Name,
        }));

        setOptions(res);
    };
    const onSelect = (data, option) => {
        setUnivarsityId(data)
        setUniversityName(option.label)
    };
    const onChange = (value) => {
        setUserUniver(value);
    };


    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }
    const onReset = () => {
        form.resetFields();
    };
    const Edubody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "EducationID": eduInfo.EducationID,
        "University_Name": universityId != "" ? UniversityName : userUniver,
        "Degree_Title": userInput.Degree_Title,
        "Field_of_Study": userInput.Field_of_Study,
        "Start_Month": startMonth,
        "Start_Year": parseInt(userInput.Start_Year),
        "End_Month": endMonth,
        "End_Year": parseInt(userInput.End_Year),
        "Grade": userInput.Grade,
        "Description": userInput.Description,
        "Whether_Univeristy_From_DB": universityId != "" ? true : false,
        "UniversityID": universityId
    }

    const submithandler = async () => {
        await EditmyEducationDetails(Edubody).then(res => {
            // console.log('create edu', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                ShwoAllEductionList()
                handleCancel()
                onReset()
            }
        }).catch(err => {
            message.error(err.reponse.data.extras.msg);

        })
    }
    const cancelhandle = () => {
        handleCancel()
    }

    useEffect(() => {
        if (focusInput.current) {
            focusInput.current.focus();
        }
    }, [focusInput]);

    //statrt date 
    const startMonthhandle = (value) => {
        setStartMonth(value)
    };
    
    //ent data
    const endMonthhandle = (value) => {
        setEndMonth(value)
    };
 


    return (
        <div>

            <Form
                form={form}
                name="add_myResearch"
                className="create_research"
                initialValues={{
                    University_Name: eduInfo.University_Name,
                    Degree_Title: eduInfo.Degree_Title,
                    Field_of_Study: eduInfo.Field_of_Study,
                    Start_Year: eduInfo.Start_Year,
                    End_Year: eduInfo.End_Year,
                    Grade: eduInfo.Grade,
                    Description: eduInfo.Description,
                }}

            >
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="university"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Publication_Description !',
                                },
                            ]}
                        >
                            <AutoComplete
                                defaultValue={userUniver}
                                options={options}
                                onSelect={onSelect}
                                onSearch={onSearch}
                                onChange={onChange}
                                placeholder="Enter University Name"
                            />


                        </Form.Item>
                    </Col>
                    <Col md={6}>

                        <Form.Item
                            name="Degree_Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Degree_Title !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Degree Title"
                                defaultValue={userInput.Degree_Title}
                                onChange={handleChange("Degree_Title")}

                            />

                        </Form.Item>
                    </Col>
                </Row>

                <Row >
                    <Col md={6}>

                        <Form.Item
                            name="Field_of_Study"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Field_of_Study !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Enter Field of Study"
                                defaultValue={userInput.Field_of_Study}
                                onChange={handleChange("Field_of_Study")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={6}>

                        <Form.Item
                            name="Grade"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Grade !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Enter Grade"
                                defaultValue={userInput.Grade}
                                onChange={handleChange("Grade")}

                            />

                        </Form.Item>
                    </Col>

                </Row>

                <Row >
                    <Col md={6}>
                        <Form.Item
                            name="start_month"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter start_month !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Start Month"
                                optionFilterProp="children"
                                onChange={startMonthhandle}
                                allowClear={true}
                                defaultValue={eduInfo.Start_Month}

                            >
                                {MonthList.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Start_Year"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Start_Year !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Enter Start Year"
                                defaultValue={userInput.Start_Year}
                                onChange={handleChange("Start_Year")}

                            />

                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col md={6}>
                        <Form.Item
                            name="end_month"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter end_month !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select End Month"
                                optionFilterProp="children"
                                onChange={endMonthhandle}
                                allowClear={true}
                                defaultValue={eduInfo.End_Month}


                            >
                                {MonthList.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="End_Year"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter End_Year !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Enter End Year"
                                defaultValue={userInput.End_Year}
                                onChange={handleChange("End_Year")}

                            />
                          
                        </Form.Item>
                    </Col>
                </Row>
                <Col md={12}>
                    <Form.Item
                        name="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Description !',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Write Something In your mind ......."
                            defaultValue={userInput.Description}
                            onChange={handleChange("Description")}
                            ref={focusInput}
                            showCount
                            autoSize

                        />

                    </Form.Item>
                </Col>
                <Divider />
                <div className="model_foots">
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





export default EditEducationForm
