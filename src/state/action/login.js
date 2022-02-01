import { API_URL, headers, headers1 } from "../../config"
import * as loginConstant from "../constants/constant"
import { navigate } from "gatsby"
import { getProfileLogin } from "../action/profile"
import Swal from "sweetalert2/dist/sweetalert2.js"
import axios from "axios"
//login

export const searchaddressplaces = id => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&language=en-AU&key=AIzaSyBnD_Qhiue6as0E4LHHBbFJT4RXKWcJABI&region=au`
  )
}

export const userLogin = (UserName, Password) => {
  return dispatch => {
    return axios
      .post(
        `${API_URL}/login`,
        {
          UserName,
          Password,
        },
        {
          headers: headers1(),
        }
      )
      .then(async function(response) {
        // handle success
        console.log(response)
        if (response.data.StatusCode === "0") {
          dispatch({
            type: loginConstant.USER_DATA,
            payload: response.data.Object,
            error: "",
          })
          localStorage.setItem("smartway_auth", response.data.Object.TokenId)
          localStorage.setItem(
            "smartway_user_info",
            response.data.Object.MemberId
          )
         await dispatch(getProfileLogin())
        

          // navigate("/")
        } else {
          dispatch({
            type: loginConstant.USER_DATA,
            payload: "",
            error: response.data.Message,
          })
        }
      })
      .catch(function(error) {
        dispatch({
          type: loginConstant.USER_DATA,
          payload: "",
          error: "something went wrong.Kindly check your network",
        })
      })
  }
}

export const userLoginGoogle = (GoogleIdToken) => {
  return dispatch => {
    return axios
      .post(
        `${API_URL}/LoginGoogle`,
        {
          GoogleIdToken
        },
        {
          headers: headers1(),
        }
      )
      .then(async function(response) {
        // handle success
        console.log(response)
        if (response.data.StatusCode === "0") {
          dispatch({
            type: loginConstant.USER_DATA,
            payload: response.data.Object,
            error: "",
          })
          localStorage.setItem("smartway_auth", response.data.Object.TokenId)
          localStorage.setItem(
            "smartway_user_info",
            response.data.Object.MemberId
          )
         await dispatch(getProfileLogin())
        

          // navigate("/")
        } else {
          dispatch({
            type: loginConstant.USER_DATA,
            payload: "",
            error: response.data.Message,
          })
        }
      })
      .catch(function(error) {
        dispatch({
          type: loginConstant.USER_DATA,
          payload: "",
          error: "something went wrong.Kindly check your network",
        })
      })
  }
}


// 0519257985
// 0519257918
// placeId
export const getPlaceId = place => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&inputtype=textquery&fields=formatted_address,name,place_id&key=AIzaSyBnD_Qhiue6as0E4LHHBbFJT4RXKWcJABI&components=country:au&language=en-AU`
  )
}

//register

export const userReister = userDetails => {
  const userdata = {
    UserName: userDetails.username,
    Password: userDetails.password,
    Email: userDetails.email,
    PhoneNo: userDetails.mobile,
    IsAcceptPolicy: true,
  }
  return dispatch => {
    return axios.post(`${API_URL}/Register`, userdata, {
      headers: headers1(),
    })
  }
}

export const userReisterGoogle = userDetails => {
  const userdata = {
    GoogleIdToken: userDetails,
    IsAcceptPolicy: true
  }
  return dispatch => {
    return axios.post(`${API_URL}/RegisterGoogle`, userdata, {
      headers: headers1(),
    })
  }
}

export const registerCheckDup = dupValues => {
  return dispatch => {
    return axios.post(`${API_URL}/Register/CheckDup`, dupValues, {
      headers: headers1(),
    }).then(function(response){
      return response
    })
  }
}

export const registerGoogleCheckDup = googleDupValues => {
  return dispatch => {
    return axios.post(`${API_URL}/RegisterGoogle/CheckDup`, googleDupValues, {
      headers: headers1(),
    }).then(function(response){
      return response
    })
  }
}

//resetPassword

export const resetPass = email => {
  const userdata = {
    Email: email,
  }
  return dispatch => {
    return axios.post(`${API_URL}/ForgotPassword`, userdata, {
      headers: headers1(),
    })
  }
}

//register 2

