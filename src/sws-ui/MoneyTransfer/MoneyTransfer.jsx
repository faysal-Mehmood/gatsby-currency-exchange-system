import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import { navigate } from "gatsby"
import Swal from "sweetalert2"
import translate from "src/helpers/language"
import {
  getExchangeRate,
  getAllBank,
  getStates,
  getCity,
  getPostel,
  getCurrentExchangeRate,
  transferMoneyCheck,
  deleteAccount,
  checkOverLimit
} from "src/state/action/currency"

import { getProfile, editProfile, getReason } from "src/state/action/profile"

import { poliPayment } from "src/state/action/login"

import { Button, LinkHandler } from "src/sws-ui"
import classNames from "classnames"
import asicLogo from "src/images/icons/asic-logo.png"
import promoInvalidImg from "src/images/icons/promo_invalid.png"
import promoValidImg from "src/images/icons/promo_valid.png"
import crossIcon from "src/images/icons/cross.png"
import radioSelected from "src/images/icons/radio_selected.png"
import radioUnselected from "src/images/icons/radio_unselected.png"
const englishCheck = /^[A-Za-z0-9@%-+,><|'"!#$\-*/\()_.-~ ]*$/
const englishCheckNotNumber = /^[A-Z@~`!@#$%^ &*()_=+\\\\';:\"\\/?>.<,-]*$/i
const englishCheckNotSpecial = /^[A-Za-z0-9 ]*$/
const CurrencyInput = ({ label, currency, value, placeholder }) => {

  return (
    <div className="currency-group">
      <label htmlFor="">{label}</label>
      <div className="currency-input">
        <input placeholder={placeholder} value={value} />
        <span>{currency}</span>
      </div>
    </div>
  )
}

const ExistingAccount = ({
  accountNo,
  accountNm,
  bank,
  existingAccountCheck,
  onClick,
  id,
  key,
  clearAccDet,
  showSelectAccount


}) => {
  const dispatch = useDispatch()
  const existAccountClasses = classNames("existing__account", {
    "existing__account-active": existingAccountCheck == accountNo,
  })

  return (
    <div key={key} className={existAccountClasses} onClick={onClick}>
      <img src={radioUnselected} className="inactive_existing" />
      <img src={radioSelected} className="active_existing" />
      <div>
        <p>{translate("Account Number", "หมายเลขบัญชี")}</p>
        <p>{accountNo}</p>
      </div>
      <div>
        <p>{translate("Account Name", "ชื่อบัญชี")}</p>
        <p>{accountNm}</p>
      </div>
      <div>
        <p>{translate("Bank", "ธนาคาร")}</p>
        <p>{bank}</p>
      </div>
      <a onClick={async()=>{
        Swal.showLoading();
        const result  = await dispatch(deleteAccount({
              "MemberAccountIds":[id]
          }));
          dispatch(getProfile())
          clearAccDet();
          // showSelectAccount()
      }}>{translate("Delete account", "ลบบัญชี")}</a>
    </div>
  )
}

// const PromoCode = ({ label, value }) => {
//   const [promoValue, setPromoValue] = useState("None");
//   let [promoValid, setPromoValid] = useState("None");

//   const checkPromoCode = () => {

//     if (promoValue === "123456") {
//       setPromoValid("Valid");
//     } else if (promoValue === "None") {
//       setPromoValid("None");
//     } else {
//       setPromoValid("Invalid");
//     }
//   };

//   return (
//     <div className="currency-group currency-group--transfer currency-group--promo">
//       <label htmlFor="">{label}</label>
//       <div className="currency-input">
//         <input
//           value={value}
//           type="text"
//           onChange={(e) => setPromoValue(e.target.value)}
//         />
//         <span onClick={checkPromoCode}>Apply</span>
//       </div>
//       {promoValid == "Valid" && (
//         <div className="promo__validate">
//           <img src={promoValidImg} className="ASIC-logo" />
//           You have received special rate
//         </div>
//       )}
//       {promoValid == "Invalid" && (
//         <div className="promo__validate">
//           <img src={promoInvalidImg} className="ASIC-logo" />
//           Your promotion code is invalid
//         </div>
//       )}
//     </div>
//   );
// };

const MoneyTransfer = () => {
  //dispatcher
  const dispatch = useDispatch()
  const allState = useSelector(state => state)
  const [rater, setRater] = useState("")
  const { profile } = allState
  const [promoValue, setPromoValue] = useState("None")
  let [promoValid, setPromoValid] = useState("None")

  const [transferModal, showTransferModal] = useState(false)
  const [selectAccount, showSelectAccount] = useState(true)
  const [newAccount, showNewAccount] = useState(false)
  const [existingAccount, showExistingAccount] = useState(false)
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [memAccId, setMemAccId] = useState("")
  const [activeExistingAccount, setActiveAccount] = useState("")
  const [transferAmount, setTransferAmount] = useState(0.00)
  const [transferAmountValue, setTransferAmountValue] = useState(0.00)
  const [receiveAmount, setReceiveAmount] = useState(0.00)
  const [saveCreateAccount, setSaveCreateAccount] = useState(false)
  const [accountBank, setAccountBank] = useState("")
  const [alertAmount, setAlertAmount] = useState(false)
  const [showReasons, setShowReasons] = useState(false)
  const [reasonBox, showReasonBox] = useState(false)
  const [loginBox, showLoginBox] = useState(false)
  const [poliForm, setPoliForm] = useState(false)
  const [resonValue, setResonValue] = useState("")
  const [poliLinker, setPoliLink] = useState("")
  const [promoCodeReal, setPromoCodeReal] = useState("");
  const [currentReason, changeCurrentReason] = useState("");
  const [changeTransferAmount, setChangeTransferAmount] = useState(0.00)
  const [reasonBoxValue, setReasonBoxValue] = useState("")
  const [reasonError, setReasonError] = useState(false)
  const [transferURL, setTransferURL] = useState("")

  const [transferValues, setTransferValues] = useState({
    send: transferAmount,
    accountNumbers: accountNumber,
    accountNames: accountName,
    promo: "",
    login:
      typeof window !== "undefined" &&
      localStorage.getItem("smartway_auth"),
  })

  //curentRate
  useEffect(() => {
    console.log("it's this")
    console.log(transferAmount)
    // setTransferAmount(Number(String(transferAmount).replace(",","")))
    console.log(allState.currency?.exchangeRateCurrent.Rate)
    // allState.currency?.exchangeRate[0]?.Rate.toFixed(2)
      setRater(allState.currency?.exchangeRateCurrent.RateText)
      console.log(allState.currency?.exchangeRateCurrent.Rate)
      setReceiveAmount(
        transferAmount * allState.currency?.exchangeRateCurrent.Rate
      )
      console.log(transferAmount * allState.currency?.exchangeRateCurrent.Rate)
      console.log('testrate')
      console.log(transferAmount)
      // console.log(rater)
      // console.log(receiveAmount)
  }, [allState.currency])

  
  const [existingAccounts, setExistingAccounts] = useState([
    // {
    // 	accountNo: "0000",
    // 	accountNm: "Jack Black",
    // 	bank: "Bangkok Bank"
    // },{
    // 	accountNo: "0001",
    // 	accountNm: "Jack White",
    // 	bank: "TISCO"
    // },{
    // 	accountNo: "0002",
    // 	accountNm: "Jack Grey",
    // 	bank: "Thai Military Bank"
    // },{
    // 	accountNo: "0003",
    // 	accountNm: "Jack Blue",
    // 	bank: "Citibank"
    // }
  ])

  function clearAccountDetails() {
    setAccountName('')
    setAccountNumber('')
  }
  const handleSaveCreateAccount = () => {
    setSaveCreateAccount(!saveCreateAccount)
  }

  const formatTransferAmount = value => {
    setTransferAmount(parseFloat(value).toFixed(2))
  }

  const handleTransferAmount = value => {
    setTransferAmount(value)
    if (allState.currency.exchangeRate.length > 0) {
      if (value === 0) {
        setReceiveAmount(value * allState.currency.exchangeRate[0].Rate)
        setReceiveAmount(value * allState.currency.exchangeRate[0].Rate)
      } else if (value <= 50000) {
        setReceiveAmount(value * allState.currency.exchangeRate[1].Rate)
      } else {
        setReceiveAmount(value * allState.currency.exchangeRate[2].Rate)
      }
    }
  }

  useEffect(() => {
    const exhData = {
      FromCurrencyId: 2,
      ToCurrencyId: 1,
      TransferAmount: 0,
    }

    dispatch(getExchangeRate(exhData))
  }, [])

  useEffect(() => {
    const exhDataCurrent = {
      FromCurrencyId: 2,
      ToCurrencyId: 1,
      TransferAmount: 0,
      PromoCode: ''
    }

    dispatch(getCurrentExchangeRate(exhDataCurrent))
  }, [])


  const handleModal = load => {
    if (!localStorage.getItem("smartway_auth")) {
      navigate(
        typeof window !== "undefined" && window.location.href.includes("/th")
          ? "/th/login"
          : "/en/login"
      )
      return
    }

    //Swal.showLoading()
    if (!!load) {
      loadData()
    }
    showTransferModal(!transferModal)
    showSelectAccount(true)
    showNewAccount(false)
    showExistingAccount(false)
    setActiveAccount("")
    //handleCancelModal()

    if (saveCreateAccount === true) {
      //	setExistingAccounts(existingAccounts.concat({accountNo: accountNumber, accountNm: accountName, bank: accountBank}))
      setExistingAccounts(allState.profile.profile.LstMemberAccount)
    }

    setSaveCreateAccount(false)
  }

  const handleCancelModal = () => {
    showReasonBox(false)
    setShowReasons(false)
    setAlertAmount(false)
    setShowReasons(false)
    showTransferModal(!transferModal)
    showSelectAccount(true)
    showNewAccount(false)
    showExistingAccount(false)
    // setAccountName("")
    // setAccountNumber("")
    setActiveAccount("")
    setPoliForm(false)
  }


  const handleCancelModal1 = () => {
    showReasonBox(false)
    setAlertAmount(false)
    setShowReasons(false)
    showTransferModal(!transferModal)
    showSelectAccount(false)
    showNewAccount(false)
    showExistingAccount(false)
    setAccountName("")
    setAccountNumber("")
   
  }


  const handleNewAccount = () => {
    showSelectAccount(false)
    showNewAccount(true)
  }

  const handleExistingAccount = () => {
    showSelectAccount(false)
    showExistingAccount(true)
  }

  const handleActiveExistingAccount = (accountNo, accountNm, MemberAccountId) => {
    //alert(accountNm)
    setAccountName(accountNm)
    setAccountNumber(accountNo)
    setActiveAccount(accountNo)
    setMemAccId(MemberAccountId)
  }

  const handleTransfer = async data => {
    showSelectAccount(false)
    
    if (transferAmount >= 5000) {
      setAlertAmount(true)
    } else {
      setShowReasons(true)
    }
    showTransferModal(!transferModal)
  } 
  

  const startPoli = async data => {
    showSelectAccount(false)
  
    // const poliLink = await dispatch(poliPayment(data))
    const dataCheck = {
      "MemberAccountId":memAccId,
      "TransferAmount":transferAmount,
      "FromCurrencyId":2,
      "ToCurrencyId":1,
      "TransferObjectiveId":currentReason,
      "TransferObjectiveRemark":currentReason == 1 ? reasonBoxValue : resonValue,
      "PromoCode":promoCodeReal,
      "PaymentMethodId":1
    }

    const transferData = {
      MemberAccountId: typeof window !== "undefined" && parseInt(localStorage.getItem("smartway_user_info")),
      TransferAmount: transferAmount,
      FromCurrencyId: 2,
      ToCurrencyId: 1
    }

    const overLimit = await dispatch(
      checkOverLimit(transferData)
    )
    
    const addTransaction =  await dispatch(transferMoneyCheck(dataCheck))
    setTransferURL(addTransaction.Object.NavigateURL)
    console.log('addtransaction')
    console.log(addTransaction.Object.NavigateURL)

    const urlToNavigate = await addTransaction.Object.NavigateURL

    if (typeof window !== undefined) {
      window.location = urlToNavigate
    }
  
  }

  const handleShowReasons = () => {
    setAlertAmount(false)
    setShowReasons(true)
  }

  const handleReasonBox = value => {
    setResonValue(value)
    if (value == "1") {
      showReasonBox(true)
      setAlertAmount(false)
    } else {
      setReasonError(false)
      showReasonBox(false)
    }
  }

  const reasonBoxClasses = classNames({
    "show--reason-box": reasonBox,
  })

  const modalClasses = classNames(
    "transfer__modal--select-account",
    {
      "transfer__modal--select-account--small": selectAccount,
    },
    {
      "transfer__modal--select-account--small": alertAmount,
    },
    {
      "transfer__modal--select-account--small": showReasons,
    }
  )

  //useeffect for store
  const loadData = async () => {
    await Promise.all([
      dispatch(getAllBank()),
      dispatch(getStates()),
      dispatch(getProfile()),
      dispatch(getReason()),
    ])
  }

useEffect(() => {
  // dispatch(getProfile())
}, [transferModal])

useEffect(() => {
  const timeOutId = setTimeout(() => {
      Number(String(changeTransferAmount).replace(",",""))
      console.log("You send focus")
      Number.isInteger(changeTransferAmount)
        ? setTransferAmount(Number(changeTransferAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}))
  
        : //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
        changeTransferAmount == '' ? setTransferAmount(changeTransferAmount.toString()) : setTransferAmount(Number(changeTransferAmount.replace(",","")).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}))
      // .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    console.log(changeTransferAmount)
  }, 500);
  return () => clearTimeout(timeOutId);
  console.log(changeTransferAmount)
}, [changeTransferAmount]);

  return (
    <>
      <section className="money-transfer">
        <h2>{translate("Transfer Money", "โอนเงิน")}</h2>
        <h3>
          {translate(
            `Send money overseas online from Australia to Thailand with the best
          currency exchange rates around.`,
            `ส่งเงินไปต่างประเทศออนไลน์จากออสเตรเลียมาไทยด้วยสิ่งที่ดีที่สุด
          อัตราแลกเปลี่ยนเงินตรารอบ.`
          )}
        </h3>

        <Formik
          initialValues={transferValues}
          validate={values => {
            const errors = {}
            values.accountNumbers = accountNumber
            values.accountNames = accountName
            values.send = transferAmount
            if (!values.accountNumbers) {
              errors.accountNumbers = "Required"
            }
            if (!values.accountNames) {
              errors.accountNames = "Required"
            }
            if (!values.send) {
              errors.send = "Required"
            }

            // if (!values.login) {
            //   showLoginBox(true)
            // }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            
            if (profile.profile.MemberStatusId === 1 &&  profile.profile.MemberProfileStatusId !== 3 ) {
              Swal.fire({
                title: 'Your Profile is not 100% complete',
                text: "Please complete your profile",
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Update Profile',
                showCloseButton: true
              }).then((result) => {
                if (result.isConfirmed) {

                  navigate(
                    typeof window !== "undefined" && window.location.href.includes("/th")
                      ? "/th/register2"
                      : "/en/register2"
                  )
                }
              })
            } else if (profile.profile.MemberStatusId === 1 &&  profile.profile.MemberProfileStatusId === 3 ) {
              Swal.fire({
                title: 'Your Profile waiting for approval',
                text: "Please see your  status",
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'check status',
                showCloseButton: true
              }).then((result) => {
                if (result.isConfirmed) {

                  navigate(
                    typeof window !== "undefined" && window.location.href.includes("/th")
                      ? "/th/profile"
                      : "/en/profile"
                  )
                }
              })
            }

            else if (profile.profile.MemberStatusId === 2) {
              setTransferValues(values)
              handleTransfer(values)
            } else {
              Swal.fire({
                title: 'You are not allowed to make Transfer',
                text: "Kindly reach out to admin team",
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              })
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
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="currency-group">
                <label htmlFor="">{translate("You Send", "คุณส่ง")}</label>
                <div className="currency-input">
                  <input
                    placeholder={""}
                    value={
                      transferAmount
                      // Number.isInteger(transferAmount)
                      //   ? parseFloat(transferAmount).toFixed(2)
                
                      //   : //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                      //     transferAmount == '' ? transferAmount.toString() : Number(transferAmount).toFixed(2)
                      //.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onClick={e => {
                      e.target.setSelectionRange(0, e.target.value.length)
                    }}
                    // onBlur={e => {
                    //   if (e.target.value.length > 0) {
                    //     handleTransferAmount(e.target.value)
                    //     handleChange(e)
                    //   } else {
                    //     handleTransferAmount(0)
                    //   }
                    // }}

                    defaultValue={Number(transferAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    onBlur={e => {
                      handleBlur(e)
                      // setYouSendFocus("")
                      // console.log(e.target.name)
                      // console.log('false')
                      // console.log(youSendFocus)
                      
                      setChangeTransferAmount(e.target.value)
                      
                    }}
                    // onFocus={e => {
                    //   setYouSendFocus(e.target.name)
                    //   console.log('true')}
                    // }
                      
                    onChange={e => {
                      setFieldValue("promo", "")
                      setPromoValid("None")

                      setTransferAmount(e.target.value)
                    //  handleInputChange(e)
                      handleChange(e)
                      // if (e.target.value.length > 0) {
                      // } 
                      // else {
                      //   setTransferAmount(0)
                      // }
                      console.log(changeTransferAmount)
                    }
                  }
                    onKeyUp={async e => {
                      const exhData = {
                        FromCurrencyId: 2,
                        ToCurrencyId: 1,
                        TransferAmount: parseInt(e.target.value),
                      }
                      const result = await dispatch(
                        getCurrentExchangeRate(exhData)
                      )
                      if (result?.data?.Object?.Rate) {
                        setReceiveAmount(
                          transferAmount * result?.data?.Object?.Rate
                        )
                        setRater(result?.data?.Object?.Rate.toFixed(2))
                      }
                    }}
                    // onFocus={(e)=>parseInt(e.target.value)}
                    type="text"
                    name="send"
                  />
                  <span>AUD</span>
                </div>
                <div className="error-form">
                  {errors.send && touched.send && errors.send}
                </div>
              </div>
              <div className="currency-group">
                <label htmlFor="">
                  {translate("Recipient Gets", "ผู้รับได้รับ")}
                </label>
                <div className="currency-input">
                  <input
                      placeholder={String(receiveAmount.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      value={String(receiveAmount.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    disabled
                  />
                  <span>THB</span>
                </div>
              </div>
              {typeof window !== "undefined" && localStorage.getItem("smartway_auth") && (
                <>
                  <div className="currency-group currency-group--transfer">
                    <label htmlFor="">
                      {translate("Account Name", "ชื่อบัญชี")}
                    </label>
                    <div className="currency-input">
                      <input
                        type="text"
                        name="accountName"
                        onChange={() => {
                          handleChange(accountName)
                        }}
                        onval
                        onBlur={handleBlur}
                        value={accountName}
                        onClick={() => handleModal(true)}
                      />
                    </div>
                    <div className="error-form">
                      {errors.accountNames &&
                        touched.accountNames &&
                        errors.accountNames}
                    </div>
                  </div>

                  <div className="currency-group currency-group--transfer">
                    <label htmlFor="">
                      {translate("Account Number", "หมายเลขบัญชี")}
                    </label>
                    <div className="currency-input">
                      <input
                        type="text"
                        name="accountNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={accountNumber}
                        onClick={() => handleModal(true)}
                      />
                    </div>
                    <div className="error-form">
                      {errors.accountNumbers &&
                        touched.accountNumbers &&
                        errors.accountNumbers}
                    </div>
                  </div>

                  <div className="currency-group currency-group--transfer currency-group--promo">
                    <label htmlFor="">
                      {translate("Promo Code", "รหัสโปรโมชั่น")}
                    </label>
                    <div className="currency-input">
                      <input
                        name="promo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.promo}
                        type="string"
                      />
                      <span
                        onClick={async () => {
                          if (values.promo) {
                            Swal.fire({
                              title: "Please Wait !",
                              html: "verifying Promo ...",
                              allowOutsideClick: false,
                              showConfirmButton: false,
                            })
                            const exhData = {
                              FromCurrencyId: 2,
                              ToCurrencyId: 1,
                              TransferAmount: transferAmount,
                              PromoCode: values.promo,
                            }

                            if (transferAmount > 0) {
                              if(!transferAmount ) {
                                Swal.fire(
                                  translate(
                                    "please fill sending amount",
                                    "กรุณากรอกข้อมูลให้ครบถ้วนก่อน"
                                  )
                                )
                              } 
                              else {
                                const getPromoCode = await dispatch(
                                  getCurrentExchangeRate(exhData)
                                )

                                if (getPromoCode?.data?.Object?.RateText) {
                                  setRater(getPromoCode?.data?.Object?.RateText)
                                  setReceiveAmount(
                                    transferAmount *
                                      parseFloat(
                                        getPromoCode?.data?.Object?.RateText
                                      )
                                  )
                                  setPromoCodeReal(values.promo)
                                  setPromoValid("Valid")
                                } else {
                                  setPromoValid("Invalid")
                                }
                              }
                            } 
                            else
                            if(transferAmount==0 ) {
                              Swal.fire(
                                translate(
                                  "Amount cannot be zero(0.00)",
                                  "จำนวนเงินต้องไม่เป็นศูนย์ (0.00)"
                                )
                              )
                            } else {
                              Swal.fire(
                                translate(
                                  "Transfer amount is invalid",
                                  "จำนวนเงินที่โอนไม่ถูกต้อง"
                                )
                              )
                            }
                          }
                        }}
                      >
                        {translate("Apply", "สมัคร")}
                      </span>
                    </div>
                    {promoValid == "Valid" && (
                      <div className="promo__validate">
                        <img src={promoValidImg} className="ASIC-logo" />
                        {translate(
                          "You have received special rate",
                          "คุณได้รับอัตราพิเศษ"
                        )}
                      </div>
                    )}
                    {promoValid == "Invalid" && (
                      <div className="promo__validate">
                        <img src={promoInvalidImg} className="ASIC-logo" />
                        {translate(
                          "Your promotion code is invalid",
                          "รหัสส่งเสริมการขายของคุณไม่ถูกต้อง"
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="error-form">
                {errors.login && touched.login && errors.login}
              </div>
              <div className="money-transfer__footer">
                <img src={asicLogo} className="ASIC-logo" />

                <p>
                  <b>{translate("Our Rate", "อัตราของเรา")} </b>

                  {rater}
                </p>
                <button
                  className="btn btn--transfer bold btn--yellow"
                  type="submit"
                  onClick={e => {
                    if ((typeof window !== "undefined") &&
                    (localStorage.getItem("smartway_auth") == null)) {
                      showLoginBox(true)
                    }
                    handleSubmit(e)
                  }}
                >
                  {translate("Transfer", "โอน")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </section>
      {!!allState.currency.exchangeRate.length > 0 &&
      <div className="rates__container">
        <div className="rates__item rates__item--highlight">
          <div>{translate("Special Rates", "ราคาพิเศษ")}</div>
        </div>
        
          {allState.currency.exchangeRate.map((data, index) => {
            return (
              index < 4 && (
                <div className="rates__item">
                  <div>
                    {data.FromAmountText.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} - {data.ToAmountText.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}{" "}
                    {data.FromAmount > 50000 ? "Up" : null} = {data.Rate.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                </div>
              )
            )
          })}
      </div>
      }

      {loginBox && (
        <div className="transfer__modal">
         <div className={modalClasses}>
           <div
             className="transfer__modal--cross"
             onClick={() => showLoginBox(false)}
             style={{'top': '20px', 'right': '20px'}}
           >
             <img src={crossIcon} className="transfer__modal--cross-img" />
           </div>
           <h3 style={{'marginTop': '0'}}>Please login to continue</h3>
           <p>To transfer money, you must first login.</p>
           {(typeof window !== 'undefined' && window.location.href.includes('/th')) ?
            <LinkHandler linkUrl="/th/login" className="btn bold btn--yellow">
                {translate("Login", "เข้าสู่ระบบ")}
            </LinkHandler>
            :
            <LinkHandler linkUrl="/en/login" className="btn bold btn--yellow">
                {translate("Login", "เข้าสู่ระบบ")}
            </LinkHandler>
            }
           </div>
        </div>
      )}

      {transferModal && (
        <div className="transfer__modal">
          <div className={modalClasses}>
            <div
              className="transfer__modal--cross"
              onClick={() => handleCancelModal()}
            >
              <img src={crossIcon} className="transfer__modal--cross-img" />
            </div>
            {selectAccount && (
              <>
                <h3>
                  {translate("Choose Recipient Account", "เลือกบัญชีผู้รับ")}
                </h3>
                <span
                  className="transfer__ghost-button"
                  onClick={handleNewAccount}
                >
                  {translate(" Create New Account", "สร้างบัญชีใหม่")}
                </span>
                <span
                  className="transfer__ghost-button"
                  onClick={handleExistingAccount}
                >
                  {translate("Use Existing Account", "ใช้บัญชีที่มีอยู่")}
                </span>
              </>
            )}
            {newAccount && (
              <div className="account__select account__select--create">
                <h3>{translate("Create New Account", "สร้างบัญชีใหม่")}</h3>
                <p>
                  {translate(
                    "Please fill in English",
                    "กรุณากรอกข้อมูลทั้งหมดเป็นภาษาอังกฤษ"
                  )}
                </p>

                <Formik
                  initialValues={{
                    name: "",
                    account_number: "",
                    account_nick_name: "",
                    bank: null,
                    city_address: "",
                    state: "",

                    city: "",
                    postal_code: "",
                    saved: false,
                    bankId: null,
                  }}
                  validate={values => {
                    const errors = {}

                    if (!values.name) {
                      errors.name = "Required"
                    } else if (!englishCheckNotNumber.test(values.name)) {
                      errors.name =
                        "Please fill in English"
                    }
                    if (!values.account_number) {
                      errors.account_number = "Required"
                    }
                    if (!englishCheckNotSpecial.test(values.account_nick_name)) {
                      errors.account_nick_name =
                        "Please fill in English"
                    }
                    if (!values.bankId) {
                      errors.bankId = "Required"
                    }
                    if (!values.city) {
                      errors.city = "Required"
                    }
                   
                    if (!values.postal_code) {
                      errors.postal_code = "Required"
                    }
                    if (!values.state) {
                      errors.state = "Required"
                    }
                    if (!values.city_address) {
                      errors.city_address = "Required"
                    } else if (!englishCheck.test(values.city_address)) {
                      errors.city_address =
                        "Please fill in English"
                    }

                    return errors
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const {
                      profile: { profile },
                    } = allState
                    console.log(values)
                    const LstMemberAccount = [
                      ...profile.LstMemberAccount,
                      {
                        AccountNo: values.account_number,
                        AccountName: values.name,
                        AccountMemo: values.account_nick_name,
                        Address: values.city_address,
                        AmphurId: values.city,
                        PostalCodeId: values.postal_code,
                        IsSaveFavorite: values.saved,
                        BankId: values.bankId,
                        ProvinceId: values.state
                      },
                    ]
                    dispatch(editProfile({ ...profile, LstMemberAccount }))
                    setAccountName(values.name);
                    setAccountNumber(values.account_number);
                    showTransferModal(false)
                    showSelectAccount(false)
                    showNewAccount(false)
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
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="currency-group">
                        <div className="currency-input">
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder={translate("Account Name", "ชื่อบัญชี")}
                          />
                        </div>
                        <div className="error-form">
                          {errors.name && touched.name && errors.name}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <input
                            placeholder={translate("Account Number", "เลขที่บัญชี")}
                            type="number"
                            name="account_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.account_number}
                          />
                        </div>
                        <div className="error-form">
                          {errors.account_number &&
                            touched.account_number &&
                            errors.account_number}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <input
                            type="text"
                            name="account_nick_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.account_nick_name}
                            placeholder={translate("Account Nickname", "ชื่อเรียกบัญชี")}
                          />
                        </div>

                        <div className="error-form">
                          {" "}
                          {errors.account_nick_name &&
                            touched.account_nick_name &&
                            errors.account_nick_name}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <select
                            name="bank"
                            onChange={e => {
                              console.log(e.target.value)
                              setFieldValue("bankId", e.target.value)
                            }}
                            onBlur={handleBlur}
                            value={
                              (typeof window !== 'undefined' && window.location.href.includes('/th')) ?
                              values?.bank?.BankName_th_TH :
                              values?.bank?.BankName
                            }
                          >
                            <option value={"Bank"}>{translate("Bank", "ธนาคาร")}</option>
                            {allState.currency.bank &&
                              allState.currency.bank.map(data => {
                                return (
                                  <option id={data.BankId} value={data.BankId}>
                                    {(typeof window !== 'undefined' && window.location.href.includes('/th')) ?
                                    data.BankName_th_TH :
                                    data.BankName
                                    }
                                  </option>
                                )
                              })}
                          </select>
                        </div>
                        <div className="error-form">
                          {errors.bankId && touched.bankId && errors.bankId}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <input
                            placeholder={translate("Address", "ที่อยู่")}
                            type="text"
                            name="city_address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city_address}
                          />
                        </div>
                        <div className="error-form">
                          {errors.city_address &&
                            touched.city_address &&
                            errors.city_address}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <select
                            name="state"
                            onChange={e => {
                              handleChange(e)
                              dispatch(getCity(e.target.value))
                            }}
                            onBlur={handleBlur}
                            value={values.state}
                          >
                            <option selected value="State">
                              {translate("State/Province", "จังหวัด")}
                            </option>
                            {allState.currency.states &&
                              allState.currency.states.map(data => {
                                return (
                                  <option
                                    id={data.ProvinceId}
                                    value={data.ProvinceId}
                                  >
                                    {data.ProvinceName}
                                  </option>
                                )
                              })}
                          </select>
                        </div>
                        <div className="error-form">
                          {errors.state && touched.state && errors.state}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <select
                            name="city"
                            onChange={e => {
                              handleChange(e)
                              dispatch(getPostel(e.target.value))
                            }}
                            onBlur={handleBlur}
                            value={values.city}
                          >
                            <option selected value="Bank">
                            {translate("City", "เมือง")}
                            </option>
                            {allState.currency.cities &&
                              allState.currency.cities.map(data => {
                                return (
                                  <option
                                    id={data.AmphurId}
                                    value={data.AmphurId}
                                  >
                                    {data.AmphurName}
                                  </option>
                                )
                              })}
                          </select>
                        </div>
                        <div className="error-form">
                          {errors.city && touched.city && errors.city}
                        </div>
                      </div>
                      <div className="currency-group">
                        <div className="currency-input">
                          <select
                            name="postal_code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.postal_code}
                          >
                            <option selected value="Bank">
                              {translate("Postal Code", "รหัสไปรษณีย์")}
                            </option>
                            {allState.currency.postel &&
                              allState.currency.postel.map(data => {
                                return (
                                  <option
                                    id={data.PostalCodeId}
                                    value={data.PostalCodeId}
                                  >
                                    {data.PostalCodeName}
                                  </option>
                                )
                              })}
                          </select>
                        </div>
                        <div className="error-form">
                          {errors.postal_code &&
                            touched.postal_code &&
                            errors.postal_code}
                        </div>
                      </div>
                      <div className="save-account">
                        <input
                          type="checkbox"
                          name="saved"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.saved}
                        />
                        <span>{translate("Save account", "บันทึกบัญชี")}</span>
                      </div>

                      <span
                        className="transfer__ghost-button"
                        onClick={handleCancelModal}
                      >
                        {translate("Cancel", "ยกเลิก")}
                      </span>
                      <button type="submit" className="btn bold btn--yellow">
                        {translate("Save", "บันทึก")}
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            )}
            {existingAccount && (
              <div className="account__select account__select--exist">
                <h3>
                  {translate("Choose Existing Account", "เลือกบัญชีที่มีอยู่")}
                </h3>
                <p>{translate("Please select an account", "โปรดเลือกบัญชี")}</p>

                {
                  console.log(allState.profile.profile.LstMemberAccount.filter(item => item.IsSaveFavorite == true))
                }

                {allState.profile.profile &&
                  allState.profile.profile.LstMemberAccount &&
                  allState.profile.profile.LstMemberAccount.filter(item => item.IsSaveFavorite == true).map(
                    ({ AccountNo, AccountName, BankIdBankName,MemberAccountId }, i) => (
                      
                      <ExistingAccount
                        existingAccountCheck={activeExistingAccount}
                        accountNo={AccountNo}
                        accountNm={AccountName}
                        bank={BankIdBankName}
                        id={MemberAccountId}
                        showSelectAccount={true}
                        clearAccDet={clearAccountDetails}
                        key={i}
                        onClick={() =>
                          handleActiveExistingAccount(AccountNo, AccountName, MemberAccountId)
                        }
                      />
                    )
                  )}

                {/* <ExistingAccount existingAccountCheck={activeExistingAccount2} accountNo="0000-00000002" accountNm="Jack White" bank="Thai Bank" onClick={handleActiveExistingAccount2}/>
					<ExistingAccount existingAccountCheck={activeExistingAccount3} accountNo="0000-00000003" accountNm="Jack Grey" bank="Thai Bank" onClick={handleActiveExistingAccount3}/>
					<ExistingAccount existingAccountCheck={activeExistingAccount4} accountNo="0000-00000004" accountNm="Jack Blue" bank="Thai Bank" onClick={handleActiveExistingAccount4}/> */}

                <span
                  className="transfer__ghost-button"
                  onClick={handleCancelModal}
                >
                  {translate("Cancel", "ยกเลิก")}
                </span>
                <a
                  className="btn bold btn--yellow"
                  onClick={() => handleModal(false)}
                >
                  {translate("Continue", "บันทึก")}
                </a>
              </div>
            )}
            {alertAmount && (
              <>
                <h3>
                  {translate("", "")} Your transfer amount exceeds $5,000. You
                  will need to provide the following documents:
                </h3>
                <p>1. Bank Statement (not older than 3 months)</p>
                <p>1. Last 2 months' payslip</p>
                <span
                  className="transfer__ghost-button"
                  onClick={handleShowReasons}
                >
                  OK
                </span>
                <span
                  className="transfer__ghost-button"
                  onClick={handleCancelModal}
                >
                  Cancel
                </span>
              </>
            )}
            {showReasons && (
              <>
                <h3>{translate("", "")}Choose your reason for transfer:</h3>
                <div className="currency-group currency-group-reason">
                  <div>
                    <select onChange={e => {
                      handleReasonBox(e.target.value)
                      changeCurrentReason(e.target.value)
                      console.log(e.target.value)
                      }}>
                      <option defaultValue value="Bank">
                        {translate("", "")}Please select the reason for transfer
                      </option>
                      {console.log(allState.profile.reasons)}
                      {!!allState.profile.reasons &&
                        allState.profile.reasons.map(data => {
                          return (
                            <option value={data.TransferObjectiveId} 
                            // onChange={changeCurrentReason(data.TransferObjectiveName)}
                            >
                              {data.TransferObjectiveName}
                            </option>
                          )
                        })}
                    </select>
                    {currentReason == 1 &&
                    <>
                      <input value={reasonBoxValue} onChange={e => {setReasonBoxValue(e.target.value)}} className={reasonBoxClasses} required/>
                    </>
                    }
                    {
                      reasonError && 
                      <>
                        <div className="error-form">Required</div>
                      </>
                    }
                  </div>
                </div>
                <span
                  className="transfer__ghost-button"
                  onClick={() => {
                    if (currentReason == 1 && reasonBoxValue == "") {
                      setReasonError(true)
                    } else {

                      if (!!resonValue) {
                        setReasonError(false)
                        setShowReasons(false)
                        setPoliForm(true)
                        startPoli(transferValues)
                        // if(transferURL != "") {
                        //   if (typeof window !== "undefined") {
                        //     window.location = transferURL
                        //   }
                        // }
                        // window.open(poliLinker,'_blank');
                        showTransferModal(false)
                      }
                    }
                  }}
                >
                  {translate("", "")}OK
                </span>
              </>
            )}
            {/* {poliForm && (

              <div className="poliform">
                <h3>Below is you Poli form Details</h3>
                <span
                  className="transfer__ghost-button"
                  onClick={()=>{
                   
                  }}
                >
                  Proceed to Reciept
                </span>
              </div>
            )

            } */}
          </div>
        </div>
      )}
    </>
  )
}

export default MoneyTransfer
