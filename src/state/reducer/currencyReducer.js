import {
    GET_CURENCY,
    EXH_RATE,
    EXH_RATE_CURRENT,
    ALL_BANK,
    GET_COUNTRY,
    ALL_STATE,
    ALL_CITY,
    ALL_POSTEL,
    ALL_OCCUPATION,
    TIME_CONNECT,
    ALL_SALARY,
    ALL_GENDER,
    ALL_NATIONALITY,
    FREQUENCY_TRANSFER,
    ALL_TITLE,
    ALL_HISTORY,
    GET_ADVERTIZE

}   from "../constants/constant"

const CurrencyDetails={
  currencyData:{},
  exchangeRate:[],
  exchangeRateCurrent:[],
  bank:[],
  country:[],
  states:[],
  cities:[],
  postel:[],
  gender:[],
  occupation:[],
  salary:[],
  frequencyTransfer: [],
  timeConnect:[],
  nationality: [],
  title: [],
  history: {},
  getAdvertize: []


}
export default   (state = CurrencyDetails,action)=>{

    switch(action.type){

        case GET_CURENCY:
           
            return {
                ...state,
                CurrencyData:action.payload
            }

        case GET_COUNTRY:
           
                return {
                    ...state,
                    country:action.payload
                }    

        case EXH_RATE:
           
            return {
                ...state,
                exchangeRate:action.payload
        
            } 

        case EXH_RATE_CURRENT:
        
            return {
                ...state,
                exchangeRateCurrent:action.payload
        
            } 
        case ALL_BANK:
           
            return {
                    ...state,
                    bank:action.payload
            } 

        case ALL_STATE:
           
            return {
                    ...state,
                    states:action.payload
            }    

        case ALL_CITY:
           
                return {
                        ...state,
                        cities:action.payload
                }   

        case ALL_POSTEL:
           
                    return {
                            ...state,
                            postel:action.payload
                    }  
        case ALL_GENDER:

            return {
                    ...state,
                    gender:action.payload
            } 

        case ALL_OCCUPATION:

                return {
                        ...state,
                        occupation:action.payload
                }                  
        
        case ALL_SALARY:

            return {
                    ...state,
                    salary:action.payload
            }   

        case TIME_CONNECT:

            return {
                    ...state,
                    timeConnect:action.payload
            } 
       
        case FREQUENCY_TRANSFER:

            return {
                    ...state,
                    frequencyTransfer:action.payload
            } 

        case ALL_NATIONALITY:

            return {
                    ...state,
                    nationality:action.payload
            }    
        
        case ALL_TITLE:

            return {
                    ...state,
                    title:action.payload
            } 
        
        case ALL_HISTORY:

            return {
                ...state,
                history:action.payload
            } 
            
            
          default:
            return state

        case GET_ADVERTIZE:
            
            return {
                ...state,
                getAdvertize:action.payload
            } 

    }

   
}



