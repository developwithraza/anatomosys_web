import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import CreateEvent from '../../pages/event/CreateEvent';
import '../../style/feed_post.css'
import CreateImgPost from './CreateImgPost';
import CreatePost from './CreatePost';
import PostVedio from './PostVedio';


function FeedPostForm({AllPostLoad}) {
    const [userInput, setUserInput] = useState({})

    const navigate=useNavigate()
  
    return (
        <div className='feed_post_fotm'>
            {/* <div className="form_title">
                <p>Share A Post with the Community:</p>
            </div> */}
            <div className="post_create">
                <CreatePost AllPostLoad={AllPostLoad}/>
            </div>
            <div className="post_imge_vedio_event">
                <div className="post_image">
                    <CreateImgPost />
                </div>
                <div className="post_vedio">
                    <PostVedio />
                </div>
                <div className="post_event">
                    <CreateEvent />
                </div>
            </div>
           

        </div>
    )
}

export default FeedPostForm
