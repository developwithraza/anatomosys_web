import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset,
} from 'firebase/auth'
import { auth } from "../firebase";
import { userDetails, userProfileInfo } from "../services/api_services";
import { useSelector } from "react-redux";
import { message } from "antd";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const getUSerData = useSelector((state) => state.LoginReducer.auth_user)
    const [user, setUser] = useState([])
    const [isLogged, setIsLogged] = useState(false)

    // const userBody = {
    //     "ApiKey": userDetails.ApiKey,
    //     "USERID": userDetails.userID,
    //     "SessionID": userDetails.sessionID,
    // }
    // console.log("userBody", userBody);

    // const UserProfileDetails = async () => {
    //     await userProfileInfo(userBody).then(res => {
    //         console.log('User details', res);
    //         if (res.data.success) {
    //             setUserData(res.data.extras.Data)
    //             console.log("user", user);
    //         }
    //     }).catch(err => {
    //         message.error(err.response.data.extras.msg);
    //     })
    // }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe()
        }
    
    }, [])
  
      
    function logout() {
        return signOut(auth)
    }
    function googleSignIn() {
        
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }
    function facebookLogin() {
        const facebookAuthProvider = new FacebookAuthProvider()
        return signInWithPopup(auth, facebookAuthProvider)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }
    function forgatePasswords(email) {
        return sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/" })
    }
    function resetPassword(oobCode, newpassword) {
        return confirmPasswordReset(auth, newpassword, oobCode)
    }

    return <userAuthContext.Provider value={{ user, isLogged,signup, login, logout, googleSignIn, facebookLogin, forgatePasswords, resetPassword }}>{children}</userAuthContext.Provider>
}
export function useUserAuth() {
    return useContext(userAuthContext)
}