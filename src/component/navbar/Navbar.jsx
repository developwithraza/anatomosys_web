import '../../style/navbar.css'
import React, { useEffect } from 'react'
import { Row, Col, Input, Tabs, message, Empty } from 'antd'
import { PngImage_Url } from '../../assets/assest_data'
import { SearchOutlined } from '@ant-design/icons';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import UserAccount from './UserAccount';
import { AiOutlineHome, AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineEventAvailable, MdOutlineMessage, MdNotificationsNone } from "react-icons/md";
import { useState } from 'react';
import { SearchAllUsers, SearchOnlyUsers, SearchPosts, SearchReviewerUsers, userDetails } from '../../services/api_services';
import SearchAllUser from './SearchAllUser';
import { Scrollbar } from 'react-scrollbars-custom';
import SearchOnlyUser from './SearchOnlyUser';
import SearchOnlyReviewer from './SearchOnlyReviewer';
import SearchPost from './SearchPost';
import { useSelector } from 'react-redux';


function Navbar() {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)

    const navigate=useNavigate()
    const [search, setSearch] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [searchData, setSearchData] = useState([])
    const [onlyUser,setOnlyUser]=useState([])
    const [revieweruser,setReviewerUser]=useState([])
    const [allPost,setAllPost]=useState([])

    const handleSearch = (value) => {
        setSearch(true)
    }

    const handleClick = () => {
        setSearch(false)
    }
    //searching 

    const postbody = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Search_Input": searchInput,
        "skip": 0,
        "limit": 30

        
    }
    const SearchingAllPost = async () => {
        await SearchPosts(postbody).then(res => {
            if (res.data.success) {
                setAllPost(res.data.extras.Data)
                // console.log('search All user', res);

            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    const body = {
        "ApiKey": userDetails.ApiKey,
        "USERID": userDetails.userID,
        "SessionID": userDetails.sessionID,
        "Search_Input": searchInput,
        "skip": 0,
        "limit": 30
    }
    const SearchingAllUser = async () => {
        await SearchAllUsers(body).then(res => {
            if (res.data.success) {
                setSearchData(res.data.extras.Data)
                // console.log('search All user', res);

            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }

    const SearchingOnlyUser = async () => {
        await SearchOnlyUsers(body).then(res => {
            if (res.data.success) {
                setOnlyUser(res.data.extras.Data)
                // console.log('search only user', res);

            }
        }).catch(err => {
            message.error(err.response.data.extras.msg);

        })
    }
    const SearchingReviwerUser = async () => {
        await SearchReviewerUsers(body).then(res => {
            if (res.data.success) {
                setReviewerUser(res.data.extras.Data)
                // console.log('reviewer  user', res);

            }
        }).catch(err => {
            console.log(err.response.data.extras.msg);

        })
    }
    useEffect(() => {
        searchInput != "" && SearchingAllUser()
        searchInput != "" && SearchingAllPost()
        searchInput != "" && SearchingOnlyUser()
        searchInput != "" && SearchingReviwerUser()
        searchInput=="" && setSearch(false)
    }, [searchInput,Tabs.defaultActiveKey])

   

    return (
        <>
            <div className='navbar_header'>

                <div className="container" style={{ padding: '0' }}>
                    <div className="navbar_item">
                        <Row

                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col className="gutter-row" span={12}>
                                <div className="nav_left_side">
                                    <div className="nav_logo">
                                        <img src={PngImage_Url.anastomosys_logo} onClick={()=>navigate('/main')}/>
                                    </div>
                                    <div className="search_input">
                                        <Input placeholder="Search" prefix={<SearchOutlined />} allowClear  onChange={(e) => {
                                            setSearch(true)
                                            setSearchInput(e.target.value)
                                            console.log("on change", e.target.value)
                                        }} onClick={handleClick} />
                                    </div>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <div className="navbar_tabs">
                                    <NavLink to='/main'><AiOutlineHome className='menu_icon' /><span>Home</span></NavLink>
                                    <NavLink to='/event_page'><MdOutlineEventAvailable className='menu_icon' /> <span>Event</span>
                                    </NavLink>
                                    <NavLink to='/all_research'>
                                        <AiOutlineFileSearch className='menu_icon' />
                                        <span>My Research</span>
                                    </NavLink>
                                    <NavLink to='/messingin_page'>
                                        <MdOutlineMessage className='menu_icon' />
                                        <span>Messaging</span>
                                    </NavLink>
                                    
                                    <UserAccount />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
            {search == true &&
                <div className="container search_option">
                    <Scrollbar style={{ width: '100%', height: '80vh', padding: '0', margin: '0' }}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="All User" key="1">
                                <SearchAllUser searchData={searchData} searchInput={searchInput} handleClick={handleClick} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="User" key="2" >
                                <SearchOnlyUser searchData={onlyUser} searchInput={searchInput} handleClick={handleClick}/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Reviewer" key="3">
                                <SearchOnlyReviewer searchData={revieweruser} searchInput={searchInput} handleClick={handleClick}/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Post" key="4">
                                <SearchPost searchData={allPost} searchInput={searchInput} handleClick={handleClick}/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Scrollbar>
                </div>

            }
        </>
    )
}

export default Navbar
