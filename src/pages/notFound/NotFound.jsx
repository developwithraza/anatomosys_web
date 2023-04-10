import React from 'react'
import { Button, Result } from 'antd';
import '../../style/navbar.css'
import { useNavigate } from 'react-router-dom';
function NotFound() {
    const navigate=useNavigate()
    return (
        <div className='container not_found'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={()=>navigate(-1)}>Go Back </Button>}
            />
        </div>
    )
}

export default NotFound