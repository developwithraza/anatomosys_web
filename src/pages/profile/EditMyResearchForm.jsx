import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'

import { Row, Col } from 'react-bootstrap';
import { CreateRegularPost, CretaeMyResearch, EditMyResearch, filterAllDepartment, filterAllspecialisation, Uploadocument, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import '../../style/feed_post.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
// import Font from '@ckeditor/ckeditor5-font/src/font';


function EditMyResearchForm({ handleCancel, MyResearchPublic, myPublicData }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [reviewImg, setReviewImg] = useState(myPublicData.Image_Information.Image550)
    const [deptList, setDeptList] = useState([])
    const [departmentId, setDepartmentId] = useState(myPublicData.DepartmentID)
    const [uploadImg, setUploadImg] = useState("")
    const [uploadDoc, setUploadDoc] = useState("")
    const [ImageId, setImageID] = useState(myPublicData.Image_Information.ImageID)
    const [docId, setDocId] = useState([])
    const [documentShow, setDocumentShow] = useState(myPublicData.Document_Information)
    const [docCollect, setDcoCollect] = useState(docId)
    const [docReview, setDocReview] = useState(myPublicData.Document_Information)
    const [pubDec, setPubDec] = useState(myPublicData.Publication_Description)
    let doc = 1
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
        })
    }, [])
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

    const submithandler = async () => {
        await EditMyResearch(createBody).then(res => {
            // console.log('Edit  public', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                MyResearchPublic()
                handleCancel()
                onReset()
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

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
        ListAllDepartment()
    }, [])

    const departmentHandle = (value) => {
        setDepartmentId(value)
    }
    const cancelhandle = () => {
        handleCancel()
    }

    useEffect(() => {
        if (focusInput.current) {
            focusInput.current.focus();
        }
    }, [focusInput]);

    return (
        <div>
            <div className="review">
                <img src={reviewImg} />
            </div>
            {reviewImg != '' && <Divider />}
            <Form
                form={form}
                name="add myResearch"
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
                <Col md={12}>
                    <CKEditor
                        config={{
                            toolbar: [
                                'heading', 'bold', 'italic', 'fontColor', 'bulletedList', 'numberedList',
                                'undo', 'redo'
                            ],
                            fontColor: {
                                colors: [
                                    {
                                        color: 'hsl(0, 0%, 0%)',
                                        label: 'Black'
                                    },
                                    {
                                        color: 'hsl(0, 0%, 30%)',
                                        label: 'Dim grey'
                                    },
                                    // ...
                                ]
                            },
                        }}
                        editor={ClassicEditor}
                        data={pubDec}
                        onReady={(editor) => {
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setPubDec(data)
                            // console.log({ event, editor, data });
                        }}
                    />
                </Col>

                <Divider />
                <div className="model_footers">

                    <div className="gallaryUpload">
                        <div className="gallary_image">
                            <label htmlFor="file-input">
                                <AiOutlineCamera className='camera_icon' />
                            </label>
                            <input id="file-input" type="file" onChange={uploadImgHandler} />
                        </div>
                        <div className="gallary_vedio">
                            <label htmlFor="doc_input">
                                <HiOutlineDocumentText className='camera_icon' />
                            </label>
                            <input id="doc_input" type="file" onChange={uploadDocumentHandler} />
                        </div>
                        {documentShow.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="showDoc" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <a href={item.Document_URL} target="_blank">doc {doc++} </a>
                                    </div>
                                </div>
                            )
                        })}
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


export default EditMyResearchForm
