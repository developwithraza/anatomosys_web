import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';

const EventCheckOut = ({eventData,bookData}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    //     if(!error) {
    //     try {
    
    //         const response = await axios.post("http://localhost:4000/payment", {
    //             amount: eventData.Amount,
    //             id
    //         })

    //         if(response.data.success) {
    //             console.log("Successful payment")
    //             setSuccess(true)
    //         }

    //     } catch (error) {
    //         console.log("Error", error)
    //     }
    // } else {
    //     console.log(error.message)
    // }
    };


    const stripePromise = loadStripe('pk_test_51MeBuNHG9d2tOJwBVN44MsXPyJxmj0jBcH8pzsBVH4nVI0sumvVnU8iMqhsKHmG3wnii7xtol78iuJmTHU7ucczO00t4GQjTk2');

    const baseStripeElementOptions = {
        style: {
            base: {
                fontFamily: 'Oxanium',
                fontSize: '16px',
                    color: '#000000',
                    '::placeholder': {
                    color: '#000000',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                <PaymentElement options={baseStripeElementOptions} />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};


export default EventCheckOut