export const submitEditinfo = userDetails => {
  console.log(userDetails)
  const userdata = {
    MemberId: parseInt(localStorage.getItem("smartway_user_info")),
    UserName: userDetails.username,
    Password: userDetails.password,
    Email: userDetails.email,
    PhoneCountryId: 2,
    PhoneNo: userDetails.mobile,
    TitleId: userDetails.title,
    FirstName: userDetails.firstName,
    LastName: userDetails.lastName,
    MiddleName: userDetails.middleName,
    BirthDateISO: userDetails.dob,
    NationalityId: userDetails.nationality,
    Otp:
      userDetails.otp1 +
      userDetails.otp2 +
      userDetails.otp3 +
      userDetails.otp4 +
      userDetails.otp5 +
      userDetails.otp6,
  }

  return axios.post(`${API_URL}/EditAccountInfo`, userdata, {
    headers: headers1(),
  })
}

export const submitUploadInfo = userDetails => {
  const userdata = {
    MemberId: parseInt(localStorage.getItem("smartway_user_info")),
    Documents: [
      {
        MemberDocumentTypeId: userDetails.MemberDocumentTypeId_poi,
        DocumentNo: userDetails.DocumentNo_poi,
        DocumentExpireDateISO: userDetails.DocumentExpireDateISO_poi,
        DocumentIssuer: userDetails.DocumentIssue_poi,
        DocumentBase64: userDetails.DocumentBase64_poi.split("base64,")[1],
        DocumentName: userDetails.DocumentName_poi,
      },
      {
        MemberDocumentTypeId: userDetails.MemberDocumentTypeId_poa,
        DocumentNo: userDetails.DocumentNo_poa,
        DocumentExpireDateISO: userDetails.DocumentExpireDateISO_poa,
        DocumentIssuer: userDetails.DocumentIssuer_poa,
        DocumentBase64: userDetails.DocumentBase64_poa.split("base64,")[1],
        DocumentName: userDetails.DocumentName_poa,
        DocumentBackBase64: userDetails.DocumentBackBase64_poa.split(
          "base64,"
        )[1],
        DocumentBackName: userDetails.DocumentBackName_poa,
      },
    ],
  }

  return axios.post(`${API_URL}/UploadDocument`, userdata, {
    headers: headers1(),
  })
}

export const editPersonal = userDetails => {
  const userdata = {
    MemberId: parseInt(localStorage.getItem("smartway_user_info")),
    GenderId: userDetails.GenderId,
    OccupationId: userDetails.OccupationId,
    OccupationOtherText: userDetails.OccupationOtherText,
    SalaryId: userDetails.SalaryId,
    FrequencyOfTransferId: parseInt(userDetails.FrequencyOfTransferId),
    ConvenientTimeToContactId: parseInt(userDetails.ConvenientTimeToContactId),
  }

  return axios.post(`${API_URL}/EditPersonalDetail`, userdata, {
    headers: headers1(),
  })
}

//otp

export const mobileOtp = (id, value) => {
  // alert(id)
  return () => {
    return axios.post(
      `${API_URL}/ResendOtp`,
      {
        MemberId: id,
        PhoneNo: String(value),
        PhoneCountryId: 2
      },
      {
        headers: headers1(),
      }
    )
  }
}

export const resetpassword = (token, pass1, pass2) => {
  // alert(id)
  return () => {
    return axios.post(
      `${API_URL}/ResetPassword`,
      {
        Token: token,
        NewPassword: pass1,
        ConfirmNewPassword: pass2,
      },
      {
        headers: {'Language': (typeof window !== 'undefined' && window.location.href.includes('/th')) ? 'th-TH' : 'en-Us'},
      }
    )
  }
}

export const passwordchange = (pass1, pass2) => {
  // alert(id)
  return () => {
    return axios.post(
      `${API_URL}/ChangePassword`,
      {
        CurrentPassword: pass1,
        NewPassword: pass2,
      },
      {
        headers: headers1(),
      }
    )
  }
}

export const poliPayment = userDetails => {
  const userdata = {
    LinkType: "0",
    Amount: userDetails.send,
    CurrencyCode: "AUD",
    MerchantData: "CustomerRef12345",
    MerchantReference: "CustomerRef12345",
    ConfirmationEmail: "false",
    AllowCustomerReference: "false",
    ViaEmail: "false",
    RecipientName: "false",
    LinkExpiry: "2022-10-24 16:00:00+11",
    RecipientEmail: "false",
  }
  return dispatch => {
    return axios
      .post(`https://smartway-poli.herokuapp.com/getpolilink`, userdata, {})
      .then(x => {
        if (x.data.ErrorMessage) {
          Swal.fire({
            title: x.data.ErrorMessage,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })
        } else {
          return x
        }
      })
      .catch(err => err)
  }
}

export const logout = () => {
  return dispatch => {dispatch({type: loginConstant.LOGOUT})}
}