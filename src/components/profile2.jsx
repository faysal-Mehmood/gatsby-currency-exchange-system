import React, { useEffect, useState } from "react";
import { Collapse, DatePicker } from 'antd';
import { transactionHistory } from '../state/action/currency'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import Pagination from "react-js-pagination";
import { Link } from 'gatsby'
import translate from 'src/helpers/language';
import {
  ProfileTwo,
  Layout,
  SEO,
  Container,
} from "src/sws-ui"

import icSuccess from "src/images/icons/ic-success.png";
import icFail from "src/images/icons/ic-fail.png";
import { Formik } from "formik";
// require("bootstrap/less/bootstrap.less");
const { Panel } = Collapse;


const LoginPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(transactionHistory(null, null, 0, 10))
  }, [])

  const getHistory = useSelector(state => state.currency.history)
  var dateformat;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [active, setActive] = useState(1)

  return (
    <Layout>
      <SEO title="Profile" />
      <Container gridTemplateRows="2">
        <div class="row-1 col-1-12">
          <ProfileTwo />

        </div>
        <div class="row-2 col-2-11">
          <div class="transfer-history-container">
            <h2>{translate('Transfer History', 'ประวัติการโอน')}</h2>
            <p>Select Date Range of Transactions:
                  {/* <DatePicker placeholder="Date &or;"></DatePicker> to <DatePicker placeholder="Date &or;"></DatePicker> */}
            </p>
            <Formik
              initialValues={{
                date1: "",
                date2: "",

              }}
              validate={(values) => {
                const errors = {};
                if (!values.date1) {
                  errors.date1 = "Required";
                }
                if (!values.date2) {
                  errors.date2 = "Required";
                }
                return errors
              }}
              onSubmit={async (values, { setSubmitting }) => {
                // setError("");
                // handleModalNormal();
                Swal.show();
                await dispatch(transactionHistory(values.date1, values.date2, 0, 10));
                Swal.close();
                // setOpenModel(true);
                // globalvariable = values;
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                submitForm,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-data">
                  <input
                  type="date"
                  name="date1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date1}
                  
                  />
                  <div className="error-form">
                    {errors.date1 && touched.date1 && errors.date1}
                  </div>
                  </div>
                  <div className="form-data">
                  
                   
                   <input
                  type="date"
                  name="date2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date2}
                  
                  />  
                  <div className="error-form">
                    {errors.date2 && touched.date2 && errors.date2}
                  </div>
                  </div>
                  <button
                    type="search"

                  >
                    Filter
                  </button>
                  <div
                    className="btn"
                    onClick={async () => {
                      setFieldValue('date1', '')
                      setFieldValue('date2', '')
                      Swal.showLoading()
                      await dispatch(transactionHistory(null, null, 0, 10))
                      Swal.close()

                    }}

                  >
                    Clear
                  </div>
                </form>
              )}
            </Formik>

          </div>
          <div className="history-wrapper">
            <Collapse accordion expandIconPosition="right" ghost>
              {!!getHistory.Items && getHistory.Items.map((data, index) => {
                return <Panel header={
                  <>
                    <div class="accordion-header">
                      {(() => {
                        dateformat = new Date(data.TransferDateISO)

                      })()}

                      <div class="transfer-date"><p>{dateformat.getDate()}</p><p> {monthNames[dateformat.getMonth()]} &nbsp; {dateformat.getFullYear()}</p></div>
                      <div class="transfer-details">
                        <div class="transfer-details-icon"><img src={data.TransferStatusIdTransferStatusName === "Completed" ? icSuccess : icFail}></img></div>
                        <div class="transfer-amount">{data.TransferAmountText} {data.TransferMoneyName && data.TransferMoneyName.split("->")[0].trim()} &#10230; {data.ReceiveAmountText} {data.TransferMoneyName && data.TransferMoneyName.split("->")[1].trim()} </div>
                        <div class="transfer-time">{data.TransferDateTimeText}</div>
                      </div>
                    </div>
                  </>
                } key={index}>
                  <div class="transfer-moredetails">
                    <div className="profile-details--wrapper">
                      <h4>ID</h4>
                      <p>{data.TransactionRefNo}</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>From</h4>
                      <p>Name {data.PayerFirstName}&nbsp;{data.PayerFamilyName}</p>
                      <p>Bank {data.BankName}</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>To</h4>
                      <p>Name {data.PayerFirstName}&nbsp;{data.PayerFamilyName}</p>
                      <p>Bank {data.BankName}</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Status</h4>
                      <p class="transfer-complete">{data.TransferStatusIdTransferStatusName}</p>
                    </div>
                  </div>
                </Panel>
              })}



            </Collapse>
          </div>
          <Pagination
            activePage={active}
            itemsCountPerPage={10}
            totalItemsCount={getHistory.TotalRecords}
            pageRangeDisplayed={5}
            onChange={(e) => {
              console.log(e)
              setActive(e)
              dispatch(transactionHistory(null, null, e * 10 - 10, 10))

            }}
          />
        </div>
      </Container>
    </Layout>)
}


export default LoginPage;
