import React, { useEffect, useState } from "react";
import { Tabs, Upload } from 'antd';
import { Link, navigate } from 'gatsby'
import { Button } from "src/sws-ui"
import profileImage from "src/images/icons/profileImage.png";
import editProfile1 from "src/images/icons/editprofile.png";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../state/action/profile'
import classNames from "classnames";
import crossIcon from "src/images/icons/cross.png";
import { Formik } from 'formik';
import Swal from 'sweetalert2'
import { passwordchange, editPersonal, logout } from "../../state/action/login"
import { editAddress, editProfile } from "../../state/action/profile";
import { nationalityAll, titleAll, getGender, FrequencyOfTransfer, Occupation, allSalary, ConvenientTimeToContact } from "../../state/action/currency";
import Resizer from 'react-image-file-resizer';
import translate from 'src/helpers/language';
import "react-responsive-modal/styles.css";



const Profile = () => {
  const dispatch = useDispatch()
  const allProfiles = useSelector(state => state.currency)
  const allState = useSelector((state) => state);
  const { profile: { profile } } = allState;
  useEffect(() => {
    dispatch(getProfile())

  }, [])


  const [PhoneModal, showPhoneModal] = useState(false);



  const [imageForProfile, setProfileImage] = useState('')
  useEffect(() => {

    setProfileImage(profile?.ProfileHyperLink)
  }, [profile])

  // const fileChangedHandler = (file) => new Promise(resolve => {
  //   Resizer.imageFileResizer(file, 900, 900, 'JPEG', 100, 0,
  //   uri => {
  //     resolve(uri);
  //   },
  //   'base64'
  //   );
  //   });

	const handleLogout = () => {
		console.log('logging out')
		dispatch(logout())
	}


  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }



  const handleUpload = async (info) => {

    if (
      info.file.type.includes('/jpeg') ||
      info.file.type.includes('/jpg') ||
      info.file.type.includes('/png')
    ) {

      if (info.size >= 3000000) {
        Swal.fire('File size should be less then 3 MB.')
        return;
      }




      // Swal.fire('Compressing image...')
      // const imageUrl =  await fileChangedHandler(info.file);
      // dispatch(editProfile({...profile,ProfileBase64:imageUrl.split('base64,')[1]}));

      if (info.file) {
        getBase64(info.file.originFileObj, imageUrl => {
          setProfileImage(imageUrl);
          dispatch({
            type: 'GET_IMAGE',
            payload: imageUrl
          })

          dispatch(editProfile({ ...profile, ProfileBase64: imageUrl.split('base64,')[1] }, true));
        }
        );
      }
      //Swal.close()


    } else {
      Swal.fire('Invalid file')
      return
    }

  }

  const { TabPane } = Tabs;

  const pictureClasses = classNames("picture-holder", (imageForProfile !== '') && "picture-holder-img")

  const modalClasses = classNames("register-transfer__modal--select-account");
  useEffect(() => {
    dispatch(getGender());
    dispatch(Occupation());
    dispatch(allSalary());
    dispatch(FrequencyOfTransfer());
    dispatch(ConvenientTimeToContact());
    dispatch(titleAll());
    dispatch(nationalityAll());
  }, [])

  const getProfiledata = useSelector(state => state.profile?.profile)
  const [forgotPasswordModal, showForgotPasswordModal] = useState(false);
  const [passwordResetSuccessModal, showPasswordResetSuccessModal] = useState(false);
  const [addressModal, showAddressModal] = useState(false);

  const handleForgotPasswordModal = () => {
    showForgotPasswordModal(!forgotPasswordModal);
  };

  const handlePasswordResetSuccessModal = () => {
    showPasswordResetSuccessModal(!passwordResetSuccessModal);
    showForgotPasswordModal(!forgotPasswordModal);
  };

  const handleCloseResetPasswordModal = () => {
    showPasswordResetSuccessModal(!passwordResetSuccessModal);
  };

  const handlePhoneModal = () => {
    showPhoneModal(!PhoneModal);
  }

  return (
    <>

      <section className="profile-section">



        {forgotPasswordModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handleForgotPasswordModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>{translate('Reset Password', 'รีเซ็ตรหัสผ่าน')}</h2>
              <p>
                {translate('Reset your password. Passwords must be at least 6 characters long.', 'รีเซ็ตรหัสผ่านของคุณ. รหัสผ่านต้องมีความยาวอย่างน้อย 6 อักขระ')}
              </p>
              <Formik
                initialValues={{ confirm: '', password1: '', password2: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.password1) {
                    errors.password1 = 'Required';
                  }
                  if (!values.password2) {
                    errors.password2 = 'Required';
                  }
                  else if (values.password1 !== values.password2) {
                    errors.password2 = 'password not matched';
                  }
                  if (!values.confirm) {
                    errors.confirm = 'Required';
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  Swal.showLoading()
                  const response = await dispatch(passwordchange(values.confirm, values.password2))
                  Swal.close()
                  if (response.data.StatusCode === "0") {
                    handlePasswordResetSuccessModal()

                  }
                  else if (response.data.StatusCode === "01") {
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
                        window.location.href = typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login' : '/en/login';
                      }
                    })
                  }
                  else {

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


                    <div className="currency-group">
                      <div className="currency-input">
                        <input
                          type="password"

                          placeholder="Enter Current Password"
                          name="confirm"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirm}
                        />
                      </div>
                      <div className="error-form">
                        {errors.confirm && touched.confirm && errors.confirm}
                      </div>
                      <div className="currency-input">
                        <input
                          type="password"

                          placeholder="Enter New Password"
                          name="password1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password1}
                        />
                      </div>
                      <div className="error-form">
                        {errors.password1 && touched.password1 && errors.password1}
                      </div>
                      <div className="currency-input">
                        <input
                          type="password"

                          placeholder="Re-enter New Password"
                          name="password2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password2}
                        />
                      </div>
                      <div className="error-form">
                        {errors.password2 && touched.password2 && errors.password2}
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn bold btn--yellow"

                      >
                        {translate('Reset Password', 'รีเซ็ตรหัสผ่าน')}
                      </button>
                    </div>

                  </form>
                )}
              </Formik>

            </div>
          </div>
        )}

        {passwordResetSuccessModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handleCloseResetPasswordModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>{translate('Password Reset Successful', 'รีเซ็ตรหัสผ่านสำเร็จ')}</h2>
              <p>
                {translate('Your password has been successfully reset. Please log in again to continue.', 'รีเซ็ตรหัสผ่านของคุณสำเร็จแล้ว กรุณาเข้าสู่ระบบอีกครั้งเพื่อดำเนินการต่อ')}
              </p>

              <div className="btn bold btn--yellow" onClick={() => {
                    localStorage.removeItem("smartway_auth")
                    handleLogout();
                    navigate(typeof window !== "undefined" && window.location.href.includes("/th")
                    ? "/th/login"
                    : "/en/login")
                  }}>
                <a
                  
                >
                  {translate('Login', 'เข้าสู่ระบบ')}
                </a>
              </div>
            </div>
          </div>
        )}

        {PhoneModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handlePhoneModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>{translate('Update your Phone Number', 'อัปเดตหมายเลขโทรศัพท์ของคุณ')}</h2>

              <div className="currency-group currency-group--transfer">
                <div className="currency-input">
                  <input
                    placeholder={getProfiledata?.PhoneNo || 'NA'}
                    type="text"
                    name="phone"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn bold btn--yellow"
                onClick={handlePhoneModal}
              >
                {translate('Submit and Continue', 'ส่งและดำเนินการต่อ')}
              </button>
             
            </div>
          </div>
        )}



        <div class="profile-section__tabs">

          <div class="profile-section__general">
            <div class="profile-picture">
              <div className={pictureClasses}>
                {imageForProfile !== '' &&
                  (
                    <img src={imageForProfile} class="profile-picture__image" />
                  )
                }
                <Upload onChange={handleUpload}>
                  <div></div>
                </Upload>
              </div>
              <p class="profile-name">{getProfiledata?.FirstName || ""}</p>
            </div>
            <div>
              <Tabs defaultActiveKey="1" animated={{ inkBar: true, tabPane: false }}>
                <TabPane tab={translate('Account', 'บัญชีผู้ใช้')} key="1">
                  <div class="profile-section__general--details">
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Username', 'ชื่อผู้ใช้')}</h4>
                        <p>{getProfiledata?.UserName}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Email', 'อีเมล์')}</h4>

                        <p>{getProfiledata?.Email}</p>
                      </div>
                    </div>
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Phone Number', 'หมายเลขโทรศัพท์')}</h4>
                        {(
                          getProfiledata?.MemberProfileStatusId === 1 ||
                          getProfiledata?.MemberProfileStatusId === 4 ||
                          getProfiledata?.MemberProfileStatusId === 5 ||
                          getProfiledata?.MemberProfileStatusId === 7 ||
                          getProfiledata?.MemberProfileStatusId === null
                        ) && (

                            <div className="edit__icon-container1" onClick={handlePhoneModal}>
                              <img src={editProfile1}></img>
                            </div>
                          )}
                        <p>{'+61' + getProfiledata?.PhoneNo}</p>
                      </div>
                    </div>
                      <p class="forgot-password" onClick={handleForgotPasswordModal}>Reset password</p>
                  </div>
                  {/* <div className="edit__icon-container" onClick={handleAccountModal}>
                  <img src={editProfile1}></img>
                </div> */}


                </TabPane>
                <TabPane tab={translate('Personal Details', 'ข้อมูลส่วนตัว')} key="2">
                  <div class="profile-section__general--details">
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Name', 'ชื่อ')}</h4>
                        <p>{getProfiledata?.FirstName || ""}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Date of Birth', 'วันเกิด')}</h4>
                        <p>{getProfiledata?.BirthDateText || ""}</p>
                      </div>
                    </div>
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Nationality', 'สัญชาติ')}</h4>
                        <p>Australian</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="edit__icon-container" onClick={handlePersonalDetailsModal}>
                  <img src={editProfile1}></img>
                </div> */}


                </TabPane>
                <TabPane tab={translate('Address', 'ที่อยู่')} key="3">
                  <div class="profile-section__general--details">
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Unit Number', 'เลขที่หน่วย')}</h4>
                        <p>{getProfiledata?.AusUnitNumber || ''}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Street Name', 'ชื่อถนน')}</h4>
                        <p>{getProfiledata?.AusStreetName || ''}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Suburb', 'ชานเมือง')}</h4>
                        <p>{getProfiledata?.AusSuburb || ''}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Postcode', 'รหัสไปรษณีย์')}</h4>
                        <p>{getProfiledata?.AusPostalCode || ''}</p>
                      </div>
                    </div>
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Street Number', 'เลขที่ถนน')}</h4>
                        <p>{getProfiledata?.AusStreetNumber || ''}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Street Type', 'ประเภทถนน')}</h4>
                        <p>{getProfiledata?.AusStreetType || ''}</p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('State', 'สถานะ')}</h4>
                        <p>{getProfiledata?.AusState || ''}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="edit__icon-container" onClick={handleAddressModal}>
                  <img src={editProfile1}></img>
                </div> */}
                </TabPane>
                <TabPane tab={translate('Other Details', 'รายละเอียดอื่น ๆ')} key="4">
                  <div class="profile-section__general--details">
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Gender', 'เพศ')}</h4>
                        <p>
                          {!!getProfiledata?.GenderId &&
                            allProfiles.gender?.map(id => {
                              return id.GenderId === getProfiledata?.GenderId && (
                                id.GenderName
                              )
                            })
                          }

                        </p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Occupation', 'อาชีพ')}</h4>
                        <p>
                          {!!getProfiledata?.OccupationId &&
                            allProfiles.occupation?.map(id => {
                              return id.OccupationId === getProfiledata?.OccupationId && (
                                id.OccupationName
                              )
                            })
                          }
                        </p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Salary', 'เงินเดือน')}</h4>
                        <p>
                          {!!getProfiledata?.SalaryId &&
                            allProfiles.salary?.map(id => {
                              return id.SalaryId === getProfiledata?.SalaryId && (
                                id.SalaryName
                              )
                            })
                          }
                        </p>
                      </div>
                    </div>
                    <div class="profile-section__column">
                      <div className="profile-details--wrapper">
                        <h4>{translate('Frequency of Transfer', 'ความถี่ในการโอน')}</h4>
                        <p>
                          {!!getProfiledata?.FrequencyOfTransferId &&
                            allProfiles?.frequencyTransfer?.map(id => {
                              return id.FrequencyOfTransferId === getProfiledata?.FrequencyOfTransferId && (
                                id.FrequencyOfTransferName
                              )
                            })
                          }
                        </p>
                      </div>
                      <div className="profile-details--wrapper">
                        <h4>{translate('Convenient time for contact', 'เวลาที่สะดวกในการติดต่อ')}</h4>
                        <p>

                          {!!getProfiledata?.ConvenientTimeToContactId &&
                            allProfiles.timeConnect?.map(id => {
                              return id.ConvenientTimeToContactId === getProfiledata?.ConvenientTimeToContactId && (
                                id.ConvenientTimeToContactName
                              )
                            })
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="edit__icon-container" onClick={handleOtherDetailsModal}>
                  <img src={editProfile1}></img>
                </div> */}
                </TabPane>


              </Tabs>
              <Link className=""

              disabled={
                (
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 3) ||
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 6) ||
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 2)

                ) ?
                true : false


              }
              to={
                (
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 1) ||
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 4) ||
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 5) ||
                  (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === null)
                ) &&

                  typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/register2' : '/en/register2'


              }
              
              >
                
                {
                  (
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 1) ||
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 4) ||
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 5) ||
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === null)

                  ) &&
                  'Complete registration'
                }{
                  (
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 3) ||
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 6) ||
                    (getProfiledata?.MemberStatusId === 1 && getProfiledata?.MemberProfileStatusId === 2)

                  ) &&
                  'Waiting for approval'


                }</Link>


            </div>

          </div>.
       </div>
      </section>

    </>
  );
};

export default Profile;
