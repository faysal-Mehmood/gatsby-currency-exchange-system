import { API_URL, headers, headers1 } from "../../config"
import * as loginConstant from "../constants/constant"
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js"
import axios from "axios"
import { navigate } from "gatsby"

export const contactUs = data => {
  const values = {
    ContactUsName: data.firstName + data.lastName,
    EmailAddress: data.email,
    PhoneNo: data.phone,
    Message: data.question
  }

  return axios.post(`${API_URL}/ContactUs`, values, {
    headers: headers1(),
  }).then(function(response) {
    if (response.data.StatusCode === "0") {
        Swal.fire({
          title: "Thank you for your message.",
          icon: "success",
        })
    }
  })
}

export const editAddress = data => {
  const values = {
    MemberId: parseInt(localStorage.getItem("smartway_user_info")),
    AusUnitNumber: data.unit,
    AusStreetNumber: data.street_number,
    AusStreetName: data.street_name,
    AusStreetType: data.street_type,
    AusSuburb: data.suburb,
    AusState: data.state,
    AusPostalCode: data.postcode,
    AusCountry: data.country,
  }

  return axios.post(`${API_URL}/EditAddress`, values, {
    headers: headers1(),
  })
}
export const getProfile3 = () => async dispatch => {
  await axios
    .post(`${API_URL}/GetProfile`, null, {
      headers: headers1(),
    })
    .then(function(response) {
      if (response.data.StatusCode === "0") {
        dispatch({
          type: loginConstant.USER_PROFILE,
          payload: response.data.Object,
        })
      }
    })
}

export const getProfile = () => async dispatch => {
  Swal.showLoading()
  await axios
    .post(`${API_URL}/GetProfile`, null, {
      headers: headers1(),
    })
    .then(function(response) {
      if (response.data.StatusCode === "0") {
        Swal.close()
        dispatch({
          type: loginConstant.USER_PROFILE,
          payload: response.data.Object,
        })
      } else if (response.data.StatusCode === "01") {
        Swal.fire({
          title: response.data.Message,
          text: "Please try to login again.",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then(result => {
          if (result.isConfirmed) {
            localStorage.removeItem("smartway_auth")
            window.location.href =
              typeof window !== "undefined" &&
              window.location.href.includes("/th")
                ? "/th/login"
                : "/en/login"
          }
        })
      } else {
      }
    })
    .catch(function(error) {
      alert("something went wrong")
    })
}

export const getProfileLogin = () => async dispatch => {
  Swal.fire({
    title: "Please Wait !",
    html: "verifying credentials ...",
    allowOutsideClick: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading()
    },
  })
  await axios
    .post(`${API_URL}/GetProfile`, null, {
      headers: headers1(),
    })
    .then(function(response) {
      Swal.close()
      if (response.data.StatusCode === "0") {
        console.log(response)
        dispatch({
          type: loginConstant.USER_PROFILE,
          payload: response.data.Object,
        })
        console.log(response)
        if (
          response.data.Object.MemberStatusId === 1 &&
          response.data.Object.MemberProfileStatusId === null
        ) {
          navigate(
            typeof window !== "undefined" &&
              window.location.href.includes("/th")
              ? "/th/register2"
              : "/en/register2"
          )
        } else if (
          response.data.Object.MemberStatusId === 1 &&
          response.data.Object.MemberProfileStatusId === 3
        ) {
          navigate(
            typeof window !== "undefined" &&
              window.location.href.includes("/th")
              ? "/th"
              : "/"
          )
        } else if (
          response.data.Object.MemberStatusId === 1 &&
          response.data.Object.MemberProfileStatusId === 1
        ) {
          navigate(
            typeof window !== "undefined" &&
              window.location.href.includes("/th")
              ? "/th"
              : "/"
          )
        } else if (
          response.data.Object.MemberStatusId === 1 &&
          response.data.Object.MemberProfileStatusId === 2
        ) {
          navigate(
            typeof window !== "undefined" &&
              window.location.href.includes("/th")
              ? "/th"
              : "/"
          )
        } else {
          navigate(
            typeof window !== "undefined" &&
              window.location.href.includes("/th")
              ? "/th"
              : "/"
          )
        }
      } else if (response.data.StatusCode === "01") {
        Swal.fire({
          title: response.data.Message,
          text: "Please try to login again.",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then(result => {
          if (result.isConfirmed) {
            localStorage.removeItem("smartway_auth")
            window.location.href =
              typeof window !== "undefined" &&
              window.location.href.includes("/th")
                ? "/th/login"
                : "/en/login"
          }
        })
      } else {
      }
    })
    .catch(function(error) {
      alert("something went wrong")
    })
}

export const editProfile = (data, imgRequest) => {
  // Swal.showLoading()
  return dispatch => {
    axios
      .post(`${API_URL}/EditProfile`, data, {
        headers: headers1(),
      })
      .then(function(response) {
        if (response.data.StatusCode == "01") {
          Swal.fire({
            title: response.data.Message,
            text: "Please try to login again.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login",
          }).then(result => {
            if (result.isConfirmed) {
              localStorage.removeItem("smartway_auth")
              window.location.href =
                typeof window !== "undefined" &&
                window.location.href.includes("/th")
                  ? "/th/login"
                  : "/en/login"
            }
          })
        }
      })
      .catch(function(error) {
        Swal.fire("something went wrong")
      })
  }
}

//register

export const getReason = () => {
  return dispatch => {
    axios
      .post(`${API_URL}/TransferObjective`, null, {
        headers: headers1(),
      })
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: loginConstant.REASON,
            payload: response.data.Items,
          })
        } else {
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

//  export const  editAddress= (data)=>{
//     const values = {
//         "MemberId": parseInt(localStorage.getItem('smartway_user_info')),
//         "AusUnitNumber":data.unit,
//         "AusStreetNumber":data.street_number,
//         "AusStreetName":data.street_name,
//         "AusStreetType":data.street_type,
//         "AusSuburb":data.suburb,
//         "AusState":data.state,
//         "AusPostalCode":data.postcode,
//         "AusCountry":data.country
//     }

//     return axios.post(`${API_URL}/EditAddress`,values
//         ,{
//             headers:headers
//         })

// }
