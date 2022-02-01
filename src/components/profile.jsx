import React, { useEffect, useState, useRef } from "react";
import { Collapse, DatePicker } from 'antd';
import { transactionHistory } from '../state/action/currency'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import Pagination from "react-js-pagination";
import classNames from "classnames";
import crossIcon from "src/images/icons/cross.png";
import { Upload, AutoComplete } from "antd";
import Resizer from 'react-image-file-resizer';

import translate from 'src/helpers/language';
import {
  Profile,
  Layout,
  SEO,
  Container,
} from "src/sws-ui"

import icSuccess from "src/images/icons/ic-success.png";
import icFail from "src/images/icons/ic-fail.png";
import { Formik } from "formik";
// require("bootstrap/less/bootstrap.less");
const { Panel } = Collapse;

function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = (H % 12) || 12;
  h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
};

const LoginPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(transactionHistory(null, null, 0, 10))
  }, [])

  const getHistory = useSelector(state => state.currency.history)
  var dateformat;
  var timeformat;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



  const fileChangedHandler = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      },
      'base64'
    );
  });

  const [transferLimitModal, showTransferLimitModal] = useState(false);

  const handleTransferLimitModal = () => {
    showTransferLimitModal(!transferLimitModal);
  };

  const modalClasses = classNames("register-transfer__modal--select-account");

  const uploadClasses = classNames("currency-input currency-group--transfer currency-input--upload", {
    "currency-input--upload-active": 'uploadedImg'
  })

  const handleUploadedImg = file => {
    setUploadedImg(!uploadedImg)
  }

  const handleUploadedImg1 = () => {
    setUploadedImg1(!uploadedImg1)
  }

  const handleUploadedImg2 = () => {
    setUploadedImg2(!uploadedImg2)
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const uploadImges = useRef();
  const [uploadImg, setUploadImg] = useState("");
  const [uploadedImg, setUploadedImg] = useState(false);
  const [uploadImg1, setUploadImg1] = useState("");
  const [uploadedImg1, setUploadedImg1] = useState(false);
  const [uploadImg2, setUploadImg2] = useState("");
  const [uploadedImg2, setUploadedImg2] = useState(false);

  const [active, setActive] = useState(1)

  return (
    <Layout>
      <SEO title="Profile" />
      <Container gridTemplateRows="2">
        <div class="row-1 col-1-12">
          <Profile />
        </div>
        <div class="row-2 col-2-11">
          <div class="transfer-history-container">

            {transferLimitModal && (
              <div className="transfer__modal" style={{ maxHeight: "100%" }}>
                <div className={modalClasses}>
                  <div className="transfer__modal--cross" onClick={handleTransferLimitModal}>
                    <img src={crossIcon} className="transfer__modal--cross-img" />
                  </div>
                  <h2>Upload Documents</h2>
                  <p style={{ display: "block", marginBottom: "0" }}>Please provide the following documents so we can verify your transaction: </p>
                  <p style={{ display: "block", marginTop: "30px", marginBottom: "0" }}><strong>Bank Statement</strong></p>
                  <div className="currency-group" style={{ marginTop: "0", width: "80%", marginBottom: "30px" }}>
                    <div className={uploadClasses}>
                      <p className="upload-label">Bank Statement</p>
                      <div name="" onClick={() => {

                        uploadImges.current.click()


                        //}
                      }}>
                        <div className="uploadButton">Upload Photo</div>
                      </div>
                      <input style={{ display: 'none' }} ref={uploadImges} type="file" onChange={async (info) => {
                        alert(info.target.files)
                        if (
                          info.target.files[0].type.includes('/jpeg') ||
                          info.target.files[0].type.includes('/jpg') ||
                          info.target.files[0].type.includes('/png')
                        ) {

                          if (info.target.files[0].size >= 10000000) {
                            Swal.fire('File size should be less then 10 MB.')
                            return;
                          }
                          //  if (info.file.status === "uploading") {
                          //   Swal.showLoading()
                          //   return;
                          // }
                          Swal.close();


                          Swal.fire('Compressing image...')
                          const imageUrl = await fileChangedHandler(info.target.files[0]);
                          console.log(imageUrl)
                          setUploadImg(imageUrl)

                          Swal.close()


                        } else {
                          Swal.fire('Invalid file')
                          return
                        }
                      }} />
                    </div>


                  </div>
                  <p style={{ display: "block", marginTop: "30px", marginBottom: "0" }}><strong>Pay Slip</strong></p>
                  <div className="currency-group" style={{ marginTop: "0", width: "80%", marginBottom: "30px" }}>
                    <div className={uploadClasses}>
                      <p className="upload-label">Pay Slip</p>
                      <div name="" onClick={() => {

                        uploadImges.current.click()


                        //}
                      }}>
                        <div className="uploadButton">Upload Photo</div>
                      </div>
                      <input style={{ display: 'none' }} ref={uploadImges} type="file" onChange={async (info) => {
                        console.log(info.target.files)
                        if (
                          info.target.files[0].type.includes('/jpeg') ||
                          info.target.files[0].type.includes('/jpg') ||
                          info.target.files[0].type.includes('/png')
                        ) {

                          if (info.target.files[0].size >= 10000000) {
                            Swal.fire('File size should be less then 10 MB.')
                            return;
                          }
                          //  if (info.file.status === "uploading") {
                          //   Swal.showLoading()
                          //   return;
                          // }
                          Swal.close();


                          Swal.fire('Compressing image...')
                          const imageUrl = await fileChangedHandler(info.target.files[0]);
                          console.log(imageUrl)
                          setUploadImg(imageUrl)

                          Swal.close()


                        } else {
                          Swal.fire('Invalid file')
                          return
                        }
                      }} />
                    </div>


                  </div>
                  <p style={{ display: "block", marginTop: "30px", marginBottom: "0" }}><strong>Reason for Transfer</strong></p>
                  <div className="currency-group" style={{ marginTop: "30px", width: "80%", marginBottom: "30px" }}>
                    <textarea
                      className="form__input form__input--full"
                      placeholder="Reason for Transfer"
                      name="question"
                    />


                  </div>

                  <button
                    type="submit"
                    className="btn bold btn--yellow"
                    onClick={handleTransferLimitModal}
                  >
                    Submit and Continue
                      </button>
                </div>
              </div>
            )}
            <h2>{translate('Transfer History', 'ประวัติการโอน')}</h2>
            <p>{translate('Select Date Range of Transactions: ', 'เลือกช่วงวันที่ของธุรกรรม:')}
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
                Swal.showLoading();
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
                  <div className="errors-form">
                    {errors.date2 && touched.date2 && errors.date2}
                  </div>
                  </div>
                  <button
                    type="search"

                  >
                    {translate('Filter', 'กรอง')}
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
                    {translate('Clear', 'ชัดเจน')}
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
                        dateformat = new Date(data.TransferDateISO + ' UTC')
                        console.log(dateformat)
                        const options = {
                          hour: 'numeric', minute: 'numeric',
                          timeZone: 'Australia/Sydney'
                        };
                        timeformat = new Intl.DateTimeFormat('en-AU', options).format(dateformat);
                        console.log(timeformat)
                      })()}

                      <div class="transfer-date"><p>{dateformat.getDate()}</p><p> {monthNames[dateformat.getMonth()]} &nbsp; {dateformat.getFullYear()}</p></div>
                      <div class="transfer-details">
                        <div class="transfer-details-icon"><img src={data.TransferStatusIdTransferStatusName === "Completed" ? icSuccess : icFail}></img></div>
                        <div class="transfer-amount">{data.TransferAmountText} {data.TransferMoneyName && data.TransferMoneyName.split("->")[0].trim()} &#10230; {data.ReceiveAmountText} {data.TransferMoneyName && data.TransferMoneyName.split("->")[1].trim()} </div>
                        <div class="transfer-time">{timeformat}</div>
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


                  {data.TransferAmount >= 5000 ?
                    <div class="transfer-limit-notification" >
                      <hr></hr>
                      <p style={{ marginTop: "30px" }}><strong>Important:</strong> This transaction is above $5,000. You will need to provide documents to verify this transaction.</p>
                      <button
                        className="btn bold btn--yellow"
                        onClick={handleTransferLimitModal}
                      >
                        Upload Documents
                      </button>
                    </div>
                    :
                    ""
                  }
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
