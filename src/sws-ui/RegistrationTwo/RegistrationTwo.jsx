import React, { useState, useEffect, useRef } from "react"
import { Upload, AutoComplete } from "antd"
import { Login } from "src/sws-ui"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Resizer from "react-image-file-resizer"
import { Link } from "gatsby"
import "antd/dist/antd.css"
import { navigate } from "gatsby"
import { getProfile3 } from '../../state/action/profile'

import {
  editProfile,
  mobileOtp,
  submitEditinfo,
  submitUploadInfo,
  editPersonal,
  getPlaceId,
  searchaddressplaces,
} from "../../state/action/login"
import {
  nationalityAll,
  titleAll,
  getGender,
  FrequencyOfTransfer,
  Occupation,
  allSalary,
  ConvenientTimeToContact,
} from "../../state/action/currency"
import { editAddress } from "../../state/action/profile"
import translate from "src/helpers/language"
import classNames from "classnames"
import Swal from "sweetalert2"

var globalvariable = {}

const RegistrationTwo = () => {
  const uploadImges = useRef()
  const uploadImges1 = useRef()
  const uploadImges2 = useRef()
  const uploadImges3 = useRef()
  const addressoption = useRef()

  const opt1 = useRef()
  const opt2 = useRef()
  const opt3 = useRef()
  const opt4 = useRef()
  const opt5 = useRef()
  const opt6 = useRef()

  const [uploadImg, setUploadImg] = useState("")
  const [uploadedImg, setUploadedImg] = useState(false)
  const [uploadImg1, setUploadImg1] = useState("")
  const [uploadedImg1, setUploadedImg1] = useState(false)
  const [uploadImg2, setUploadImg2] = useState("")
  const [uploadedImg2, setUploadedImg2] = useState(false)
  const [uploadImg3, setUploadImg3] = useState("")
  const [uploadedImg3, setUploadedImg3] = useState(false)
  const [addressBar, showAddressBar] = useState(true)
  const [transferModalNormal, showTransferModalNormal] = useState(false)
  const [transferModalGoogle, showTransferModalGoogle] = useState(false)
  const [accountDetails, setAccountDetails] = useState(true)
  const [address, setAddress] = useState(false)
  const [identification, setIdentification] = useState(false)
  const [personalDetails, setPersonalDetails] = useState(false)
  const [errorPlace, setErrorPlace] = useState(false);
  const [complete, setComplete] = useState(false)
  const [step1active, setStep1active] = useState(true)
  const [step2active, setStep2active] = useState(false)
  const [step3active, setStep3active] = useState(false)
  const [step4active, setStep4active] = useState(false)
  const [line1active, setLine1active] = useState(false)
  const [line2active, setLine2active] = useState(false)
  const [line3active, setLine3active] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [searchAddress, setSearchAddress] = useState("")
  const [options, setOptions] = useState([{ value: "a" }])
  const [successMessage, showSuccessMessage] = useState(false)
  const [poiValue, setPoiValue] = useState('')
  const [poaValue, setPoaValue] = useState('')
  const [poiId, setPoiId] = useState()
  const [poaId, setPoaId] = useState()
  const [placesid, setplacesid] = useState([])
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const englishCheck = /^[A-Za-z0-9@%+,><|'"!#$\-*/\()_.~ ]*$/

  const allProfiles = useSelector(state => state.currency)
  const getProfileStatus = useSelector(state => state.profile)
  const getUserInfo = useSelector(state => state.user?.userData)

  const [otpConfirm, setOtpConfirm] = useState(false)
  const [setFirstOtpConfirm, firstOtpConfirm] = useState(false)

  const [initialValues, setInitialValues] = useState({
    username: getProfileStatus?.profile?.Username,
    password: "",
    email: getProfileStatus?.profile?.Email,
    mobile: getProfileStatus?.profile?.PhoneNo,
    title: getProfileStatus?.profile?.TitleId,
    firstName: getProfileStatus?.profile?.FirstName,
    middleName: getProfileStatus?.profile?.MiddleName,
    lastName: getProfileStatus?.profile?.LastName,
    dob: getProfileStatus?.profile?.BirthDateISO,
    nationality: getProfileStatus?.profile?.NationalityId,
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  })

  const [addressInitialValues, setAddressInitialValues] = useState({
    unit: getProfileStatus?.profile?.AusUnitNumber || "",
    street_number: getProfileStatus?.profile?.AusStreetNumber || "",
    street_name: getProfileStatus?.profile?.AusStreetName || "",
    street_type: getProfileStatus?.profile?.AusStreetType || "",
    suburb: getProfileStatus?.profile?.AusSuburb || "",
    state: getProfileStatus?.profile?.AusState || "",
    postcode: getProfileStatus?.profile?.AusPostalCode || "",
    country: "AU",
    address: "",
  })

  const [uploadInitialValues, setUploadInitialValues] = useState({
    
    MemberDocumentTypeId_poi: poiId,
    DocumentNo_poi: getProfileStatus?.profile?.PassportNo,
    DocumentExpireDateISO_poi:
      getProfileStatus?.profile?.PassportNoExpireDateISO,
    DocumentIssue_poi: getProfileStatus?.profile?.PassportIssuer,
    DocumentBase64_poi:
      getProfileStatus?.profile?.PassportHyperLink,
    DocumentName_poi: "",

    MemberDocumentTypeId_poa: poaId,
    DocumentNo_poa: getProfileStatus?.profile?.DrivingLicenseTH,
    DocumentExpireDateISO_poa:
      getProfileStatus?.profile?.DrivingLicenseTHExpireDateISO,
    DocumentIssuer_poa:
      getProfileStatus?.profile?.DrivingLicenseThIssuer,
    DocumentBase64_poa:
      getProfileStatus?.profile?.DriverLicenseThHyperLink,
    DocumentName_poa: "",
    DocumentBackBase64_poa:
      getProfileStatus?.profile?.DriverLicenseThBackHyperLink,
    DocumentBackName_poa: "",
  })

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !!localStorage.getItem("smartway_auth")
    ) {
      if (
        getProfileStatus.profile.MemberStatusId === 1 &&
        getProfileStatus.profile.MemberProfileStatusId === null
      ) {
      } else if (
        getProfileStatus.profile.MemberStatusId === 1 &&
        getProfileStatus.profile.MemberProfileStatusId === 4
      ) {
      } else if (
        getProfileStatus.profile.MemberStatusId === 1 &&
        getProfileStatus.profile.MemberProfileStatusId === 5
      ) {
      } else if (
        getProfileStatus.profile.MemberStatusId === 1 &&
        getProfileStatus.profile.MemberProfileStatusId === 1
      ) {
      } else if (!getProfileStatus.loader) {
         navigate('/')
      }
    } else {
       navigate(typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/register' : '/en/register')
    }
    setUploadImg(getProfileStatus?.profile?.PassportHyperLink)
    setUploadImg1(getProfileStatus?.profile?.DriverLicenseThHyperLink)
    setUploadImg2(getProfileStatus?.profile?.DriverLicenseThBackHyperLink)
  }, [getProfileStatus])

  useEffect(() => {
    if (getProfileStatus?.profile?.RegisterStep === "EditAccountInfo") {
      setAccountDetails(true)
      setAddress(false)
      setIdentification(false)
      setPersonalDetails(false)

      setStep1active(true)
      setStep2active(false)
      setStep3active(false)
      setStep4active(false)
      setLine1active(false)
      setLine2active(false)
      setLine3active(false)
    } else if (getProfileStatus?.profile?.RegisterStep === "EditAddress") {
      setAccountDetails(false)
      setAddress(true)
      setIdentification(false)
      setPersonalDetails(false)

      setStep1active(true)
      setStep2active(true)
      setStep3active(false)
      setStep4active(false)
      setLine1active(true)
      setLine2active(false)
      setLine3active(false)
    } else if (getProfileStatus?.profile?.RegisterStep === "UploadDocument") {
      setAccountDetails(false)
      setAddress(false)
      setIdentification(true)
      setPersonalDetails(false)

      setStep1active(true)
      setStep2active(true)
      setStep3active(true)
      setStep4active(false)
      setLine1active(true)
      setLine2active(true)
      setLine3active(false)
    } else if (
      getProfileStatus?.profile?.RegisterStep === "EditPersonalDetail"
    ) {
      setAccountDetails(false)
      setAddress(false)
      setIdentification(false)
      setPersonalDetails(true)

      setStep1active(true)
      setStep2active(true)
      setStep3active(true)
      setStep4active(true)
      setLine1active(true)
      setLine2active(true)
      setLine3active(true)
    }
  }, [getProfileStatus])

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const showErrorPlace = () => {
    setErrorPlace(true);
  };
  
  const hideErrorPlace = () => {
    setErrorPlace(false);
  };

  const handleModalNormal = () => {
    showTransferModalNormal(!transferModalNormal)
  }

  const handleAddressBar = () => {
    showAddressBar(!addressBar)
  }

  const fileChangedHandler = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        900,
        900,
        "JPEG",
        100,
        0,
        uri => {
          resolve(uri)
        },
        "base64"
      )
    })

  useEffect(() => {
    dispatch(getGender())
    dispatch(Occupation())
    dispatch(allSalary())
    dispatch(FrequencyOfTransfer())
    dispatch(ConvenientTimeToContact())
    dispatch(titleAll())
    dispatch(nationalityAll())
  }, [])

  const handleModalGoogle = () => {
    showTransferModalGoogle(!transferModalGoogle)
  }

  const handleCancelGoogleModal = () => {
    showTransferModalGoogle(!transferModalGoogle)
    showSuccessMessage(false)
  }

  const handleCancelNormalModal = () => {
    showTransferModalNormal(!transferModalNormal)
    showSuccessMessage(false)
  }

  const getAccountDetails = () => {
    console.log('OTP CONFIRM: ')
    console.log(otpConfirm)
    setplacesid([])
    setStep2active(false)
    setStep1active(true)
    setLine1active(false)
    setLine2active(false)
    setIdentification(false)
    setAddress(false)
    setAccountDetails(true)
  }

  const getAddress = () => {
    setOpenModel(false)
    setStep2active(true)
    setLine1active(true)
    setStep3active(false)
    setLine2active(false)
    setIdentification(false)
    setAddress(true)
    setAccountDetails(false)
  }

  const getIdentification = () => {
    setStep4active(false)
    setLine3active(false)
    setStep3active(true)
    setLine2active(true)
    setIdentification(true)
    setPersonalDetails(false)
    setAddress(false)
  }

  const getPersonal = () => {
    setStep4active(true)
    setLine3active(true)
    setPersonalDetails(true)
    setIdentification(false)
  }

  const getComplete = () => {
    setStep4active(true)
    setLine3active(true)
    setPersonalDetails(false)
    setComplete(true)
    showTransferModalNormal(true)
  }

  const handleUploadedImg = file => {
    setUploadedImg(!uploadedImg)
  }

  const handleUploadedImg1 = () => {
    setUploadedImg1(!uploadedImg1)
  }

  const handleUploadedImg2 = () => {
    setUploadedImg2(!uploadedImg2)
  }
  const handleUploadedImg3 = () => {
    setUploadedImg3(!uploadedImg3)
  }

  const modalClasses = classNames("register-transfer__modal--select-account")

  const errorPlaceClasses = classNames("errorPlace", {
    "errorPlaceShow": errorPlace,
  });


  const step1Classes = classNames("step", {
    "step-active": step1active,
  })

  const line1Classes = classNames("line", {
    "line-active": line1active,
  })

  const step2Classes = classNames("step", {
    "step-active": step2active,
  })

  const line2Classes = classNames("line", {
    "line-active": line2active,
  })

  const step3Classes = classNames("step", {
    "step-active": step3active,
  })

  const line3Classes = classNames("line", {
    "line-active": line3active,
  })

  const step4Classes = classNames("step", {
    "step-active": step4active,
  })

  const uploadClasses = classNames(
    "currency-input currency-group--transfer currency-input--upload",
    {
      "currency-input--upload-active": uploadedImg,
    }
  )

  const uploadClasses1 = classNames(
    "currency-input currency-group--transfer currency-input--upload",
    {
      "currency-input--upload-active": uploadedImg1,
    }
  )

  const uploadClasses2 = classNames(
    "currency-input currency-group--transfer currency-input--upload",
    {
      "currency-input--upload-active": uploadedImg2,
    }
  )

  // const nationalityRef = useRef(null);

  // const showNationalitySelect = () => {
  //   console.log(nationalityRef.current)
  //   nationalityRef.current.focus()
  // }

  return (
    <>
      <section className="register-money-transfer">
        {!complete && (
          <>
            <div class="step--holder">
              <div className={step1Classes}></div>
              <div className={line1Classes}></div>
              <div className={step2Classes}></div>
              <div className={line2Classes}></div>
              <div className={step3Classes}></div>
              <div className={line3Classes}></div>
              <div className={step4Classes}></div>
            </div>
            <div className="step-name--holder">
              <div className="step-name">{translate("Account", "การระบุ")}</div>
              <div className="step-name">{translate("Address", "ที่อยู่")}</div>
              <div className="step-name">
                {translate("Identification", "การระบุ")}
              </div>
              <div className="step-name">
                {translate("Other Details", "รายละเอียดอื่น ๆ")}
              </div>
            </div>
          </>
        )}

        {accountDetails && (
          <>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validate={values => {
                const errors = {}

                // if (!values.email) {
                //   errors.email = "Required";
                // } else if (
                //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                //   errors.email = "Invalid email address";
                // }

                // if (!values.username) {
                //   errors.username = "Required";
                // }
                // if (!values.password) {
                //   errors.password = "Required";
                // }
                // else if (values.password.length <= 5) {
                //   errors.password = "Password must be 6 chracter long";
                // }

                if (!values.mobile) {
                  errors.mobile = "Required"
                } else if (String(values.mobile).length !== 9) {
                  errors.mobile = "Number should be like +61XXXXXXXXX"
                } else if (!englishCheck.test(values.mobile)) {
                  errors.mobile =
                    "Please fill in English"
                }

                if (!englishCheck.test(values.middleName)) {
                  errors.middleName =
                    "Please fill in English"
                }

                if (!values.title) {
                  errors.title = "Required"
                }
                if (!values.firstName) {
                  errors.firstName = "Required"
                } else if (!englishCheck.test(values.firstName)) {
                  errors.firstName =
                    "Please fill in English"
                }
                // if (!values.middleName) {
                //   errors.middleName = "Required";
                // }
                if (!values.lastName) {
                  errors.lastName = "Required"
                } else if (!englishCheck.test(values.lastName)) {
                  errors.lastName =
                    "Please fill in English"
                }
                if (!values.dob) {
                  errors.dob = "Required"
                  // } else {
                  //   var now = new Date()

                  //   var donow = new Date(values.dob)
                  //   console.log(
                  //     now.getFullYear(),
                  //     donow.getFullYear(),
                  //     values.dob
                  //   )
                  //   // if (donow.getFullYear() >= now.getFullYear()) {
                  //     errors.dob = "Date is invalid"
                  //   }
                }
                if (!values.nationality) {
                  errors.nationality = "Required"
                }

                return errors
              }}
              onSubmit={async (values, { setSubmitting }) => {
                // setError("");
                // handleModalNormal();
                // const hasMobilePrefix = values.mobile.substring(0,3)
                // if (hasMobilePrefix != '+61') {
                //   const mobile = '+61' + values.mobile
                //   values.mobile = mobile
                //   console.log(`new mobile is ${values.mobile}`)
                // }           
                values.username = getProfileStatus.profile?.Username
                values.email = getProfileStatus.profile?.Email
                console.log(values.email)
                // Swal.showLoading()
                console.log('OTP CONFIRM: ')
                console.log(otpConfirm)
                if (
                  ((getProfileStatus.profile?.IsComfirmPhoneNo == false) && (otpConfirm == false))
                  || (getProfileStatus?.profile?.PhoneNo != values.mobile)  
                ) {
                  await dispatch(
                    mobileOtp(
                      parseInt(localStorage.getItem("smartway_user_info")),
                      values.mobile
                    )
                  )
                  Swal.close()
                  setOpenModel(true)
                } else {
                  const accountInfoData = await submitEditinfo(values)
                  
                  if (accountInfoData.data.StatusCode === "0") {
                    setInitialValues(values)
                    getAddress()
                  } else {
                    Swal.fire(accountInfoData.data.Message)
                  }
                }
                
                globalvariable = values
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div></div>
                  <h2>{translate("Account Details", "รายละเอียดบัญชี")}</h2>
                  <div className="currency-group currency-group--transfer">
                    <div className="currency-input">
                      <input
                        placeholder="Username"
                        type="text"
                        name="username"
                        //onChange={handleChange}
                        //onBlur={handleBlur}
                        value={getProfileStatus.profile?.UserName}
                        disabled
                      />
                    </div>
                    <div className="error-form">
                      {errors.username && touched.username && errors.username}
                    </div>
                  </div>

                  {/* <div className="currency-group currency-group--transfer">
                    <div className="currency-input">
                      <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        //onChange={handleChange}
                        //onBlur={handleBlur}
                        value={values.password}
                        disable
                        
                      />
                    </div>
                    {errors.password && touched.password && errors.password}
                  </div> */}

                  <div className="currency-group currency-group--transfer">
                    <div className="currency-input">
                      <input
                        placeholder="Email"
                        //type="email"
                        //name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={getProfileStatus.profile?.Email}
                        disabled
                      />
                    </div>
                    <div className="error-form">
                      {errors.email && touched.email && errors.email}
                    </div>
                  </div>

                  <div className="currency-group currency-group--transfer">
                    <div className="currency-input relative-currency-prefix mobile-input-class">
                      <input
                        placeholder="Mobile No. (+614XXXXXXXX)"
                        type="number"
                        name="mobile"
                        onChange={(e) => {
                          handleChange(e)
                          console.log(e.value)
                          console.log(initialValues.mobile)
                            // if(e.value != initialValues.mobile) {
                            //   setFirstOtpConfirm(false)
                            // }
                          }
                        }
                        onBlur={handleBlur}
                        value={values.mobile}
                      />
                      <div className="prefix-mobile">+61</div>
                    </div>
                    <div className="error-form">
                      {errors.mobile && touched.mobile && errors.mobile}
                    </div>
                  </div>
                  <h2>{translate("Personal Details", "ข้อมูลส่วนตัว")}</h2>
                  <div>
                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                        >
                          <option selected value="">
                            Select Title
                          </option>
                          {allProfiles.title &&
                            allProfiles.title.map(occ => {
                              return (
                                <option value={occ.TitleId}>
                                  {occ.TitleName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.title && touched.title && errors.title}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="First Name"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                      </div>
                      <div className="error-form">
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Middle Name"
                          type="text"
                          name="middleName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.middleName}
                        />
                      </div>
                      <div className="error-form">
                        {errors.middleName &&
                          touched.middleName &&
                          errors.middleName}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Last Name"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                      </div>
                      <div className="error-form">
                        {errors.lastName && touched.lastName && errors.lastName}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon calendar-icon"></div>

                        <div className="currency-input">
                          <input
                            placeholder="Datea of Birth"
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dob ? values.dob.substring(0,10) : values.dob}
                            // value={new Date().toISOString().split('T')[0]}
                            // min="9/10/2018"
                            max={
                              new Date(
                                new Date().valueOf() - 1000 * 60 * 60 * 24
                              )
                                .toISOString()
                                .split("T")[0]
                            }
                          />
                        </div>
                      </div>
                      <div className="error-form">
                        {errors.dob && touched.dob && errors.dob}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input currency-input--selectwrapper">
                        <select
                          id="nationality"
                          name="nationality"
                          value="Nationality"
                          name="nationality"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nationality}
                        >
                          <option selected value="">
                            Select Nationality
                          </option>
                          {allProfiles.nationality &&
                            allProfiles.nationality.map(occ => {
                              return (
                                <option value={occ.NationalityId}>
                                  {occ.NationalityName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.nationality &&
                          touched.nationality &&
                          errors.nationality}
                      </div>
                        
                    </div>
                  </div>
                  {!!error && <div className="error-form">{error}</div>}
                  <div class="registration-link-holder">
                    <button
                      type="submit"
                      className="btn bold btn--yellow"
                      // onClick={getAddress}
                    >
                      {translate("Submit and Continue", "ส่งและดำเนินการต่อ")}
                    </button>
                  </div>
                  <Modal open={openModel} onClose={() => setOpenModel(false)}>
                    
                    <h2>Phone Number Verification</h2>
                    <p>Enter 6 digits OTP sent to +61{values.mobile}</p>
                    <div className="otp-inputs">
                      <input
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp1"
                        onChange={e => {
                          handleChange(e)
                        }}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                          } else {
                            opt2.current.focus()
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.otp1}
                        ref={opt1}
                      />
                      <input
                        ref={opt2}
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp2"
                        onChange={e => {
                          handleChange(e)
                        }}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                            opt1.current.focus()
                            opt1.current.select()
                          } else {
                            opt3.current.focus()
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.otp2}
                      />
                      <input
                        ref={opt3}
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp3"
                        onChange={e => {
                          handleChange(e)
                        }}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                            opt2.current.focus()
                            opt2.current.select()
                          } else {
                            opt4.current.focus()
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.otp3}
                      />
                      <input
                        ref={opt4}
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp4"
                        onChange={e => {
                          handleChange(e)
                        }}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                            opt3.current.focus()
                            opt3.current.select()
                          } else {
                            opt5.current.focus()
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.otp4}
                      />
                      <input
                        ref={opt5}
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp5"
                        onChange={e => {
                          handleChange(e)
                        }}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                            opt4.current.focus()
                            opt4.current.select()
                          } else {
                            opt6.current.focus()
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.otp5}
                      />
                      <input
                        ref={opt6}
                        type="text"
                        maxlength="1"
                        style={{width: '40px', fontSize: '24px'}}
                        name="otp6"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp6}
                        onKeyUp={({ key }) => {
                          if (key === "Backspace") {
                            opt5.current.focus()
                            opt5.current.select()
                          }
                        }}
                      />
                    </div>
                    <div
                      className="btn-send-otp"
                      style={{cursor: 'pointer'}}
                      onClick={async () => {
                        await dispatch(
                          mobileOtp(
                            parseInt(
                              localStorage.getItem("smartway_user_info")
                            ),
                            values.mobile
                          )
                        )
                        values.otp1 = ''
                        values.otp2 = ''
                        values.otp3 = ''
                        values.otp4 = ''
                        values.otp5 = ''
                        values.otp6 = ''
                        // setOpenModel(false)
                        
                          
                        Swal.fire({
                          title: "Resent OTP successfully.",
                          icon: "success",
                        })
                      }
                    }
                    >
                      Resend OTP
                    </div>
                    <div
                      className="btn-send-otp"
                      onClick={async () => {
                        Swal.showLoading()
                        const otpVerify = await submitEditinfo(values)

                        if (otpVerify.data.StatusCode === "0") {
                          Swal.close()
                          setOtpConfirm(true)
                          setInitialValues(values)
                          getAddress()
                          // setFirstOtpConfirm(true)
                          values.otp1 = ''
                          values.otp2 = ''
                          values.otp3 = ''
                          values.otp4 = ''
                          values.otp5 = ''
                          values.otp6 = ''
                        } else {
                          Swal.fire(otpVerify.data.Message)
                          // getAddress()
                        }
                      }}
                    >
                      Ok
                    </div>
                  </Modal>
                </form>
              )}
            </Formik>
          </>
        )}

        {address && (
          <>
            <h2>{translate("Address", "ที่อยู่")}</h2>
            <p>{translate("(Australian Address)", "(ที่อยู่ออสเตรเลีย)")}</p>

            <Formik
              enableReinitialize={true}
              initialValues={addressInitialValues}
              validate={values => {
                const errors = {}
                if (!values.street_name) {
                  errors.street_name = "Required"
                } else if (!englishCheck.test(values.street_name)) {
                  errors.street_name =
                    "Please fill in English"
                }

                if (!values.state) {
                  errors.state = "Required"
                } else if (!englishCheck.test(values.state)) {
                  errors.state =
                    "Please fill in English"
                }

                if (!values.street_number) {
                  errors.street_number = "Required"
                } else if (!englishCheck.test(values.street_number)) {
                  errors.street_number =
                    "Please fill in English"
                }

                if (!englishCheck.test(values.unit)) {
                  errors.unit =
                    "Please fill in English"
                }

                if (!values.street_type) {
                  errors.street_type = "Required"
                } else if (!englishCheck.test(values.street_type)) {
                  errors.street_type =
                    "Please fill in English"
                }

                if (!values.suburb) {
                  errors.suburb = "Required"
                } else if (!englishCheck.test(values.suburb)) {
                  errors.suburb =
                    "Please fill in English"
                }

                if (!values.postcode) {
                  errors.postcode = "Required"
                } else if (!englishCheck.test(values.postcode)) {
                  errors.postcode =
                    "Please fill in English"
                }
                return errors
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setError("")

                // handleModalNormal()
                // Swal.showLoading()
                const valueresult = await editAddress(values)
                if (valueresult.data.StatusCode === "0") {
                  Swal.close()
                  getPersonal()
                } else {
                  Swal.fire(valueresult.data.Message)
                }
                setplacesid([])
                setAddressInitialValues(values)
                getIdentification()
                console.log(values)
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
                setFieldValue,
                resetForm,
                /* and other goodies */
              }) => (
                <>
                  {addressBar && (
                    <div className="currency-group currency-group--transfer currency-group--transfer--full">
                      <div className="currency-input">
                        <div class="registration--input-icon registration--search"></div>

                        <input
                          placeholder="Search Address "
                          type="text"
                          name="address"
                          onBlur={handleBlur}
                          onChange={async e => {
                            if (addressoption.current) {
                              addressoption.current.style.display = "block"
                            }
                            handleChange(e)
                            const result = await getPlaceId(e.target.value)
                            console.log(result)
                            setplacesid(result.data.predictions)
                          }}
                          value={values.address}
                          onBlur={handleBlur}
                        />
                      </div>

                      {placesid.map(data => {
                        return (
                          <div ref={addressoption} className="address-fill">
                            {" "}
                            <p
                              onClick={async () => {
                                setFieldValue("unit", "")
                                setFieldValue("street_name", "")
                                setFieldValue("street_type", "")
                                setFieldValue("state", "")
                                setFieldValue("postcode", "")
                                setFieldValue("suburb", "")
                                setFieldValue("street_number", "")

                                const finaladdress = await searchaddressplaces(
                                  data.place_id
                                )
                                //console.log(finaladdress.data.adr_address)
                                 if (finaladdress.data.result.address_components[finaladdress.data.result.address_components.findIndex(item => item.types[0] == 'country')].long_name == "Australia") {
                                finaladdress.data.result.adr_address
                                  .split("</span>")
                                  .map(data => {
                                    if (data.includes("street-address")) {
                                      setFieldValue(
                                        "street_name",
                                        data.split(">")[1]
                                      )
                                      setFieldValue(
                                        "street_type",
                                        data.split(">")[1].split(" ")[
                                          data.split(">")[1].split(" ").length -
                                            1
                                        ]
                                      )
                                    } else if (data.includes("region")) {
                                      setFieldValue("state", data.split(">")[1])
                                    } else if (data.includes("postal-code")) {
                                      setFieldValue(
                                        "postcode",
                                        data.split(">")[1]
                                      )
                                    } else if (data.includes("locality")) {
                                      setFieldValue(
                                        "suburb",
                                        data.split(">")[1]
                                      )
                                    }
                                  })
                                finaladdress.data.result.address_components.map(
                                  data => {
                                    if (data.types.includes("street_number")) {
                                      setFieldValue(
                                        "street_number",
                                        data.short_name
                                      )
                                    }

                                    if (data.types.includes("route")) {
                                      setFieldValue(
                                        "street_name",
                                        data.short_name
                                          ?.split(" ")
                                          .slice(
                                            0,
                                            data.short_name?.split(" ")
                                              ?.length - 1
                                          )
                                          ?.join()
                                      )
                                    }

                                    if (data.types.includes("subpremise")) {
                                      setFieldValue("unit", data.short_name)
                                    }
                                    hideErrorPlace();
                            
                   
                                  })} else {
                                    addressoption.current.style.display="none";
                                    showErrorPlace();
                                  }
                                if (addressoption.current) {
                                  addressoption.current.style.display = "none"
                                }
                                // handleAddressBar();
                              }}
                            >
                              {data.description}
                            </p>
                          </div>
                        )
                      })}
                      <>
                        <p className={errorPlaceClasses}>Please enter an Australian Address</p>
                        </>
                    </div>
                  )}

                  {!addressBar && (
                    <button class="transfer__ghost-button transfer__ghost-button--address">
                      Re-enter Address
                    </button>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Unit Number"
                          type="text"
                          name="unit"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.unit}
                        />
                      </div>
                      <div className="error-form">
                        {errors.unit && touched.unit && errors.unit}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Street Number"
                          type="text"
                          name="street_number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.street_number}
                        />
                      </div>
                      <div className="error-form">
                        {errors.street_number &&
                          touched.street_number &&
                          errors.street_number}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Street name"
                          type="text"
                          name="street_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.street_name}
                        />
                      </div>
                      <div className="error-form">
                        {errors.street_name &&
                          touched.street_name &&
                          errors.street_name}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Street Type"
                          type="text"
                          name="street_type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.street_type}
                        />
                      </div>
                      <div className="error-form">
                        {errors.street_type &&
                          touched.street_type &&
                          errors.street_type}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Suburb"
                          type="text"
                          name="suburb"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.suburb}
                        />
                      </div>
                    <div className="error-form">
                      {errors.suburb && touched.suburb && errors.suburb}
                    </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="State"
                          type="text"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                        />
                      </div>
                      <div className="error-form">
                        {errors.state && touched.state && errors.state}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Postcode"
                          type="text"
                          name="postcode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.postcode}
                        />
                      </div>
                      <div className="error-for">
                        {errors.postcode && touched.postcode && errors.postcode}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Australia"
                          disabled
                          type="text"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    {!!error && <div className="error">{error}</div>}
                    <div class="registration-link-holder">
                      <span
                        class="transfer__ghost-button"
                        onClick={() => {
                          setAddressInitialValues(values)
                          getAccountDetails()
                        }}
                      >
                        Back
                      </span>
                      <button
                        type="submit"
                        className="btn bold btn--yellow"
                        // onClick={getIdentification}
                      >
                        {translate("Submit and Continue", "ส่งและดำเนินการต่อ")}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </>
        )}

        {identification && (
          <>
            <h2>{translate("Identification", "การระบุ")}</h2>
            <p>{translate("Proof of Identity", "หลักฐานประจำตัว")}</p>

            <Formik
              enableReinitialize={true}
              initialValues={uploadInitialValues}
              validate={values => {
                const errors = {}
                if (!values.DocumentNo_poi) {
                  errors.DocumentNo_poi = "Required"
                } else if (!englishCheck.test(values.DocumentNo_poi)) {
                  errors.DocumentNo_poi =
                    "Please fill in English"
                }

                // if (!values.DocumentExpireDateISO_poi) {
                //   errors.DocumentExpireDateISO_poi = "Required"
                // }

                var now = new Date()

                var donow = new Date(values.DocumentExpireDateISO_poi)
                var donowpoa = new Date(values.DocumentExpireDateISO_poa)
                console.log(
                  now.getFullYear(),
                  donow.getFullYear(),
                  values.DocumentExpireDateISO_poi
                )
                if (donow <= now) {
                  errors.DocumentExpireDateISO_poi = "Date is invalid"
                }

                if (!values.DocumentBackBase64_poa) {
                  errors.DocumentBackBase64_poa = "Required"
                }

                if (!values.DocumentIssue_poi) {
                  errors.DocumentIssue_poi = "Required"
                } else if (!englishCheck.test(values.DocumentIssue_poi)) {
                  errors.DocumentIssue_poi =
                    "Please fill in English"
                }

                if (!values.DocumentBase64_poi) {
                  errors.DocumentBase64_poi = "Required"
                }

                if (!values.DocumentIssuer_poa && poaValue != "utilitybill") {
                  errors.DocumentIssuer_poa = "Required"
                } else if (!englishCheck.test(values.DocumentIssuer_poa)) {
                  errors.DocumentIssuer_poa =
                    "Please fill in English"
                }
                // if (!values.DocumentExpireDateISO_poa) {
                //   errors.DocumentExpireDateISO_poa = "Required"
                // }
                var now = new Date()

                var donow = new Date(values.dob)
                console.log(
                  now.getFullYear(),
                  donow.getFullYear(),
                  values.DocumentExpireDateISO_poa
                )
                if (poaValue != 'utilitybill' && donowpoa <= now) {
                  errors.DocumentExpireDateISO_poa = "Date is invalid"
                }

                if (!values.DocumentNo_poa) {
                  errors.DocumentNo_poa = "Required"
                } else if (!englishCheck.test(values.DocumentNo_poa)) {
                  errors.DocumentNo_poa =
                    "Please fill in English"
                }
                if (!values.DocumentBase64_poa) {
                  errors.DocumentBase64_poa = "Required"
                }
                // if (!values.DocumentName_poa) {
                //   errors.DocumentName_poa = "Required";
                // }
                if (!values.DocumentBackBase64_poa) {
                  errors.DocumentBackBase64_poa = "Required"
                }
                // if (!values.DocumentBackName_poa) {
                //   errors.DocumentBackName_poa = "Required";
                // }
                return errors
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setError("")
                // handleModalNormal()
                // Swal.showLoading()
                values.MemberDocumentTypeId_poi = poiId
                values.MemberDocumentTypeId_poa = poaId
                console.log('updated values')
                console.log(values)
                const valueresult = await submitUploadInfo(values)
                console.log(valueresult)
                if (valueresult.data.StatusCode === "0") {
                  Swal.close()
                  setUploadInitialValues(values)
                  getPersonal()
                } else {
                  Swal.fire(valueresult.data.Message)
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
                setFieldValue,
                resetForm,
                /* and other goodies */
              }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input currency-input--selectwrapper">
                        <select
                          id="poidocumenttype"
                          name="poidocumenttype"
                          value="Type of Document"
                          onChange={e => {
                            setPoiValue(e.target.value)
                            setPoiId(Number(e.target.options[e.target.selectedIndex].dataset.documentid))
                            console.log(poiId)
                            console.log(Number(e.target.options[e.target.selectedIndex].dataset.documentid))
                            handleChange(e)
                          }}
                          onBlur={handleBlur}
                          value={values.nationality}
                        >
                          <option selected value="">
                            Type of Document
                          </option>
                          <option value="passport" data-documentid="1">
                            Passport
                          </option>
                          {
                          poaValue != 'driverlicense' && 
                            <option value="driverlicense" data-documentid="4">
                              Driver License
                            </option>
                          }
                          {
                          poaValue != 'australiaphotocard' &&
                          <option value="australiaphotocard" data-documentid="6">
                            Australia Photo Card
                          </option>
                          }
                        </select>
                      </div>
                    </div>
                    
                    {poiValue == "passport" ?
                      <div className="currency-group currency-group--transfer">
                        <div className="currency-input">
                          <input
                            placeholder="Passport Number"
                            type="text"
                            name="DocumentNo_poi"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.DocumentNo_poi}
                          />
                        </div>
                        <div className="error-form">
                          {errors.DocumentNo_poi &&
                            touched.DocumentNo_poi &&
                            errors.DocumentNo_poi}
                        </div>
                      </div>
                      :
                      <div className="currency-group currency-group--transfer">
                        <div className="currency-input">
                          <input
                            placeholder="Document Number"
                            type="text"
                            name="DocumentNo_poi"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.DocumentNo_poi}
                          />
                        </div>
                        <div className="error-form">
                          {errors.DocumentNo_poi &&
                            touched.DocumentNo_poi &&
                            errors.DocumentNo_poi}
                        </div>
                      </div>
                    }

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Issue Authority"
                          type="text"
                          name="DocumentIssue_poi"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DocumentIssue_poi}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentIssue_poi &&
                          touched.DocumentIssue_poi &&
                          errors.DocumentIssue_poi}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon calendar-icon"></div>

                        <input
                          placeholder="Expiry Date (DD/MM/YYYY)"
                          type="date"
                          name="DocumentExpireDateISO_poi"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DocumentExpireDateISO_poi}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentExpireDateISO_poi &&
                          touched.DocumentExpireDateISO_poi &&
                          errors.DocumentExpireDateISO_poi}
                      </div>
                    </div>

                    <div className="currency-group">
                      <div className={uploadClasses}>
                        {poiValue == "driverlicense" && 
                        <p className="upload-label">Driver License (Front)</p>
                        }
                        {poiValue == "passport" && 
                        <p className="upload-label">Passport</p>
                        }
                        {poiValue == "australiaphotocard" && 
                        <p className="upload-label">Australia Photo Card (Front)</p>
                        }
                        <div
                          name=""
                          onClick={() => {
                            uploadImges.current.click()

                            //}
                          }}
                        >
                          {uploadImg ? (
                            <img
                              style={{ width: "100%" }}
                              className="uploadimg"
                              src={uploadImg}
                            />
                          ) : (
                            <div className="uploadButton">Upload Photo</div>
                          )}
                        </div>

                        <input
                          style={{ display: "none" }}
                          ref={uploadImges}
                          type="file"
                          onChange={async info => {
                            console.log(info.target.files)
                            if (
                              info.target.files[0].type.includes("/jpeg") ||
                              info.target.files[0].type.includes("/jpg") ||
                              info.target.files[0].type.includes("/png")
                            ) {
                              if (info.target.files[0].size >= 3000000) {
                                Swal.fire("File size should be less then 3 MB.")
                                return
                              }
                              //  if (info.file.status === "uploading") {
                              //   Swal.showLoading()
                              //   return;
                              // }
                              setFieldValue(
                                "DocumentName_poi",
                                info.target.files[0].name
                              )
                              Swal.close()

                              Swal.fire("Compressing image...")
                              const imageUrl = await fileChangedHandler(
                                info.target.files[0]
                              )
                              console.log(imageUrl)
                              setUploadImg(imageUrl)
                              setFieldValue("DocumentBase64_poi", imageUrl)

                              Swal.close()
                            } else {
                              Swal.fire("Invalid file")
                              return
                            }
                          }}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentBase64_poi &&
                          touched.DocumentBase64_poi &&
                          errors.DocumentBase64_poi}
                      </div>
                    </div>
                    
                    {poiValue != 'passport' &&
                    <div className="currency-group">
                      <div className={uploadClasses}>
                      {poiValue == "driverlicense" && 
                        <p className="upload-label">Driver License (Back)</p>
                        }
                        {poiValue == "australiaphotocard" && 
                        <p className="upload-label">Australia Photo Card (Back)</p>
                        }
                        <div
                          name=""
                          onClick={() => {
                            uploadImges3.current.click()

                            //}
                          }}
                        >
                          {uploadImg3 ? (
                            <img
                              style={{ width: "100%" }}
                              className="uploadimg"
                              src={uploadImg3}
                            />
                          ) : (
                            <div className="uploadButton">Upload Photo</div>
                          )}
                        </div>

                        <input
                          style={{ display: "none" }}
                          ref={uploadImges3}
                          type="file"
                          onChange={async info => {
                            console.log(info.target.files)
                            if (
                              info.target.files[0].type.includes("/jpeg") ||
                              info.target.files[0].type.includes("/jpg") ||
                              info.target.files[0].type.includes("/png")
                            ) {
                              if (info.target.files[0].size >= 3000000) {
                                Swal.fire("File size should be less then 3 MB.")
                                return
                              }
                              //  if (info.file.status === "uploading") {
                              //   Swal.showLoading()
                              //   return;
                              // }
                              setFieldValue(
                                "DocumentName_poi",
                                info.target.files[0].name
                              )
                              Swal.close()

                              Swal.fire("Compressing image...")
                              const imageUrl = await fileChangedHandler(
                                info.target.files[0]
                              )
                              console.log(imageUrl)
                              setUploadImg3(imageUrl)
                              setFieldValue("DocumentBase64_poi", imageUrl)

                              Swal.close()
                            } else {
                              Swal.fire("Invalid file")
                              return
                            }
                          }}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentBase64_poi &&
                          touched.DocumentBase64_poi &&
                          errors.DocumentBase64_poi}
                      </div>
                    </div>
                    }

                    <p class="paragraph--margintop">
                      Proof of Australian Address
                    </p>
                    <p></p>
                    
                    {poiValue == 'passport' && 
                    <div className="currency-group" style={{'display': 'none'}}></div>
                    }

                    <div className="currency-group currency-group--transfer currency-group--transfer--nomargin">
                      <div className="currency-input currency-input--selectwrapper">
                        <select
                          id="poadocumenttype"
                          name="poadocumenttype"
                          value="Type of Document"
                          onChange={e=> {
                            setPoaValue(e.target.value)
                            setPoaId(Number(e.target.options[e.target.selectedIndex].dataset.documentid))
                            console.log(poaId)
                            console.log(Number(e.target.options[e.target.selectedIndex].dataset.documentid))
                            handleChange(e)
                          }}
                          onBlur={handleBlur}
                          value={values.nationality}
                        >
                          <option selected value="">
                            Type of Document
                          </option>
                          {
                          poiValue != 'driverlicense' && 
                            <option value="driverlicense" data-documentid="4">
                              Driver License
                            </option>
                          }
                          {
                          poiValue != 'australiaphotocard' &&
                          <option value="australiaphotocard" data-documentid="6">
                            Australia Photo Card
                          </option>
                          }
                          <option value="utilitybill" data-documentid="2">
                            Utility Bill
                          </option>
                        </select>
                        {/* <input
                          placeholder="Driver's License (Front and Back)"
                          type="text"
                          name="driverlicense"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer currency-group--transfer--nomargin">
                      <div className="currency-input">
                        <input
                          placeholder="License Number"
                          type="text"
                          name="DocumentNo_poa"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DocumentNo_poa}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentNo_poa &&
                          touched.DocumentNo_poa &&
                          errors.DocumentNo_poa}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <input
                          placeholder="Issue Authority"
                          type="text"
                          name="DocumentIssuer_poa"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DocumentIssuer_poa}
                        />
                      </div>
                      <div className="error-form">

                      </div>
                      <div className="error-form">
                        {errors.DocumentIssuer_poa &&
                          touched.DocumentIssuer_poa &&
                          errors.DocumentIssuer_poa}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon calendar-icon"></div>
                        
                        {poaValue == 'utilitybill' ?
                        <input
                        placeholder="Expiry Date (DD/MM/YYYY)"
                        type="date"
                        name="DocumentExpireDateISO_poa"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.DocumentExpireDateISO_poa}
                        disabled
                      />
                        :
                        
                        <input
                          placeholder="Expiry Date (DD/MM/YYYY)"
                          type="date"
                          name="DocumentExpireDateISO_poa"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DocumentExpireDateISO_poa}
                        />
                        }
                      </div>
                      <div className="error-form">
                        {errors.DocumentExpireDateISO_poa &&
                          touched.DocumentExpireDateISO_poa &&
                          errors.DocumentExpireDateISO_poa}
                      </div>

                    </div>

                    <div className="currency-group">
                      <div className={uploadClasses1}>
                       
                      {poaValue == "driverlicense" && 
                        <p className="upload-label">Driver License (Front)</p>
                        }
                        {poaValue == "utilitybill" && 
                        <p className="upload-label">Utility Bill (Including Bank Statement)</p>
                        }
                        {poaValue == "australiaphotocard" && 
                        <p className="upload-label">Australia Photo Card (Front)</p>
                      }

                        <div
                          name=""
                          onClick={() => uploadImges1.current.click()}
                        >
                          {uploadImg1 ? (
                            <img
                              style={{ width: "100%" }}
                              className="uploadimg"
                              src={uploadImg1}
                            />
                          ) : (
                            <div className="uploadButton">Upload Photo</div>
                          )}
                        </div>
                        <input
                          style={{ display: "none" }}
                          ref={uploadImges1}
                          type="file"
                          onChange={async info => {
                            console.log(info.target.files)
                            if (
                              info.target.files[0].type.includes("/jpeg") ||
                              info.target.files[0].type.includes("/jpg") ||
                              info.target.files[0].type.includes("/png")
                            ) {
                              if (info.target.files[0].size >= 3000000) {
                                Swal.fire("File size should be less then 3 MB.")
                                return
                              }
                              //  if (info.file.status === "uploading") {
                              //   Swal.showLoading()
                              //   return;
                              // }
                              setFieldValue(
                                "DocumentName_poa",
                                info.target.files[0].name
                              )
                              Swal.close()

                              Swal.fire("Compressing image...")
                              const imageUrl = await fileChangedHandler(
                                info.target.files[0]
                              )
                              console.log(imageUrl)
                              setUploadImg1(imageUrl)
                              setFieldValue("DocumentBase64_poa", imageUrl)

                              Swal.close()
                            } else {
                              Swal.fire("Invalid file")
                              return
                            }
                          }}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentBase64_poa &&
                          touched.DocumentBase64_poa &&
                          errors.DocumentBase64_poa}
                      </div>
                    </div>
                    {poaValue != "utilitybill" && 
                    <div className="currency-group">
                      <div className={uploadClasses2}>
                      {poaValue == "driverlicense" && 
                        <p className="upload-label">Driver License (Back)</p>
                        }
                        {poaValue == "australiaphotocard" && 
                        <p className="upload-label">Australia Photo Card (Back)</p>
                      }

                        <div
                          name=""
                          onClick={() => uploadImges2.current.click()}
                        >
                          {uploadImg2 ? (
                            <img
                              style={{ width: "100%" }}
                              className="uploadimg"
                              src={uploadImg2}
                            />
                          ) : (
                            <div className="uploadButton">Upload Photo</div>
                          )}
                        </div>
                        <input
                          style={{ display: "none" }}
                          ref={uploadImges2}
                          type="file"
                          onChange={async info => {
                            console.log(info.target.files)
                            if (
                              info.target.files[0].type.includes("/jpeg") ||
                              info.target.files[0].type.includes("/jpg") ||
                              info.target.files[0].type.includes("/png")
                            ) {
                              if (info.target.files[0].size >= 3000000) {
                                Swal.fire("File size should be less then 3 MB.")
                                return
                              }
                              //  if (info.file.status === "uploading") {
                              //   Swal.showLoading()
                              //   return;
                              // }
                              setFieldValue(
                                "DocumentBackName_poa",
                                info.target.files[0].name
                              )
                              Swal.close()

                              Swal.fire("Compressing image...")
                              const imageUrl = await fileChangedHandler(
                                info.target.files[0]
                              )
                              console.log(imageUrl)
                              setUploadImg2(imageUrl)
                              setFieldValue("DocumentBackBase64_poa", imageUrl)

                              Swal.close()
                            } else {
                              Swal.fire("Invalid file")
                              return
                            }
                          }}
                        />
                      </div>
                      <div className="error-form">
                        {errors.DocumentBackBase64_poa &&
                          touched.DocumentBackBase64_poa &&
                          errors.DocumentBackBase64_poa}
                      </div>
                        
                    </div>
                    }

                    {!!error && <div className="error">{error}</div>}
                    <div class="registration-link-holder">
                      <span class="transfer__ghost-button" onClick={() => {
                        setUploadInitialValues(values)
                        getAddress()
                      }
                      }>
                        Back
                      </span>
                      <button type="submit" className="btn bold btn--yellow">
                        {translate("Submit and Continue", "ส่งและดำเนินการต่อ")}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </>
        )}

        {personalDetails && (
          <>
            <h2>{translate("Other Details", "ข้อมูลส่วนตัว")}</h2>

            <Formik
              enableReinitialize={true}
              initialValues={{
                GenderId: getProfileStatus?.profile?.GenderId,
                OccupationId: getProfileStatus?.profile?.OccupationId,
                //"OccupationOtherText":"",
                SalaryId: getProfileStatus?.profile?.SalaryId,
                FrequencyOfTransferId:
                  getProfileStatus?.profile?.FrequencyOfTransferId,
                ConvenientTimeToContactId:
                  getProfileStatus?.profile?.ConvenientTimeToContactId,
              }}
              validate={values => {
                const errors = {}

                if (!values.GenderId) {
                  errors.GenderId = "Required"
                }
                if (!values.OccupationId) {
                  errors.OccupationId = "Required"
                }
                // if (!values.OccupationOtherText) {
                //   errors.OccupationOtherText = "Required";
                // }
                if (!values.SalaryId) {
                  errors.SalaryId = "Required"
                }
                if (!values.FrequencyOfTransferId) {
                  errors.FrequencyOfTransferId = "Required"
                }
                if (!values.ConvenientTimeToContactId) {
                  errors.ConvenientTimeToContactId = "Required"
                }
                return errors
              }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values)
                setError("")
                handleModalNormal()
                // Swal.showLoading()
                const resultvalues = await editPersonal(values)
                if (resultvalues.data.StatusCode === "0") {
                  Swal.close()
                  showTransferModalNormal(true)
                } else {
                  Swal.fire(resultvalues.data.Message)
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
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          name="GenderId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.GenderId || ""}
                        >
                          <option selected value="">
                            Select Gender
                          </option>

                          {allProfiles.gender &&
                            allProfiles.gender.map(gen => {
                              return (
                                <option value={gen.GenderId}>
                                  {gen.GenderName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.GenderId && touched.GenderId && errors.GenderId}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          name="OccupationId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.OccupationId}
                        >
                          <option selected value="">
                            Select Occupation
                          </option>
                          {allProfiles.occupation &&
                            allProfiles.occupation.map(occ => {
                              return (
                                <option value={occ.OccupationId}>
                                  {occ.OccupationName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.OccupationId &&
                          touched.OccupationId &&
                          errors.OccupationId}
                      </div>
                        
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          name="SalaryId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.SalaryId}
                        >
                          <option selected value="">
                            Select Salary
                          </option>
                          {allProfiles.salary &&
                            allProfiles.salary.map(sal => {
                              return (
                                <option value={sal.SalaryId}>
                                  {sal.SalaryName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-for">
                        {errors.SalaryId && touched.SalaryId && errors.SalaryId}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.FrequencyOfTransferId}
                          name="FrequencyOfTransferId"
                        >
                          <option selected value="">
                            Select Frequency of Transfer
                          </option>
                          {allProfiles.frequencyTransfer &&
                            allProfiles.frequencyTransfer.map(freq => {
                              return (
                                <option value={freq.FrequencyOfTransferId}>
                                  {freq.FrequencyOfTransferName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.FrequencyOfTransferId &&
                          touched.FrequencyOfTransferId &&
                          errors.FrequencyOfTransferId}
                      </div>
                    </div>

                    <div className="currency-group currency-group--transfer">
                      <div className="currency-input">
                        <div class="registration--input-icon"></div>
                        <select
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ConvenientTimeToContactId}
                          name="ConvenientTimeToContactId"
                        >
                          <option selected value="">
                            Select Convenient Time for Contact
                          </option>
                          {allProfiles.timeConnect &&
                            allProfiles.timeConnect.map(timec => {
                              return (
                                <option value={timec.ConvenientTimeToContactId}>
                                  {timec.ConvenientTimeToContactName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="error-form">
                        {errors.ConvenientTimeToContactId &&
                          touched.ConvenientTimeToContactId &&
                          errors.ConvenientTimeToContactId}
                      </div>
                    </div>

                    {!!error && <div className="error">{error}</div>}
                    <div class="registration-link-holder">
                      <span
                        class="transfer__ghost-button"
                        onClick={getIdentification}
                      >
                        Back
                      </span>
                      <button
                        type="submit"
                        className="btn bold btn--yellow"
                        // onClick={getComplete}
                      >
                        {translate("Complete", "ส่งและดำเนินการต่อ")}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </>
        )}


      </section>

      {transferModalNormal && (
        <div className="transfer__modal">
          <div className={modalClasses}>
            <div className="transfer__modal--cross" onClick={handleModalNormal}>
              {/* <img src={crossIcon} className="transfer__modal--cross-img" /> */}
            </div>
            <h2>
              {translate("Registration Successful", "การลงทะเบียนสำเร็จ")}
            </h2>
            <p>
              {translate(
                "Thank you for registering with Smartway System.",
                "ขอขอบคุณที่ลงทะเบียนกับระบบ Smartway"
              )}
            </p>

            <button
              type="submit"
              className="btn bold btn--yellow"
              onClick={e => {
                e.preventDefault()
                handleModalNormal()
                navigate(
                  typeof window !== "undefined" && window.location.href.includes("/th")
                    ? "/th/"
                    : "/"
                )
              }}
            >
              {translate("Homepage", "หน้าแรก")}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RegistrationTwo
