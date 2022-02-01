import React, { useState, useEffect } from "react";
import { Formik } from 'formik';
import { Link } from "gatsby";

import queryString from 'query-string'
import {passwordchange, resetpassword} from "../../state/action/login"
import GoogleLogin from 'react-google-login';
import {useSelector,useDispatch} from "react-redux"
import { navigate } from "gatsby" 
import googleLogo from "src/images/icons/google-logo.png";
import classNames from "classnames";
import crossIcon from "src/images/icons/cross.png";
import Swal from 'sweetalert2'

const ForgotPasswordTwo = () => {
  const dispatch = useDispatch()
  const state =  useSelector(state=>state.user)
  const [error,setError] =  useState("")

  const [confirmation, showConfirmation] = useState(false);
  const modalClasses = classNames("register-transfer__modal--select-account");

  const handleConfirmation = () => {
    showConfirmation(!confirmation);
  };

  useEffect(()=>{
    setError(state.error)

  },[state])
  return (
    <>

{confirmation && (
        <div className="transfer__modal transfer__modal--forgotpassword">
          <div className={modalClasses}>
            <div className="transfer__modal--cross" onClick={handleConfirmation}>
              <img src={crossIcon} className="transfer__modal--cross-img" />
            </div>
            <h2>Success!</h2>
            <p>You have successfully reset your password. Please log in again to continue.</p>

            <Link
                type="submit"
                className="btn bold btn--yellow"
                to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login': '/en/login'}
              >
                Login
            </Link>
          </div>
        </div>
      )}
      <section className="login-money-transfer">

      

        <h1>Reset Password</h1>
        <p>Reset your password. Passwords must be at least 6 characters long.</p>

  
        <Formik
       initialValues={{ password1: '', password2: '' }}
       validate={values => {
         const errors = {};
         if (!values.password1) {
           errors.password1 = 'Required';
         }
         if (!values.password2) {
          errors.password2 = 'Required';
        } 
         return errors;
       }}
       onSubmit={async (values) => {
        Swal.showLoading()
        const parseQuery = typeof window !== 'undefined' && queryString.parse(window.location.search)
        const resetToken = parseQuery.token
        console.log(resetToken)
        // const loginToken = typeof window !== 'undefined' && localStorage.getItem("smartway_auth") 
        const response =  await dispatch(resetpassword(resetToken, values.password1, values.password2)) 
        Swal.close()  
        if(response.data.StatusCode==="0"){
            handleConfirmation()
            
        }
        else if (response.data.StatusCode==="01") {
            Swal.fire({
                title: response.data.Message,
                text: "Please try to login again.",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("smartway_auth")
                    window.location.href = "/login";
                }
              })
        }
        else{
            
          Swal.fire(response.data.Message)
        }
          
           
          
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
              placeholder="Enter a new password"
              type="password"
              name="password1"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password1}/>

          </div>
          <div className="error-form">
            {errors.password1 && touched.password1 && errors.password1}
          </div>
          <div className="currency-input currency-input-resetpassword" style={{marginTop: '30px'}}>
            <input 
              placeholder="Re-enter your new password"
              type="password"
              name="password2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password2}/>

          </div>
          <div className="error-form">
            {errors.password2 && touched.password2 && errors.password2}
          </div>
        </div>
        <div class="login-link-holder">
          <button type="submit" className="btn bold btn--yellow" >
            Continue
          </button>
        </div>
          
         </form>
       )}
     </Formik>
        
      </section>
      
    </>
  );
};

export default ForgotPasswordTwo;
