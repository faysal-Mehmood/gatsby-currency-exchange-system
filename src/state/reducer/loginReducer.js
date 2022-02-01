import * as loginConstant from "../constants/constant"

const userDetails={
  userData:{},
  error:""
}
export default   (state = userDetails,action)=>{

    switch(action.type){

        case loginConstant.USER_DATA:
            return {
                ...state,
                userData:action.payload,
                error:action.error
            }
         
          default:
            return state

    }

   
}


