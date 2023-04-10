import { Avatar } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useUserAuth } from '../../context/AuthUserContect'
import '../../style/feed_post.css'
import FeedPostForm from './FeedPostForm'
import UserPost from './UserPost'
import NotImg from '../../assets/illustrat_Image/not_img.png'
import Post_Illus from '../../assets/illustrat_Image/post.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function FeedPost() {
  
  const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
  const { user, userData } = useUserAuth()
  const [allPosts,setAllPosts]=useState(false)
 

 

  return (
    <div className='feed_section'>
      <div className="feed_items">
        <div className="feed_Item">
          <div className="user_image">
            {getUSerData.Whether_Image_Available == false && <span><img src={user.photoURL} /></span>
            }
            {getUSerData.Whether_Image_Available == true && <span> <img src={getUSerData.Image_Information.Image250} /></span>
            }
          </div>
          <div className="post_form">
            <FeedPostForm AllPostLoad={allPosts}/>
          </div>
        </div>
        {/* <div className="feed_illus">
          <img src={Post_Illus} />
        </div> */}
      </div>
      <div className="userPost">
        <UserPost AllPostLoad={allPosts}/>
      </div>

    </div>
  )
}

export default FeedPost
