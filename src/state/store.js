import { createStore,combineReducers,applyMiddleware,compose  } from 'redux';
import user from "./reducer/loginReducer"
import currency from "./reducer/currencyReducer"
import profile  from "./reducer/profile"
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    
    user,
    currency,
    profile,
   
  })

  const enhancers = [];
  
  // if (process.env.NODE_ENV === 'development') {
  //   const { devToolsExtension } = window;
  
  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension());
  //   }
  // }
  
  const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancers,
  );
  
  export default preloadedState => {
    return createStore(rootReducer,preloadedState, composedEnhancers,
          );
  };

 