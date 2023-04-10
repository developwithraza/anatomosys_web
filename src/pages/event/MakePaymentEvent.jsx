import React, { useState } from 'react';
import { Modal } from 'antd';
import '../../style/feed_post.css'
import { MdModeEditOutline } from "react-icons/md";
import EventCheckOut from './EventCheckOut';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';



function MakePaymentEvent({eventData,bookData }) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const stripePromise = loadStripe('pk_test_51MeBuNHG9d2tOJwBVN44MsXPyJxmj0jBcH8pzsBVH4nVI0sumvVnU8iMqhsKHmG3wnii7xtol78iuJmTHU7ucczO00t4GQjTk2');

    return (
        <div className='edit_post'>
            <p className='optionItems' onClick={showModal}>
                Pay Now
            </p>
            <div className='create_post'>
                <Modal title="Checkout " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                    <Elements stripe={stripePromise}>
                        <EventCheckOut bookData={bookData} eventData={eventData}/>
                    </Elements>


                </Modal>
            </div>
        </div >
    );
}


export default MakePaymentEvent
