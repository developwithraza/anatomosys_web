import React from 'react';
import { Avatar, List } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchOnlyUser = ({ searchData,searchInput,handleClick }) => {
    const data = searchData.map((item) => {
        return (
            { title: item.Name }
        )
    })

const searchuserInfohandle=()=>{
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
                                        avatar={<Avatar src={items.Image_Information.Image550}/>}
                                        title={<Link to={`/select_following_user/${items.USERID}`} onClick={searchuserInfohandle}>{item.title}</Link>}
                                        description={items.Bio}
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


export default SearchOnlyUser
