


import React, { useEffect, useState } from "react";


import Termspage from "../../graphql/terms"
import ReactMarkdown from "react-markdown"
import {userReister, userReisterGoogle, registerCheckDup, registerGoogleCheckDup} from "../../state/action/login"
import { navigate, Link } from "gatsby" 
import {useDispatch} from "react-redux"
import GoogleLogin from 'react-google-login';

import classNames from "classnames";
import googleLogo from "src/images/icons/google-logo.png";
import crossIcon from "src/images/icons/cross.png";
import { Formik } from 'formik';

import translate from 'src/helpers/language';
var globalvariable = {};
var globalvariableGoogle = {};

const Registration = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !!localStorage.getItem('smartway_auth')) {
      navigate("/")
    }
  })
  const Termspagedata = Termspage()
  const englishCheck= /^[A-Za-z0-9@!#\-$*()_.-`~ ]*$/;
  const [transferModalNormal, showTransferModalNormal] = useState(false);
  const [transferModalGoogle, showTransferModalGoogle] = useState(false);
  const [successMessage, showSuccessMessage] = useState(false);
  const [dupMessage, setDupMessage] = useState('');
  const [googleDupMessage, setGoogleDupMessage] = useState('');
  const dispatch = useDispatch()
  const [error,setError] =  useState("")
  
  const handleModalNormal = () => {
    showTransferModalNormal(!transferModalNormal);
  };

  const checkForDup = async (dupValues) => {

    const checkDup = await dispatch(
      registerCheckDup(dupValues)
    )

    if (checkDup.data.StatusCode != 0) {
      setDupMessage(checkDup.data.Message)
      console.log(checkDup.data.StatusCode)
    } else {
      setDupMessage('')
      handleModalNormal()
    }

    console.log(dupMessage)
    console.log(checkDup)
  }

  const googleCheckForDup = async (googleDupValues) => {

    const checkDupGoogle = await dispatch(
      registerGoogleCheckDup({GoogleIdToken: googleDupValues})
    )

    if (checkDupGoogle.data.StatusCode != 0) {
      setGoogleDupMessage(checkDupGoogle.data.Message)
      console.log(checkDupGoogle.data.StatusCode)
    } else {
      setGoogleDupMessage('')
      handleModalGoogle()
    }

    console.log(googleDupMessage)
    console.log(checkDupGoogle)
  }

  const handleSuccessMessage = async () => {
    
    const response = await dispatch(userReister(globalvariable))
    console.log(response)
   
          
         if(response.data.StatusCode==="0"){
            
              showSuccessMessage(!successMessage);
        
         }else{
          showTransferModalNormal(false);
           setError(response.data.Message)
         }
       
        
        // })
        // .catch(function (error) {
        //   alert("something went wrong")
        // })
    
  }

  const handleSuccessMessageGoogle = async () => {
    
    const response = await dispatch(userReisterGoogle(globalvariableGoogle))
    console.log(response)
   
          
         if(response.data.StatusCode==="0"){
          showTransferModalGoogle(true);
          showSuccessMessage(!successMessage);
         }else{
           setError(response.data.Message)
         }
       
        
        // })
        // .catch(function (error) {
        //   alert("something went wrong")
        // })
    
  }


  const handleModalGoogle = () => {
    showTransferModalGoogle(true);
  };

  const handleCancelGoogleModal = () => {
    showTransferModalGoogle(false);
    showSuccessMessage(false);
  };

  const handleCancelNormalModal = () => {
    showTransferModalNormal(!transferModalNormal);    
    showSuccessMessage(false);
  };


  const modalClasses = classNames(
    "register-transfer__modal--select-account",
    // {
    //   "register-transfer__modal--select-account--small": selectAccount,
    // },
    // {
    //   "register-transfer__modal--select-account--small": alertAmount,
    // },
    // {
    //   "register-transfer__modal--select-account--small": showReasons,
    // }
  );

  return (
    <>
      <section className="register-money-transfer">
        <h2>{translate('Sign Up','ลงชื่อ')}</h2>
        <h3>{translate('Please enter in English','โปรดป้อนภาษาอังกฤษ')}</h3>

       
        <Formik
       initialValues={{ email: '', password: '',username:"", mobile:"", 
          emailCheckDup: '' 
      }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         else if (!englishCheck.test(values.email)) {
          errors.email = 'Please fill in English';
        }
        
        if (!values.password) {
          errors.password = 'Required';
        }
        else if(values.password.length <=5){
          errors.password = 'Password must be 6 chracter long';
        }
        if (!values.username) {
          errors.username = 'Required';
        }
        else if (!englishCheck.test(values.username)) {
          errors.username = 'Please fill in English';
        }
        if (!values.mobile) {
          errors.mobile = 'Required';
        }
        else if (String(values.mobile).length !== 9) {
          errors.mobile = "Number should be like +61XXXXXXXXX"
        }

        


        
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        setError("")
        const dupValues = {
          UserName: values.username,
          Password: values.password,
          Email: values.email,
          PhoneNo: values.mobile
        }
        checkForDup(dupValues)
      
        globalvariable = values
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
          
        
          
    
         
           <div className="currency-group currency-group--transfer">
          <div className="currency-input">
            <input placeholder={translate('Username','ชื่อผู้ใช้')}
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            
           
          </div>
          <div className="error-form">

          {errors.username && touched.username && errors.username}
          </div>
        </div>

        <div className="currency-group currency-group--transfer">
          <div className="currency-input">
            <input placeholder={translate('Password','รหัสผ่าน')}
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

        <div className="currency-group currency-group--transfer">
          <div className="currency-input">
            <input placeholder={translate('Email','อีเมล์')}
            
            
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            />
          </div>
          <div className="error-form">

          {errors.email && touched.email && errors.email}
          </div>
        </div>

        <div className="currency-group currency-group--transfer">
          <div className="currency-input relative-currency-prefix">
            <input placeholder={translate('Mobile Number','เบอร์มือถือ')}
            
            type="tel"
            name="mobile"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mobile}
            
            />
            <div className="prefix-mobile">
              +61
              </div>
              
          </div>
          <div className="error-form">

          {errors.mobile && touched.mobile && errors.mobile}
          </div>
        </div>
       
        {!!error && (<div className="error-form">{error}</div>)}
        <div className="registration-link-holder">
          <button type="submit" className="btn bold btn--yellow" >
          {translate('Sign Up','ลงชื่อ')}
          </button>
          
          <div className="error-form">

          {dupMessage}
          </div>
        </div>
       
         </form>
       )}
     </Formik>
    

        <div className="separator"></div>

        <GoogleLogin
          clientId="544252217290-al01bd8sb7aqqmv9qoahgqsv20tl1eoo.apps.googleusercontent.com"
          buttonText="Login with Google"
          render={renderProps => (
            <div class="signup--google">
            <div class="signup--google--left">
            <img src={googleLogo} className="google-logo" />
            {translate('Sign up with your Google account','ลงทะเบียนด้วยบัญชี Google ของคุณ')} 
                </div>
                <div class="signup--google--right">
                  <span
                        className="transfer__ghost-button"
                        onClick={renderProps.onClick}
                      >
                    {translate('Sign up with Google','ลงทะเบียนกับ Google')}   
                      </span>
                </div>
            </div>

            // <div class="login-link-holder login-link-holder--google">
            //   <button  type="submit" className="transfer__ghost-button btn bold" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            //   <img src={googleLogo} className="google-logo" />
            //     {translate('Login with Google','เข้าสู่ระบบด้วย Google')}
            //   </button>
            // </div>
          )}
          onSuccess={(e)=>{
            console.log(e)
            googleCheckForDup(e.tokenId)
            globalvariableGoogle = e.tokenId
            // localStorage.setItem("smartway_auth",e.accessToken)
          }
          }
          onFailure={(e)=>{console.log(e)}}
          cookiePolicy={'single_host_origin'}
        />

        {/* <div class="signup--google">
          <div class="signup--google--left">
        <img src={googleLogo} className="google-logo" />
        {translate('Sign up with your Google account','ลงทะเบียนด้วยบัญชี Google ของคุณ')} 
            </div>
            <div class="signup--google--right">
              <span
                    className="transfer__ghost-button"
                    onClick={handleModalGoogle}
                  >
                 {translate('Sign up with Google','ลงทะเบียนกับ Google')}   
                  </span>
            </div>
        </div> */}
      </section>
      {transferModalNormal && (
        <div className="register-transfer__modal">
          <div className={modalClasses}>
            <div className="register-transfer__modal--cross" onClick={handleModalNormal}>
              <img src={crossIcon} className="register-transfer__modal--cross-img" />
            </div>
            {!successMessage && (
              <>
            <h2> {translate('Terms','ยอมเงื่อนไขรับ')}   &amp; {translate('Conditions','เงื่อนไข')}   </h2>
            <div class="terms">
              <ReactMarkdown
                source={
                  Termspagedata.allMarkdownRemark.nodes[0].frontmatter.terms_content
                }
              />
            </div>
              <a class="btn bold btn--blue" onClick={handleSuccessMessage}>
              {translate('Accept','ยอมรับ')}  
              </a>
            <span
                  className="transfer__ghost-button"
                  onClick={handleCancelNormalModal}
                >
            {translate('Decline','ลดลง')}
            </span>
            </>
            )}
            {successMessage && (
              <>
              <h2>{translate('Registration Successful','การลงทะเบียนสำเร็จ')}</h2>
              <p>{translate('A confirmation e-mail has been sent to you. If it has not arrived in your inbox, check your junk mail. Please click the link in the e-mail to complete registration.','ส่งอีเมลยืนยันถึงคุณแล้ว หากยังไม่มาถึงกล่องจดหมายของคุณให้ตรวจสอบเมลขยะของคุณ กรุณาคลิกลิงก์ในอีเมลเพื่อลงทะเบียนให้เสร็จสมบูรณ์')}</p>
                <a class="btn bold btn--blue" onClick={()=>navigate(typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login': '/en/login')}>
                {translate('Okay','ตกลง')}  
                </a>
              <span
                    className="transfer__ghost-button"
                    onClick={handleCancelNormalModal}
                  >
                 {translate('Decline','ลดลง')}  
              </span>
              </>
            )}
          </div>
        </div>)}

        {transferModalGoogle && (
        <div className="register-transfer__modal">
          <div className={modalClasses}>
            <div className="register-transfer__modal--cross" onClick={handleModalGoogle}>
              <img src={crossIcon} className="register-transfer__modal--cross-img" />
            </div>
            {!successMessage && (
              <>
              <h2>{translate('','')} &amp; {translate('','')} {translate('Conditions','เงื่อนไข')}  </h2>
              <div class="terms">
                <ReactMarkdown
                  source={
                    Termspagedata.allMarkdownRemark.nodes[0].frontmatter.terms_content
                  }
                />
              </div>
                <a class="btn bold btn--blue" onClick={handleSuccessMessageGoogle}>
                {translate('Accept','ยอมรับ')}   
                </a>
              <span
                    className="transfer__ghost-button"
                    onClick={handleCancelGoogleModal}
                  >
                  {translate('Decline','ลดลง')}   
              </span>
              </>
            )}
            {successMessage && (
              <>
              <h2>{translate('Registration Successful','การลงทะเบียนสำเร็จ')}</h2>
            <p>Your registration has been confirmed. Please log in to continue</p>

            <a class="btn bold btn--yellow" onClick={()=>navigate(typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login': '/en/login')}>
                {translate('Login','ตกลง')}  
                </a>
              <span
                    className="transfer__ghost-button"
                    onClick={handleCancelGoogleModal}
                    style={{'display': "inline-block", 'marginLeft': "15px", "width": "240px"}}
                  >
                {translate('Cancel','ลดลง')}    
              </span>
              </>
            )}
          </div>
        </div>)}
      
    </>
  );
};

export default Registration;
