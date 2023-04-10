export const LOGIN=(user)=>{
    return{
        type:"LOGIN_USER",
        payload:user
    }
}


export const UpdateUser=(updateInfo)=>{
    return{
        type:"UPDATE_USER",
        payload:updateInfo
    }
}
//remove data

export const LOGOUT=()=>{
    return{
        type:"LOGOUT_USER",
        payload:null
    }
}


