import React, { useState, useEffect } from "react";
import { Formik } from 'formik';
import { Link } from "gatsby";
import translate from 'src/helpers/language';
import {userLogin, userLoginGoogle} from "../../state/action/login"
import GoogleLogin from 'react-google-login';
import {useSelector,useDispatch} from "react-redux"
import { navigate } from "gatsby" 
import googleLogo from "src/images/icons/google-logo.png";

const Login = () => {
  const dispatch = useDispatch()
  const state =  useSelector(state=>state.user)
  const [error,setError] =  useState("")
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setError(state.error)

  },[state])
  
  // if (typeof window !== 'undefined' && !!localStorage.getItem("smartway_auth") ) {
  
  //   navigate("/")
    
  // } 

  const startLoginGoogle = async (googleTokenId) => {
    await dispatch(userLoginGoogle(googleTokenId))
  }

  return (
    <>
      <section className="login-money-transfer">
        <h1>{translate('Login & Start Transfer','เข้าสู่ระบบและเริ่มการโอน')}</h1>

  
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         }
         if (!values.password) {
          errors.password = 'Required';
        } 
         return errors;
       }}
       onSubmit={async (values, { setSubmitting }) => {
           setError("")
           setLoading(true)
           await  dispatch(userLogin(values.email,values.password))
           setLoading(false)
           
          
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
          
          
           <div className="login-currency-group currency-group--transfer">
          <div className="currency-input">
            <input 
              placeholder="Username"
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}/>

          </div>
          <div className="error-form">
            {errors.email && touched.email && errors.email}
          </div>
        </div>

        <div className="login-currency-group currency-group--transfer">
          <div className="currency-input">
            <input
             placeholder="Password"
           
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             
             />
          </div>
          <div className="error-form">
            {errors.password && touched.password && errors.password}
          </div>
        </div>
        
        <div class="login-link-holder">

          <Link to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/forgot-password': '/en/forgot-password'}>{translate('Forgot your password?','ลืมรหัสผ่านหรือไม่?')}</Link>
        </div>
      {!!error && <div className="error-check">
        {error}
       </div>
      }
        <div class="login-link-holder">
          <button type="submit" className="btn bold btn--yellow">
            {loading?translate('Please wait ...','โปรดรอ ...') : translate('Login','เข้าสู่ระบบ?')}
          </button>
        </div>
          
         </form>
       )}
     </Formik>
        
        {/* <div className="login-separator"></div> */}
      
      <div class="divider"></div>

        <GoogleLogin
          clientId="544252217290-al01bd8sb7aqqmv9qoahgqsv20tl1eoo.apps.googleusercontent.com"
          buttonText="Login with Google"
          render={renderProps => (
            <div class="login-link-holder login-link-holder--google">
              <button  type="submit" className="transfer__ghost-button btn bold" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <img src={googleLogo} className="google-logo" />
                {translate('Login with Google','เข้าสู่ระบบด้วย Google')}
              </button>
            </div>
          )}
          onSuccess={(e)=>{
            startLoginGoogle(e.tokenId)
          }
          }
          onFailure={(e)=>{console.log(e)}}
          cookiePolicy={'single_host_origin'}
        />
      </section>
      
    </>
  );
};

export default Login;
