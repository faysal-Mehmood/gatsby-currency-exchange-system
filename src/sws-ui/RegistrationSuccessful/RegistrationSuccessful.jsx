import React, { useState, useEffect } from "react";
import { Link } from "gatsby";


const RegistrationSuccessful = () => {


  return (
    <>
      <section className="login-money-transfer">

      

        <h1>Registration Successful</h1>
        <p>Your registration has been confirmed. Please log in to continue</p>

        <Link
        style={{alignSelf:'center','marginTop':'30px'}}
              type="submit"
              className="btn bold btn--yellow"
              to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login': '/en/login'}
            >
              Login
          </Link>
        
      </section>
      
    </>
  );
};

export default RegistrationSuccessful;
