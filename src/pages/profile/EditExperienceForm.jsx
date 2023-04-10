import { Input, message, Button, Form, Select, Divider, AutoComplete, DatePicker, Badge, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { AddMyExperience, CreatemyEducation, CreateRegularPost, CretaeMyResearch, EditMyExperience, FilterAllCompany, filterAllDepartment, filterAllspecialisation, FilterAllUniversity, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import '../../style/viewprofile.css'
import { Allemployee_type, location_Type, MonthList } from '../../services/Anastomosys_service';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { useSelector } from 'react-redux';

function EditExperienceForm({ expData, ShwoAllExperinceList, handleCancel }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchCompany, setSearchCompany] = useState("")
    const [companyList, setCompanyList] = useState([])
    const [empType, setEmpType] = useState(expData.Employment_Type)
    const [locationType, setLocationType] = useState(expData.Location_Type)
    const [skills, setSkills] = useState(expData.Skills)
    const [startMonth, setStartMonth] = useState(expData.Start_Month)
    const [endMonth, setEndMonth] = useState(expData.End_Month)

    const [companyId, setCompanyId] = useState(expData.CompanyID)
    const [companyName, setCompanyName] = useState(expData.Company_Name)
    const [present, setPresent] = useState(expData.Whether_Currently_Working)
    const [options, setOptions] = useState([])
    const [userUniver, setUserUniver] = useState(expData.Company_Name)

    const [userInput, setUserInput] = useState({
        Experience_Title: expData.Experience_Title,
        Job_Location: expData.Job_Location,
        Description: expData.Description,
        Start_Year: expData.Start_Year,
        End_Year: expData.End_Year,
        

    })

    const taghandleChange = (tags) => {
        setSkills(tags)
        console.log("tags",tags)
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
            console.log('all Company', res);
            if (res.data.success) {
                setCompanyList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.reponce.data.extras.msg);
        })
    }
    useEffect(() => {
        console.log("skills", skills);
        const formData = form.getFieldsValue()
        console.log("formData", formData);
        searchCompany != "" && AllCompanyList()
    }, [searchCompany])


    const onSearch = (value) => {
        setSearchCompany(value)
        let res = []
        res = companyList.map((item) => ({
            value: item.CompanyID,
            label: item.Company_Name,
        }));

        setOptions(res);
    };
    const onSelect = (data, option) => {
        setCompanyId(data)
        setCompanyName(option.label)
        console.log('onSelect', option);
    };
    const onChange = (value) => {
        setUserUniver(value);
    };


    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
        console.log(userInput);
    }
    const onReset = () => {
        form.setFieldsValue()
    };
    const Expbody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
            "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "ExperienceID": expData.ExperienceID,
        "Experience_Title": userInput.Experience_Title,
        "Employment_Type": empType,
        "Company_Name": companyId != null ? companyName : userUniver,
        "Job_Location": userInput.Job_Location,
        "Location_Type": locationType,
        "Start_Month": startMonth,
        "Start_Year": userInput.Start_Year,
        "Whether_Currently_Working": present == true ? true : false,
        "End_Month": present==true ? 0 : endMonth,
        "End_Year": present==true ? 0 : userInput.End_Year,
        "Skills": skills,
        "Description": userInput.Description,
        "Whether_Company_From_DB": companyId != "" ? true : false,
        "CompanyID": companyId

    }

    const submithandler = async () => {
        await EditMyExperience(Expbody).then(res => {
            // console.log('edit', res);
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
                    Description: expData.Description,
                    Employee_Type: expData.Employee_Type,
                    End_Year: expData.End_Year,
                    Experience_Title: expData.Experience_Title,
                    Job_Location: expData.Job_Location,
                    Start_Year: expData.Start_Year,
                    all_Skills: expData.all_Skills,
                    company: expData.Company_Name,
                    end_month: expData.end_month,
                    location_type: expData.location_Type,
                    start_month: expData.start_month,
                }}

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
                            defaultValue={userUniver}
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
                                defaultValue={userInput.Experience_Title}
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
                                defaultValue={expData.Employment_Type}

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
                                defaultValue={userInput.Job_Location}
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
                                defaultValue={expData.Location_Type}


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
                                defaultValue={expData.Start_Month}

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
                    <Col md={12}>
                        <Form.Item
                            name="present"

                        >
                            <Checkbox onChange={presentHandle} defaultValue={present} checked={present==true}>Are you working currently !</Checkbox>

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
                                defaultValue={expData.End_Month}
                                disabled={present==true}


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
                                defaultValue={userInput.End_Year}
                                onChange={handleChange("End_Year")}
                                disabled={present==true}

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
                <Col md={12}>
                <TagsInput  value={skills} onChange={taghandleChange} />

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
        </div >
    )
}







export default EditExperienceForm
