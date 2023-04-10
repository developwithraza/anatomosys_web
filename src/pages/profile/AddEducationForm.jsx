import { Input, message, Button, Form, Select, Divider, AutoComplete, DatePicker, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { CreatemyEducation, CreateRegularPost, CretaeMyResearch, filterAllDepartment, filterAllspecialisation, FilterAllUniversity, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import '../../style/feed_post.css'
import { MonthList } from '../../services/Anastomosys_service';
import { useSelector } from 'react-redux';


function AddEducationForm({ handleCancel, ShwoAllEductionList }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(6)
    const [searchUniversity, setSearchUniversity] = useState("")
    const [universityList, setUniversityList] = useState([])
    const [reviewImg, setReviewImg] = useState("")
    const [deptList, setDeptList] = useState([])
    const [startMonth, setStartMonth] = useState(null)
    const [endMonth, setEndMonth] = useState(null)
    const [universityId, setUnivarsityId] = useState([])
    const [UniversityName, setUniversityName] = useState("")
    const [options, setOptions] = useState([])
    const [userUniver, setUserUniver] = useState(options.label)
    const [selectedClg,setSelectedCgl]=useState(null)

    const [userInput, setUserInput] = useState({
        // University_Name: "",
        Degree_Title: "",
        Field_of_Study: "",
        Grade: "",
        Description: "",
        Start_Year: "",
        End_Year: "",

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
            message.error(err.reponse.data.extras.msg);
        })
    }
    useEffect(() => {
        searchUniversity != "" && AllUniversityList()
    }, [searchUniversity])


    const onSearch = (value) => {
        setSearchUniversity(value)
        let res = []
        res = universityList.map((item) => ({
            value: item.University_Name,
            label: item.University_Name,
             data: item.UniversityID,

        }));

        setOptions(res);
    };
    const onSelect = (data,option) => {
        setUnivarsityId(option.data)
        setUniversityName(option.label)
        
    };
    const onChange = (query) => {
        setUserUniver(query);
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
        "University_Name": universityId != "" ? UniversityName : userUniver,
        "Degree_Title": userInput.Degree_Title,
        "Field_of_Study": userInput.Field_of_Study,
        "Start_Month": startMonth,
        "Start_Year": userInput.Start_Year,
        "End_Month": endMonth,
        "End_Year": userInput.End_Year,
        "Grade": userInput.Grade,
        "Description": userInput.Description,
        "Whether_Univeristy_From_DB": universityId != "" ? true : false,
        "UniversityID": universityId
    }

    const submithandler = async () => {
        await CreatemyEducation(Edubody).then(res => {
            // console.log('create edu', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                ShwoAllEductionList()
                handleCancel()
                onReset()
            }
        }).catch(err => {
            message.error(err.reponce.data.extras.msg);

        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const deptBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Whether_Search_Filter": false,
        "Search_Input": "",
        "skip": 0,
        "limit": 10
    }
    const ListAllDepartment = async () => {
        await filterAllDepartment(deptBody).then(res => {
            // console.log('department', res);
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


    const cancelhandle = () => {
        handleCancel()
        onReset()
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

    const endMonthhandle = (value) => {
        setEndMonth(value)
    };

    return (
        <div>
            <div className="review">
                <img src={reviewImg} />
            </div>
            {reviewImg != '' && <Divider />}
            <Form
                form={form}
                name="add_myResearch"
                className="create_research"
                initialValues={{
                    remember: true,
                }}
                onFinish={submithandler}
                onFinishFailed={onFinishFailed}

            >
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="university"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select University from List !',
                                },
                            ]}
                        >
                            <AutoComplete
                                value={userUniver}
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
                                value={userInput.Degree_Title}
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
                                value={userInput.Field_of_Study}
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
                                value={userInput.Grade}
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
                                placeholder="Start  Year"
                                value={userInput.Start_Year}
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
                                placeholder=" End Year"
                                value={userInput.End_Year}
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
                            placeholder="Description "
                            value={userInput.Description}
                            onChange={handleChange("Description")}
                            // ref={focusInput}
                            autoSize

                        />

                    </Form.Item>
                </Col>
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
                            htmlType='submit'
                                // onClick={submithandler}
                                className="login-form-button">
                                Add
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </div>
    )
}



export default AddEducationForm
