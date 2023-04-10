
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyC5_ly8TBOKSGHXMG8zV9KfrWZQWyG--Ic",
//     authDomain: "rhythm-application.firebaseapp.com",
//     projectId: "rhythm-application",
//     storageBucket: "rhythm-application.appspot.com",
//     messagingSenderId: "877731215194",
//     appId: "1:877731215194:web:ae91260432e3379f7ca563",
//     measurementId: "G-FGLN5FFV92"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyC5_ly8TBOKSGHXMG8zV9KfrWZQWyG--Ic",
    authDomain: "rhythm-application.firebaseapp.com",
    databaseURL: "https://rhythm-application.firebaseio.com",
    projectId: "rhythm-application",
    storageBucket: "rhythm-application.appspot.com",
    messagingSenderId: "877731215194",
    serverkey: "AAAAzFzbd1o:APA91bFewgWZ7hAu8rOyNN2e3uaZI-QH9866xX1QxCVu1nUfFaeH9uCnwpwl49e4ElVLvfzhoQDrOh-miYi3RAusDjlxe_pU2wDZLndnwvQ_xos9RL2lTBLeXM5-nPmXQemj5TVrt0ou",
    senderid: "877731215194",
    dbname: "rhythm-application",
    dbsecret: "CJ9V3SaoV5fyjZYGc2gOKWtiZAcY558wlcG4yDB9"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;



