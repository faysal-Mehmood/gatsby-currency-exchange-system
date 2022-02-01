import * as loginConstant from "../constants/constant"

const userDetails={
  profile:{},
  reasons:[],
  userProfile: null,
  loader: true,
  mainImage: null
}
export default   (state = userDetails,action)=>{

    switch(action.type){

        case loginConstant.USER_PROFILE:
            return {
                ...state,
                profile:action.payload,
                loader:false
            }
        case loginConstant.REASON:
              return {
                  ...state,
                  reasons:action.payload
              }   
        case loginConstant.GET_PROFILE:
          return {
              ...state,
              userProfile:action.payload,
              
          }     

          case loginConstant.LOGOUT:
              return {
                  userDetails
              }
        
        case loginConstant.GET_IMAGE:
            return {
                ...state,
                mainImage:action.payload,
            } 
         
          default:
            return state

    }

   
}


