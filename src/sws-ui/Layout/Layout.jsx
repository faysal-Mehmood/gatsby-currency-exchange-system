/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "src/sws-ui"
import "antd/dist/antd.css"
import "src/css/css.scss"
import { getProfile3 } from '../../state/action/profile'

const Layout = ({ children , homepage, showAd, ad }) => {
  const dispatch = useDispatch();
  useEffect(()=>{
   
    dispatch(getProfile3())
  }, [])
  return (
    <React.Fragment>
      <Header homepage={homepage} showAd={showAd} ad={ad}/>
      {children}
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
