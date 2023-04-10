import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'

import { Row, Col, Card } from 'react-bootstrap';
import { CreateRegularPost, CretaeMyResearch, EditMyResearch, filterAllDepartment, filterAllspecialisation, MyResearchDetails, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import '../../style/feed_post.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
// import Font from '@ckeditor/ckeditor5-font/src/font';

import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
function EditReserchPublication() {
    const location = useLocation();
    const navigate = useNavigate()
    const { id } = useParams()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [myPublicData, setMyPublicData] = useState(location.state)
    const [reviewImg, setReviewImg] = useState(myPublicData.Image_Information.Image550)
    const [deptList, setDeptList] = useState([])
    const [departmentId, setDepartmentId] = useState(myPublicData.DepartmentID)
    const [uploadImg, setUploadImg] = useState("")
    const [uploadDoc, setUploadDoc] = useState("")
    const [ImageId, setImageID] = useState(myPublicData.Image_Information.ImageID)
    const [docId, setDocId] = useState([])
    const [documentShow, setDocumentShow] = useState([])
    const [docCollect, setDcoCollect] = useState(docId)
    const [docReview, setDocReview] = useState("")
    const [pubDec, setPubDec] = useState(myPublicData.Publication_Description)

    let doc = 0
    const [userInput, setUserInput] = useState({
        Publication_Title: myPublicData.Publication_Title,

    })


    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
    }
    const onReset = () => {
        form.resetFields();
    };




    useEffect(() => {
        myPublicData.Document_Information.map((d_id) => {
            docId.push(d_id.DocumentID)
            documentShow.push(d_id.Document_URL)
            console.log(docId)
            console.log(documentShow)
        })
    }, [myPublicData])

    const createBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "PublicationID": myPublicData.PublicationID,
        "Publication_Title": userInput.Publication_Title,
        "DepartmentID": departmentId,
        "Publication_Description": pubDec,
        "Whether_Image_Available": ImageId != "" ? true : false,
        "ImageID": ImageId,
        "Whether_Document_Available": docCollect != [] ? true : false,
        "Document_Information": docCollect
    }
    console.log(createBody)

    const submithandler = async () => {
        await EditMyResearch(createBody).then(res => {
            // console.log('Edit  public', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);

                onReset()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }


    const uploadDocumentHandler = (e) => {
        setDocId([])
        setDocumentShow([])
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
                // console.log(res);
                setImageID(res.data.extras.ImageID)
            }
        }).catch(err => {
            message.error(err.response.data.extras.Status);
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
            // console.log('department', res);
            if (res.data.success) {
                setDeptList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        console.log("location", location.state)

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


    const uploadImageCkEditor = (editor) => {
        editor.plugins.get("fileRepository").createUploaderAdapter = (loader) => {
            return uploadimageClick(loader);

        }

    }
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
                                Update Research
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
                            {docReview != "" ? <a href={docReview} target="_blank">{uploadDoc.name}</a> : documentShow.map((docs,index) => {
                                return (<div key={index}>
                                    <a href={docs} target="_blank">document {doc + 1}</a>
                                </div>)
                            })}
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
                                    placeholder="Publication Title"
                                    defaultValue={userInput.Publication_Title}
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
                                    defaultValue={myPublicData.DepartmentID}


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
                        // config={{
                        //     extraPlugins: [{
                        //        extraPlugins: uploadImageCkEditor}]
                        // }}
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




export default EditReserchPublication