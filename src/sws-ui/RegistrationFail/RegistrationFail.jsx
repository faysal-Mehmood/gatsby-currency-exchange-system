import React, { useState, useEffect } from "react";
import { Link } from "gatsby";


const RegistrationFail = () => {


  return (
    <>
      <section className="login-money-transfer">

        <h1>Registration Failed</h1>
        <p>Your registration has been failed for some reason, please contact our customer support at Line: <a style={{'color': '#45578C'}}>@smartwaysystem</a> or <a tel="0287552628" style={{'color': '#45578C'}}>Tel. 0287552628</a></p>

        <Link
        style={{alignSelf:'center','marginTop':'30px'}}
              type="submit"
              className="btn bold btn--yellow"
              to={typeof window !== 'undefined' &&  '/'}
            >
              Homepage
          </Link>
        
      </section>
      
    </>
  );
};

export default RegistrationFail;
