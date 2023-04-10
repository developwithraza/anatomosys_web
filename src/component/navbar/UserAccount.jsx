import { Avatar, message } from 'antd';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/navbar.css'
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdPreview, MdOutlineNoteAlt, MdOutlineLogout, MdOutlineBlock, MdNotificationsNone } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { useUserAuth } from '../../context/AuthUserContect';
import { BsCheck2Circle } from "react-icons/bs";
import NotImg from '../../assets/illustrat_Image/not_img.png'
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../redux/actions/Action';
import { useEffect, useState } from 'react';
import { userDetails, userProfileInfo } from '../../services/api_services';


function UserAccount() {
    const dispatch = useDispatch()
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const { user, logout } = useUserAuth();
    const navigate = useNavigate()

   

    const logouthanle = async () => {
        await logout().then(res => {
            // console.log(res);
            dispatch(LOGOUT())
            navigate('/login_page')
            sessionStorage.clear()
        }).catch(err => {
            message.error(err.message);

        })
    }



    return (
        <div className="userMenu_bar">
            <Dropdown align="start">
                <Dropdown.Toggle id="dropdown-basic" >
                    <div className="user_menu">
                        {getUSerData.Whether_Image_Available == false && <span><img src={user.photoURL} /></span>
                        }
                        {getUSerData.Whether_Image_Available == true && <span> <img src={getUSerData.Image_Information.Image250} /></span>
                        }
                        <p>{getUSerData.Whether_Basic_Information_Available == true ? getUSerData.Name
                            : user.displayName}</p>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <div className="tab_profile_img">
                        {getUSerData.Whether_Image_Available == false && <span><img src={user.photoURL} /></span>
                        }
                        {getUSerData.Whether_Image_Available == true && <span> <img src={getUSerData.Image_Information.Image250} /></span>
                        }
                    </div>
                    <div className="menu_user_name">
                        <div className="user_name">
                            <p>{getUSerData.Whether_Basic_Information_Available == true ? getUSerData.Name : user.displayName} <span id='userVerifyIcon'><BsCheck2Circle /></span></p>
                            <p id='profetion'>{getUSerData.Whether_Professional_Details_Available == true && getUSerData.Professional_Details.Specialisation_Title}</p>
                        </div>
                        <div className="more_circles">

                        </div>
                    </div>
                    <div className="view_user_profiles">
               
                        <Dropdown.Item id='view_Profile'>
                            <Link to='/view_profile'>
                                View Profile
                            </Link>
                        </Dropdown.Item>
                        
                    </div>
                    <div className="dropDown_options">
                        <Dropdown.Item ><Link to='/my_network'><span className='menu_item_icon'><HiOutlineUserGroup /></span>My Network</Link></Dropdown.Item>
                        {/* {userData.All_Roles.Whether_Reviewer==true ?  */}

                        <Dropdown.Item > <Link to='/review_request'><span className='menu_item_icon'><MdPreview /></span>Review Request</Link> </Dropdown.Item>
                        {/* <Dropdown.Item > <Link to='/request_for_review'><span className='menu_item_icon'><MdPreview /></span>Request for Reviewer</Link> </Dropdown.Item> } */}
                        <Dropdown.Item ><Link to='/blocked_user'><span className='menu_item_icon'><MdOutlineBlock /></span>Blocked</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to='/notification'><span className='menu_item_icon'><MdNotificationsNone /></span>Notification</Link></Dropdown.Item>

                        <Dropdown.Item ><Link to='/setting'><span className='menu_item_icon'><AiOutlineSetting /></span>Settings</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to='/privacy_policy' ><span className='menu_item_icon'><MdOutlineNoteAlt /></span>Privacy Policy</Link></Dropdown.Item>
                        <Dropdown.Item onClick={logouthanle}><Link to=''><span className='menu_item_icon'><MdOutlineLogout /></span>Logout </Link></Dropdown.Item>

                    </div>

                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}


export default UserAccount
