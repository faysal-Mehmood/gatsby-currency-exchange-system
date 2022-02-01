import React, { useState, useEffect } from "react";
import { Formik } from 'formik';
import translate from 'src/helpers/language';
import {useSelector,useDispatch} from "react-redux"

import classNames from "classnames";
import crossIcon from "src/images/icons/cross.png";
import {resetPass} from '../../state/action/login'
import Swal from 'sweetalert2'


const ForgotPassword = () => {
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
            <h2>{translate('Password Reset Requested','ร้องขอการรีเซ็ตรหัสผ่าน')}</h2>
            <p>{translate('We have sent you an email with a link and instructions to reset your password.','เราได้ส่งอีเมลถึงคุณพร้อมลิงก์และคำแนะนำในการรีเซ็ตรหัสผ่านของคุณ')}</p>

            <button
                type="submit"
                className="btn bold btn--yellow"
                onClick={handleConfirmation}
              >
               {translate('OK','ลืมรหัสผ่าน')}
            </button>
          </div>
        </div>
      )}
      <section className="login-money-transfer">

      

        <h1>{translate('Forgot Password','ลืมรหัสผ่าน')}</h1>
        <p>{translate("Can't remember your password? Enter your e-mail address and we'll send you a link to reset it.",'จำรหัสผ่านของคุณไม่ได้? ป้อนที่อยู่อีเมลของคุณแล้วเราจะส่งลิงค์ไปให้คุณเพื่อรีเซ็ต')}</p>

  
        <Formik
       initialValues={{ email: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        
         return errors;
       }}
       onSubmit={async (values) => {
           Swal.showLoading()
           const forgetResponse = await  dispatch(resetPass(values.email))
           console.log(forgetResponse)
           Swal.close()
           if(forgetResponse.data.StatusCode=='0'){
            handleConfirmation()
           } else {
            Swal.fire(forgetResponse.data.Message)
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
         <form onSubmit={
          handleSubmit

         // 
         }>
          
         
           <div className="login-currency-group currency-group--transfer">
          <div className="currency-input">
            <input 
              placeholder="Enter your email address"
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
        <div class="login-link-holder">
          <button type="submit" className="btn bold btn--yellow" >
          {translate('Submit','ดำเนินการต่อ')}
          </button>
        </div>
          
         </form>
       )}
     </Formik>
        
      </section>
      
    </>
  );
};

export default ForgotPassword;
