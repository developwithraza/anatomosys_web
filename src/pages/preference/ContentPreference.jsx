import React, { useState } from 'react'
import "../../style/loginPage.css"
import "../../style/preference.css"
import { PngImage_Url } from '../../assets/assest_data'
import { Row, Col } from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import { Input ,Form,Button} from 'antd';
import { categoryList } from '../../services/Anastomosys_service'
import { useNavigate } from 'react-router-dom'


function ContentPreference({loginUser}) {
    const navigate=useNavigate()
    const onSearch = (value) => console.log(value);
    const [categoryItem, setCategoryItem] = useState(categoryList)

    const prefencehandle=()=>{
        navigate('/main')
        loginUser()
    }
    return (
        <div className='anastomosys_login'>
            <div className="right_background">

            </div>

            <div className="left_background"></div>


            <div className="loginSection">
                <Row>
                    <Col md={5}>
                        <div className="preferenceSection">
                            <div className="loginPage_title">
                                <div className="logoPageLogo">
                                    <img src={PngImage_Url.anastomosys_logo} />
                                </div>
                                <div className="login_title">
                                    <h2>Content Preference</h2>
                                    <p>Stay updated on your medical world!</p>
                                </div>
                            </div>

                            <div className="illustration_img">
                                <img src={PngImage_Url.preference_img} />
                            </div>
                        </div>
                    </Col>
                    <Col md={7}>
                        <div className="preference_Grid">
                            <div className="search_input">
                                <Input placeholder="Search Category" prefix={<SearchOutlined />} allowClear onSearch={onSearch} />
                            </div>
                            <div className="categories">
                                <Row>
                                    {categoryItem.map((cate) => {
                                        return (
                                            <Col md={4} >
                                                <div className="category_item">
                                                    <p>{cate.category}</p>
                                                </div>
                                            </Col>
                                        )
                                    })}


                                </Row>
                            </div>
                            <div className="continue_btn">
                                <Form.Item>
                                    <Button type="default"
                                      onClick={prefencehandle}  
                                        className="login-form-button">
                                        Continue
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    )
}



export default ContentPreference
