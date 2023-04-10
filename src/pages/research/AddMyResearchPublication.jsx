import React, { useState, useEffect, useRef } from 'react'
import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import { Row, Col, Card } from 'react-bootstrap';
import { CreateRegularPost, CretaeMyResearch, filterAllDepartment, filterAllspecialisation, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import '../../style/researchpublic.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";


function AddMyResearchPublication() {
    
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [reviewImg, setReviewImg] = useState("")
    const [deptList, setDeptList] = useState([])
    const [departmentId, setDepartmentId] = useState("")
    const [uploadImg, setUploadImg] = useState("")
    const [uploadDoc, setUploadDoc] = useState("")
    const [ImageId, setImageID] = useState('')
    const [docId, setDocId] = useState("")
    const [docCollect, setDcoCollect] = useState([])
    const [docReview, setDocReview] = useState("")
    const [pubDec, setPubDec] = useState(null)
    const [userInput, setUserInput] = useState({
        Publication_Title: "",

    })


    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }
    const onReset = () => {
        form.resetFields();
    };
    const createBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Publication_Title": userInput.Publication_Title,
        "DepartmentID": departmentId,
        "Publication_Description": pubDec,
        "Whether_Image_Available": ImageId != "" ? true : false,
        "ImageID": ImageId,
        "Whether_Document_Available": docCollect != [] ? true : false,
        "Document_Information": docCollect
    }

    const submithandler = async () => {
        await CretaeMyResearch(createBody).then(res => {
            if (res.data.success) {
                message.success(res.data.extras.Status);
                onReset()
                navigate('/all_research')
            }
        }).catch(err => {
            message.error(err.reponse.data.extras.msg);

        })
    }


    const uploadDocumentHandler = (e) => {
        setUploadDoc(e.target.files[0]);
        setDocReview(URL.createObjectURL(e.target.files[0]));


    }
    const uploadVedioClick = async () => {
        const fdv = new FormData();
        fdv.append('file', uploadDoc)
        await Uploadocument(fdv).then(res => {
            if (res.data.success) {
                docCollect.push(res.data.extras.DocumentID)

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
        uploadDoc != "" && uploadVedioClick()
    }, [uploadImg, uploadDoc])

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

    const departmentHandle = (value) => {
        setDepartmentId(value)
    }


    useEffect(() => {
        if (focusInput.current) {
            focusInput.current.focus();
        }
    }, [focusInput]);

    return (
        <div className='container add_my_resheachs'>
            <Card>
                <Card.Header>
                    <div className="card_titles">
                        <div className="add_my_research_titles">
                            <p onClick={() => navigate(-1)}><MdKeyboardBackspace style={{ fontSize: '1.5rem' }} /></p>
                            <p>Create Research</p>
                        </div>
                        <div className="createPublications">
                            <Button type="primary"
                                onClick={submithandler}
                                className="login-form-button">
                                Create Research
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <div className="gallary_Upload">
                    <div className="my_publication_image_doc">
                        <div className="gallaryImage">
                            <label>Upload Image</label>
                            <label htmlFor="file-input">
                                {reviewImg == "" ? <BsImage className='Image_Icon' /> : <img src={reviewImg} />}
                            </label>
                            <input id="file-input" type="file" onChange={uploadImgHandler} />
                        </div>
                        <div className="gallary_Vedio">
                            <label>Upload Document</label>
                            <label htmlFor="doc_input">
                                <HiOutlineDocumentText className='camera_icon' />
                            </label>
                            <input id="doc_input" type="file" onChange={uploadDocumentHandler} />
                            {docReview != [] && <a href={docReview} >{uploadDoc.name}</a>}
                        </div>
                    </div>

                </div>


                <Form
                    form={form}
                    name="add_myResearch"
                    className="create_research"
                    initialValues={{
                        remember: true,
                    }}

                >
                    <Row >
                        <Col md={6}>

                            <Form.Item
                                name="Publication_Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please inter Publication_Title !',
                                    },

                                ]}
                            >
                                <Input
                                    placeholder="Publication_Title"
                                    value={userInput.Publication_Title}
                                    onChange={handleChange("Publication_Title")}

                                />

                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item
                                name="Department"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter Department !',
                                    },

                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select Department"
                                    optionFilterProp="children"
                                    onChange={departmentHandle}
                                    allowClear={true}

                                >
                                    {deptList.map((option) => (
                                        <Select.Option key={option.DepartmentID} value={option.DepartmentID} label={option.Department_Title}>
                                            {option.Department_Title}
                                        </Select.Option>
                                    ))}

                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>

                    <CKEditor
                        editor={ClassicEditor}
                        data={pubDec}
                        onReady={(editor) => {
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setPubDec(data)
                        }}
                        placeholder="Write here"
                        focus
                    />




                </Form>
            </Card>
        </div>
    )
}



export default AddMyResearchPublication