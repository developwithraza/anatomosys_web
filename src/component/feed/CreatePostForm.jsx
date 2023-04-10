import { Input, message, Button, Form, Select, Divider, Checkbox } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { CreateRegularPost, filterAllDepartment, filterAllspecialisation, UploadPostGif, UploadPostVedio, UploadUserImage, userDetails } from '../../services/api_services'
import { AiOutlineCamera, AiFillYoutube } from "react-icons/ai";
import '../../style/feed_post.css'
import { Privacy_Mode_List, Privacy_Type } from '../../services/Anastomosys_service';
import { MdMyLocation } from "react-icons/md";
import { useSelector } from 'react-redux';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

function CreatePostForm({ handleCancel,AllPostLoad }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
  const [allPost,setAllPost]=useState(AllPostLoad)

    const [form] = Form.useForm();
    const focusInput = useRef(null);
    const [reviewImg, setReviewImg] = useState("")
    const [privacy, setPrivacy] = useState(null)
    const [vedioReview, setVedioReview] = useState("")
    const [deptList, setDeptList] = useState([])
    const [departmentId, setDepartmentId] = useState([])
    const [uploadImg, setUploadImg] = useState("")
    const [uploadVedio, setUploadVedio] = useState("")
    const [specialisationId, setSpecialisationId] = useState([])
    // const [spacialisation, setSpecialisation] = useState([])
    const [spacialisationList, setSpecialisationList] = useState([])
    const [commt, setCommt] = useState(false)
    const [download, setDownload] = useState(false)
    const [owner, setOwner] = useState(false)
    const [mediaType, setMediaType] = useState(null)
    const [tags, setTags] = useState([])
   
    const [gallary, setGallary] = useState([])
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [userInput, setUserInput] = useState({
        Post_Title: "",
        Post_Description: "",
        
    })
    
    const taghandleChange = (tags) => {
        setTags(tags)
        console.log("tags",tags)
      }
    const handleChange = (propertyName) => (event) => {
        setUserInput((userInput) => ({
            ...userInput, [propertyName]: event.target.value
        }))
        // console.log(userInput);
    }
    const onReset = () => {
        form.resetFields();
    };
    const postBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "Privacy_Type": privacy,
        "Whether_Departments": departmentId != [] ? true : false,
        "DepartmentID_Array": departmentId,
        "Whether_Specialisations": specialisationId != [] ? true : false,
        "SpecialisationID_Array": specialisationId,
        "Whether_Latitude_Longitude": lat && lng != '' ? true : false,
        "Latitude": lat,
        "Longitude": lng,
        "Post_Title": userInput.Post_Title,
        "Post_Description": userInput.Post_Description,
        "Tags": tags,
        "Whether_Can_Comment": commt ? true : false,
        "Whether_Can_Download": download ? true : false,
        "Whether_Owner_Rights": owner ? true : false,
        "Gallery_Array": gallary
    }
    // console.log("postBody", postBody);

    const onFinish = async () => {
        await CreateRegularPost(postBody).then(res => {
            // console.log('create regular post', res);
            if (res.data.success) {
                message.success(res.data.extras.Status);
                handleCancel()
                onReset()
                setAllPost(true)
            }
        }).catch(err => {
            message.error(err.data.extras.Status);

        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const reset=()=>{
        form.resetFields()
    }

    const uploadVedioHandler = (e) => {
        setUploadVedio(e.target.files[0]);
        setVedioReview("")
        setVedioReview(URL.createObjectURL(e.target.files[0]));
        setMediaType(4)
        // console.log("mediaType", mediaType);
        setGallary([])

    }
    const uploadVedioClick = async () => {
        const fdv = new FormData();
        fdv.append('video', uploadVedio)
        fdv.append('Whether_Thumbnail_Image_Available', "false")

        // console.log("uploadVedio", uploadVedio)
        await UploadPostVedio(fdv).then(res => {
            if (res.data.success) {
                // console.log(res);
                // setVedioID(res.data.extras.VideoID)
                gallary.push({ "VideoID": res.data.extras.VideoID, "Media_Type": mediaType })
                // console.log('image id', vedioID);
                // console.log("gallary", gallary);
            }
        }).catch(err => {

            message.error(err.response.data.extras.msg);
        })
    }


    const uploadImgHandler = (e) => {
        setUploadImg(e.target.files[0]);
        setMediaType(null)
        setGallary([])
        setReviewImg("")
        setReviewImg(URL.createObjectURL(e.target.files[0]));
        // console.log("UploadImg", e.target.files[0]);s
        e.target.files[0].type === "image/gif" ? setMediaType(2) : setMediaType(1)

    }

    const uploadimageClick = async () => {
        const fd = new FormData();
        fd.append('image', uploadImg)

        await UploadUserImage(fd).then(res => {
            if (res.data.success) {
                // console.log(res);
                gallary.push({ "ImageID": res.data.extras.ImageID, "Media_Type": mediaType })
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    const uploadGifImage = async () => {
        const fd = new FormData();
        fd.append('gif', uploadImg)
        await UploadPostGif(fd).then(res => {
            if (res.data.success) {
                // console.log(res);
                gallary.push({ "Gif_ImageID": res.data.extras.Gif_ImageID, "Media_Type": mediaType })
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);
        })
    }
    useEffect(() => {
        uploadImg.type == "image/gif" ? uploadGifImage() : uploadimageClick()
        uploadVedio != "" && uploadVedioClick()
    }, [uploadImg, uploadVedio])

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

    const speceliseBody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": getUSerData.USERID,
        "SessionID": getUSerData.All_Device_Sessions[getUSerData.All_Device_Sessions.length - 1].SessionID,
        "DepartmentID": departmentId,
        "Whether_Search_Filter": false,
        "Search_Input": "",
        "skip": 0,
        "limit": 10
    }

    const ListAllspecialist = async () => {
        await filterAllspecialisation(speceliseBody).then(res => {
            // console.log('specialisation', res);
            if (res.data.success) {
                setSpecialisationList(res.data.extras.Data)
            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }

    useEffect(() => {
        ListAllDepartment()
    }, [])

    useEffect(() => {
        ListAllspecialist()
    }, [departmentId])


    const departmentHandle = (value) => {
        setDepartmentId(value)
    }
    const cancelhandle = () => {
        handleCancel()
        reset()
        setReviewImg("")
        setVedioReview("")
        

    }
    const SpecialisationHandle = (value) => {
        setSpecialisationId(value)
    };
    const privacyHandle = (value) => {
        setPrivacy(value)
    }

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


    const commenthandle = (e) => {
        setCommt(e.target.checked)
    };
    const downloadhandle = (e) => {
        setDownload(e.target.checked)
    };
    const ownerhandle = (e) => {
        setOwner(e.target.checked)
    };
    return (
        <div>
            <div className="review">
                {reviewImg != "" && <img src={reviewImg} />}
                {vedioReview != "" && <video width="400" height="300" controls >
                    <source src={reviewImg} type="video/mp4" />
                </video>}
            </div>
            {reviewImg != '' && <Divider />}
            <Form
                form={form}
                name="UpdateProfession"
                className="update_profession"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Col md={12}>

                    <Form.Item
                        name="Post_Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please inter Post_Title !',
                            },

                        ]}
                    >
                        <Input
                            placeholder="Post Title"
                            defaultValue={userInput.Post_Title}
                            onChange={handleChange("Post_Title")}

                        />

                    </Form.Item>
                </Col>
                <Col md={12}>

                    <Form.Item
                        name="Post_Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Post_Description !',
                            },

                        ]}
                    >
                        <Input.TextArea
                            placeholder="Add Description"
                            defaultValue={userInput.Post_Description}
                            onChange={handleChange("Post_Description")}
                            ref={focusInput}
                            autoSize

                        />

                    </Form.Item>
                </Col>
                <Row>

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
                                mode="multiple"

                            >
                                {deptList.map((option) => (
                                    <Select.Option key={option.DepartmentID} value={option.DepartmentID} label={option.Department_Title}>
                                        {option.Department_Title}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col md={6}>

                        <Form.Item
                            name="Specialisation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Specialisation !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Specialisation"
                                optionFilterProp="children"
                                onChange={SpecialisationHandle}
                                allowClear={true}
                                mode="multiple"
                            >
                                {spacialisationList.map((option) => (
                                    <Select.Option key={option.SpecialisationID} value={option.SpecialisationID} label={option.Specialisation_Title}>
                                        {option.Specialisation_Title}
                                    </Select.Option>
                                ))}

                            </Select>

                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col md={6}>

                    <TagsInput  value={tags} onChange={taghandleChange} />

                    </Col>
                    <Col md={6} >
                        <Button type='default' className='locationBtn' onClick={getLocationHandle}><MdMyLocation className='location' />User Location</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="comment"

                        >
                            <Checkbox onChange={commenthandle}>Allow Comment</Checkbox>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Download"

                        >
                            <Checkbox onChange={downloadhandle}>Allow Download</Checkbox>

                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Item
                            name="owner"

                        >
                            <Checkbox onChange={ownerhandle}>Is Original Content?</Checkbox>

                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item
                            name="Privacy_Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Privacy_Type !',
                                },

                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Privacy"
                                optionFilterProp="children"
                                onChange={privacyHandle}
                                allowClear={true}


                            >
                                {Privacy_Mode_List.map((option) => (
                                    <Select.Option key={option.key} value={option.key} label={option.values}>
                                        {option.values}
                                    </Select.Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
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
                            <label htmlFor="Vedio_file-input">
                                <AiFillYoutube className='camera_icon' />
                            </label>
                            <input id="Vedio_file-input" type="file" onChange={uploadVedioHandler} />
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
                                htmlType='submit'

                                // onClick={submithandler}
                                className="login-form-button">
                                Post
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </div>
    )
}

export default CreatePostForm
