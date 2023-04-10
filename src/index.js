import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'antd/dist/reset.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { UserAuthContextProvider, useUserAuth } from './context/AuthUserContect';
import { PubNubProvider } from 'pubnub-react';
import Pubnub from 'pubnub';
import { userDetails } from './services/api_services';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/Store';
import { LOGOUT } from './redux/actions/Action';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';




const pubnub = new Pubnub({
  publishKey: userDetails.publishKey,
  subscribeKey: userDetails.subscribeKey,
  uuid: "0123456789"
});

window.addEventListener('beforeunload', async function (e) {
  const { user, logout } = useUserAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  e.preventDefault();
  await logout().then(res => {
    dispatch(LOGOUT())
    navigate('/login_page')
    sessionStorage.clear()
  }).catch(err => {
    console.log(err.message);

  })

});

// console.log("pubnub",pubnub)
const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe('pk_test_51MeBuNHG9d2tOJwBVN44MsXPyJxmj0jBcH8pzsBVH4nVI0sumvVnU8iMqhsKHmG3wnii7xtol78iuJmTHU7ucczO00t4GQjTk2');


root.render(
  
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <UserAuthContextProvider>
        <PubNubProvider client={pubnub}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PubNubProvider>
      </UserAuthContextProvider>
    </Provider>
  </Elements>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
