import React from 'react';
import { Avatar, List } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowMoreText from "react-show-more-text";

const SearchPost = ({ searchData, searchInput, handleClick }) => {
    const data = searchData.map((item) => {
        return (
            { title: item.Post_Title }
        )
    })
    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    const searchuserInfohandle = () => {
        handleClick()
    }

    
    return (
        <>
            {
                searchData != [] && searchData.map((items) => {
                    return (

                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={items.User_Information.Image_Information.Image550} />}

                                        title={<Link to={`/select_following_user/${items.USERID}`} onClick={searchuserInfohandle}>{item.title}</Link>}

                                        description={
                                            <ShowMoreText
                                                /* Default options */
                                                lines={1}
                                                more="Show more"
                                                less="Show less"
                                                className="content-csss"
                                                anchorClass="show-more-less-clickable"
                                                onClick={executeOnClick}
                                                expanded={false}
                                                width={500}
                                                truncatedEndingComponent={"..... "}
                                            >
                                                {items.Post_Description}

                                            </ShowMoreText>

                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    )
                })
            }
        </>
    )

}


export default SearchPost
