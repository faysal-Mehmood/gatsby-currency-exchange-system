import { API_URL, headers, headers1 } from "../../config"
import Swal from "sweetalert2"
import {
  GET_CURENCY,
  EXH_RATE,
  EXH_RATE_CURRENT,
  ALL_BANK,
  ALL_TITLE,
  ALL_STATE,
  ALL_CITY,
  ALL_POSTEL,
  TIME_CONNECT,
  ALL_SALARY,
  ALL_GENDER,
  ALL_OCCUPATION,
  FREQUENCY_TRANSFER,
  ALL_NATIONALITY,
  ALL_HISTORY,
  GET_ADVERTIZE,
} from "../constants/constant"

import axios from "axios"
import { setNestedObjectValues } from "formik"
import { navigate } from "gatsby-link"

export const getCurrency = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/GetCurrency`,
        {},

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: GET_CURENCY,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getCurrentExchangeRate = exhDataCurrent => {
  return dispatch => {
    axios
    .post(
      `${API_URL}/GetCurrentExchangeRate`,
      exhDataCurrent,

      {
        headers: headers,
      }
    )
    .then(function(response) {
      if (response.data.StatusCode === "0") {
        console.log('exchcur')
        console.log(response)
        dispatch({
          type: EXH_RATE_CURRENT,
          payload: response.data.Object,
        })
      } else {
        Swal.fire({
          title: response.data.Message,
        })
      }
    })
    .catch(function(error) {
      alert("something went wrong")
    })
  }
}

export const checkOverLimit = transferData => async () => {
  return await axios
    .post(
      `${API_URL}/CheckOverLimit`,
      transferData,

      {
        headers: headers1(),
      }
    )
    .then(function(response) {
      if (response.data.StatusCode === "0" || response.data.StatusCode === "09") {
        return response
      } else {
        Swal.fire({
          title: response.data.Message,
        })
      }
    })
    .catch(function(error) {
      alert("something went wrong")
    })
}

export const getAdvertize = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Advertise`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: GET_ADVERTIZE,
            payload: response.data.Object,
          })
        } else if (response.data.StatusCode === "0") {
          alert(response.data.Message)
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getExchangeRate = exhData => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/GetSpecialExchangeRate`,
        exhData,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: EXH_RATE,
            payload: response.data.Items,
          })
        } else if (response.data.StatusCode === "0") {
          alert(response.data.Message)
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getAllBank = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Bank`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_BANK,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getCity = ProvinceId => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Amphur`,
        { ProvinceId },

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_CITY,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getPostel = amphurId => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/PostalCode`,
        { amphurId },

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_POSTEL,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getStates = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Province`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_STATE,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const getGender = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Gender`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_GENDER,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const ConvenientTimeToContact = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/ConvenientTimeToContact`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: TIME_CONNECT,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const FrequencyOfTransfer = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/FrequencyOfTransfer`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: FREQUENCY_TRANSFER,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const allSalary = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Salary`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_SALARY,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const Occupation = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Occupation`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_OCCUPATION,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const nationalityAll = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Nationality`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_NATIONALITY,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const titleAll = () => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/Title`,

        {
          headers: headers,
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_TITLE,
            payload: response.data.Items,
          })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const transactionHistory = (date1, date2, start, length) => {
  const data = {
    TransferDateFromISO: date1 || "",
    TransferDateToISO: date2 || "",
    TransferMoneyId: null,
    TransactionRefNo: "",
    Start: start,
    Length: length,
  }

  return dispatch => {
    axios
      .post(
        `${API_URL}/TransferMoneyHistory`,
        data,

        {
          headers: headers1(),
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          dispatch({
            type: ALL_HISTORY,
            payload: response.data,
          })
        } else {
          //alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}

export const transferMoneyCheck = data  => async () =>  {
  return await axios
      .post(
        `${API_URL}/TransferMoney`,
        data,

        {
          headers: headers1(),
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
          // navigate(response.data.Object.NavigateURL)
          return response.data
          // dispatch({
          //   type: ALL_HISTORY,
          //   payload: response.data,
          // })
        } else {
          //alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }

export const deleteAccount = data => {
  return dispatch => {
    axios
      .post(
        `${API_URL}/DeleteMemberAccount`,
        data,

        {
          headers: headers1(),
        }
      )
      .then(function(response) {
        if (response.data.StatusCode === "0") {
            Swal.fire({
                title: 'Deleted Successfully',
                icon: 'success'

              })
        } else {
          alert(response.data.Message)
        }
      })
      .catch(function(error) {
        alert("something went wrong")
      })
  }
}
