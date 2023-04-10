import { Input, message, Button, Form, Select, Divider, AutoComplete, DatePicker, Badge, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { AddMyExperience, CreatemyEducation, CreateRegularPost, CretaeMyResearch, FilterAllCompany, filterAllDepartment, filterAllspecialisation, FilterAllUniversity, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import '../../style/viewprofile.css'
import { Allemployee_type, location_Type, MonthList } from '../../services/Anastomosys_service';
import { MdOutlineClose } from "react-icons/md";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { useSelector } from 'react-redux';

function AddExperienceForm({ handleCancel, ShwoAllExperinceList }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [showSkill, setShowSkill] = useState(false)
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchCompany, setSearchCompany] = useState("")
    const [companyList, setCompanyList] = useState([])
    const [empType, setEmpType] = useState(null)
    const [locationType, setLocationType] = useState(null)
    const [skills, setSkills] = useState([])
    const [startMonth, setStartMonth] = useState(null)
    const [endMonth, setEndMonth] = useState(null)

    const [companyId, setCompanyId] = useState(null)
    const [companyName, setCompanyName] = useState("")

    const [options, setOptions] = useState([])
    const [userUniver, setUserUniver] = useState(options.label)
    const [present, setPresent] = useState(false)
    const [userInput, setUserInput] = useState({
        Experience_Title: "",
        Company_Name: "",
        Job_Location: "",
        Description: "",
        Start_Year: "",
        End_Year: "",
    })

    const taghandleChange = (tags) => {
        setSkills(tags)
    }

    const comBody = {
        "ApiKey": userDetails.ApiKey,
        "Whether_Search_Filter": searchCompany != "" ? true : false,
        "Search_Input": searchCompany,
        "skip": skip,
        "limit": limit
    }

    const AllCompanyList = async () => {
        await FilterAllCompany(comBody).then(res => {
            // console.log('all Company', res);
            if (res.data.success) {
                setCompanyList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.reponce.data.extras.msg);
        })
    }
    useEffect(() => {
        const formData = form.getFieldsValue()
        searchCompany != "" && AllCompanyList()
    }, [searchCompany])


    const onSearch = (value) => {
        setSearchCompany(value)
        let res = []
        res = companyList.map((item) => ({
            data: item.CompanyID,
            label: item.Company_Name,
            value: item.Company_Name,
        }));

        setOptions(res);
    };
    const onSelect = (data, option) => {
        setCompanyId(option.data)
        setCompanyName(option.label)
    };
    const onChange = (value) => {
        setUserUniver(value);
    };


    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
        setShowSkill(false)
    }
    const onReset = () => {
        form.resetFields()
        setSkills([])
    };
    const Expbody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Experience_Title": userInput.Experience_Title,
        "Employment_Type": empType,
        "Company_Name": companyId != null ? companyName : userUniver,
        "Job_Location": userInput.Job_Location,
        "Location_Type": locationType,
        "Start_Month": startMonth,
        "Start_Year": userInput.Start_Year,
        "Whether_Currently_Working": endMonth != null && userInput.End_Year != "" ? false : true,
        "End_Month": endMonth,
        "End_Year": userInput.End_Year,
        "Skills": skills,
        "Description": userInput.Description,
        "Whether_Company_From_DB": companyId != null ? true : false,
        "CompanyID": companyId

    }

    const submithandler = async () => {
        await AddMyExperience(Expbody).then(res => {
            // console.log('create edu', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                ShwoAllExperinceList()
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
    const cancelhandle = () => {
        handleCancel()
        onReset()
    }

    //statrt date 
    const startMonthhandle = (value) => {
        setStartMonth(value)
    };

    //ent data
    const endMonthhandle = (value) => {
        setEndMonth(value)
    };

    const LocationTypehandle = (value) => {
        setLocationType(value)
    }
    const EmployeTypehnadle = (value) => {
        setEmpType(value)
    }
    const presentHandle = (e) => {
        setPresent(e.target.checked)
    }
    return (
        <div>

            <Form
                form={form}
                name="add_experience"
                className="create_experience"
                initialValues={{
                    remember: true,
                }}
                onFinish={submithandler}
                onFinishFailed={onFinishFailed}

            >

                <Col md={12}>
                    <Form.Item
                        name="company"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter company Name !',
                            },
                        ]}
                    >
                        <AutoComplete
                            value={userUniver}
                            options={options}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            onChange={onChange}
                            placeholder="Enter company Name"
                        />


                    </Form.Item>
                </Col>
                <Row >
                    <Col md={6}>

                        <Form.Item
                            name="Experience_Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Experience Title !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Experience Title"
                                value={userInput.Experience_Title}
                                onChange={handleChange("Experience_Title")}

                            />

                        </Form.Item>
                    </Col>

                    <Col md={6}>
                        <Form.Item
                            name="Employee_Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Employment Type !',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Employment Type"
                                optionFilterProp="children"
                                onChange={EmployeTypehnadle}
                                allowClear={true}

                            >
                                {Allemployee_type.map((option) => (
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
                            name="Job_Location"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Job Location !',
                                },

                            ]}
                        >
                            <Input
                                placeholder="Enter Job Location"
                                value={userInput.Job_Location}
                                onChange={handleChange("Job_Location")}

                            />

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="location_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Location Type !',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Location Type"
                                optionFilterProp="children"
                                onChange={LocationTypehandle}
                                allowClear={true}

                            >
                                {location_Type.map((option) => (
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
                                placeholder="Enter Start Year"
                                value={userInput.Start_Year}
                                onChange={handleChange("Start_Year")}

                            />

                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col md={12}>
                        <Form.Item
                            name="present"

                        >
                            <Checkbox onChange={presentHandle}>Are you working currently !</Checkbox>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="end_month"

                        >
                            <Select
                                showSearch
                                placeholder="Select End Month"
                                optionFilterProp="children"
                                onChange={endMonthhandle}
                                allowClear={true}
                                disabled={present == true}

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

                        >
                            <Input
                                placeholder="Enter End Year"
                                value={userInput.End_Year}
                                onChange={handleChange("End_Year")}
                                disabled={present == true}

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
                            placeholder="Description"
                            value={userInput.Description}
                            onChange={handleChange("Description")}
                            ref={focusInput}
                            autoSize

                        />

                    </Form.Item>
                </Col>
                <Col md={12}>
                    <TagsInput value={skills} onChange={taghandleChange} inputProps={{ placeholder: "Add Skills" }} />
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





export default AddExperienceForm
