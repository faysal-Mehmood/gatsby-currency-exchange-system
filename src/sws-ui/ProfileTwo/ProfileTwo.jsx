import React, { useEffect, useState } from "react";
import { Tabs } from 'antd';
import { Link } from 'gatsby'
import profileImage from "src/images/icons/profileImage.png";
import editProfile from "src/images/icons/editprofile.png";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../state/action/profile'
import classNames from "classnames";
import crossIcon from "src/images/icons/cross.png";
import translate from 'src/helpers/language';
const ProfileTwo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())

  }, [])

  const { TabPane } = Tabs;

  const modalClasses = classNames("register-transfer__modal--select-account");

  const getProfiledata = useSelector(state => state.profile.profile)

  const [forgotPasswordModal, showForgotPasswordModal] = useState(false);
  const [passwordResetSuccessModal, showPasswordResetSuccessModal] = useState(false);
  const [PhoneModal, showPhoneModal] = useState(false);
  const [PersonalDetailsModal, showPersonalDetailsModal] = useState(false);
  const [addressModal, showAddressModal] = useState(false);
  const [OtherDetailsModal, showOtherDetailsModal] = useState(false);

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

  const handlePersonalDetailsModal = () => {
    showPersonalDetailsModal(!PersonalDetailsModal);
  }

  const handleAddressModal = () => {
    showAddressModal(!addressModal);
  }

  const handleOtherDetailsModal = () => {
    showOtherDetailsModal(!OtherDetailsModal);
  }

  return (
    <>

      <section className="profile-section profile-two-section">

        {PhoneModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handlePhoneModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>Update your Phone Number</h2>

              <div className="currency-group currency-group--transfer">
                <div className="currency-input">
                  <input
                    placeholder={getProfiledata.PhoneNo || 'NA'}
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
                Submit and Continue
            </button>
            </div>
          </div>
        )}

        {addressModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handleAddressModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>Update your Email Address</h2>


              <div className="currency-group currency-group--transfer">
                <div className="currency-input">
                  <input
                    placeholder={getProfiledata.Email || 'NA'}
                    type="email"
                    name="email"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn bold btn--yellow"
                onClick={handleAddressModal}
              >
                Submit and Continue
            </button>
              <p>If you wish to edit any other details, please <Link to="/contact">contact us.</Link></p>
            </div>
          </div>
        )}


        {forgotPasswordModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handleForgotPasswordModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>Reset Password</h2>
              <p>
                Reset your password. Passwords must be at least 6 characters long.
          </p>
              <div className="currency-group">
                <div className="currency-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Current Password"
                  />
                </div>
                <div className="currency-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="currency-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Re-enter New Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn bold btn--yellow"
                  onClick={handlePasswordResetSuccessModal}
                >
                  Reset Password
            </button>
              </div>
            </div>
          </div>
        )}

        {passwordResetSuccessModal && (
          <div className="transfer__modal">
            <div className={modalClasses}>
              <div className="transfer__modal--cross" onClick={handleCloseResetPasswordModal}>
                <img src={crossIcon} className="transfer__modal--cross-img" />
              </div>
              <h2>Password Reset Successful</h2>
              <p>
                Your password has been successfully reset. Please log in again to continue.
          </p>

              <div className="btn bold btn--yellow">
                <Link
                  to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login' : '/en/login'}
                >
                  Login
            </Link>
              </div>
            </div>
          </div>
        )}

        <div class="profile-section__tabs">

          <div class="profile-section__general">
            <div class="profile-picture">
              <img src={profileImage} class="profile-picture__image" />
              <p class="profile-name">John Snow</p>
            </div>
            <Tabs defaultActiveKey="1" animated={{ inkBar: true, tabPane: false }}>
              <TabPane tab={translate('Account', 'บัญชีผู้ใช้')} key="1">
                <div class="profile-section__general--details">
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Username</h4>
                      <p>{getProfiledata.UserName || 'NA'}</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Email</h4>
                      <div className="edit__icon-container" onClick={handleAddressModal}>
                        <img src={editProfile}></img>
                      </div>
                      <p>{getProfiledata.Email || 'NA'}</p>
                    </div>
                  </div>
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Phone Number</h4>
                      <div className="edit__icon-container" onClick={handlePhoneModal}>
                        <img src={editProfile}></img>
                      </div>
                      <p>{getProfiledata.PhoneNo || 'NA'}</p>
                    </div>
                  </div>
                  <p class="forgot-password" onClick={handleForgotPasswordModal}>Reset password</p>
                </div>


              </TabPane>
              <TabPane tab={translate('Personal Details', 'ข้อมูลส่วนตัว')} key="2">
                <div class="profile-section__general--details">
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Name</h4>
                      <p>Mr John F Snow</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Date of Birth</h4>
                      <p>{getProfiledata.BirthDateText || 'NA'}</p>
                    </div>
                  </div>
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>{translate('', '')}Nationality</h4>
                      <p>Australian</p>
                    </div>
                  </div>
                </div>

              </TabPane>
              <TabPane tab={translate('Address', 'ที่อยู่')} key="3">
                <div class="profile-section__general--details">
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>Unit Number</h4>
                      <p>123</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Street Name</h4>
                      <p>Moore</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Suburb</h4>
                      <p>South Melbourne</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Postcode</h4>
                      <p>7000</p>
                    </div>
                  </div>
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>Street Number</h4>
                      <p>567</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Street Type</h4>
                      <p>St</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>State</h4>
                      <p>VIC</p>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab={translate('Other Details', 'รายละเอียดอื่น ๆ')} key="4">
                <div class="profile-section__general--details">
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>Gender</h4>
                      <p>Male</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Occupation</h4>
                      <p>Freelance</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Salary</h4>
                      <p>&gt; $25,000</p>
                    </div>
                  </div>
                  <div class="profile-section__column">
                    <div className="profile-details--wrapper">
                      <h4>Frequency of Transfer</h4>
                      <p>1-5</p>
                    </div>
                    <div className="profile-details--wrapper">
                      <h4>Convenient time for contact</h4>
                      <p>12:00pm - 3:00pm</p>
                    </div>
                  </div>
                </div>
              </TabPane>


            </Tabs>
          </div>
          <p style={{ textAlign: "center", margin: "10px 0 20px 0", fontStyle: "italic" }}>If you wish to edit any other details, please <Link to="/contact">contact us.</Link></p>
        </div>
      </section>

    </>
  );
};

export default ProfileTwo;
