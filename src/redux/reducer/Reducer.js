const INIT_STATE={
    auth_user:JSON.parse(sessionStorage.getItem('user_data') || '{}'),
    authenticate_user:false,
    
}

export const LoginReducer=(state=INIT_STATE,action)=>{
   switch(action.type){
     case "LOGIN_USER" : 
      return{
       auth_user:action.payload,
       authenticate_user:true,
      } 
      case "UPDATE_USER":
         return {
            ...state,
           auth_user:action.payload,

         }
      
     case "LOGOUT_USER" : 
     return {
        ...state,
        auth_user:[],
        authenticate_user:false,
     }

    //  case "RMV_ONE":
    //         const IteamIndex_dec = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
   
    //         if(state.carts[IteamIndex_dec].qnty >= 1){
    //             const dltiteams = state.carts[IteamIndex_dec].qnty -= 1
    //             console.log([...state.carts,dltiteams]);

    //             return {
    //                 ...state,
    //                 carts:[...state.carts]
    //             }
    //         }else if(state.carts[IteamIndex_dec].qnty === 1 ){
    //             const data = state.carts.filter((el)=>el.id !== action.payload);

    //             return {
    //                 ...state,
    //                 carts:data
    //             }
    //         }
     default :
     return state
   } 
}
//wish list
// export const wishReducer=(state=INIT_STATE,action)=>{
//    switch(action.type){
//      case "ADD_WISH" :  return{
//          ...state,
//          wish:[...state.wish,action.payload]
//       }
     
  
//      case "REMOVE_WISH" : 
//      const data=state.wish.filter((el)=>el.id!== action.payload)
//      return {
//       ...state,
//       wish:data
//      }

//     //  case "RMV_ONE":
//     //         const IteamIndex_dec = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
   
//     //         if(state.carts[IteamIndex_dec].qnty >= 1){
//     //             const dltiteams = state.carts[IteamIndex_dec].qnty -= 1
//     //             console.log([...state.carts,dltiteams]);

//     //             return {
//     //                 ...state,
//     //                 carts:[...state.carts]
//     //             }
//     //         }else if(state.carts[IteamIndex_dec].qnty === 1 ){
//     //             const data = state.carts.filter((el)=>el.id !== action.payload);

//     //             return {
//     //                 ...state,
//     //                 carts:data
//     //             }
//     //         }
//      default :
//      return state
//    } 
// }