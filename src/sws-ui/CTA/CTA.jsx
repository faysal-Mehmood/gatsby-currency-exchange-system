import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { default as GatsbyImage } from "gatsby-image"
import classNames from "classnames"
import { Heading, LinkHandler } from "src/sws-ui"

import AppStore from "src/images/app-store/app-store.png"
import GooglePlay from "src/images/app-store/google-play.png"

const CTA = ({ row, heading, description }) => {
  const data = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "sw-apps-yellow-cropped.png" }) {
        childImageSharp {
          fluid(maxWidth: 362) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const classes = classNames("cta", "container", "col-full col-sm-full", row)

  const imageClasses = classNames(
    "cta__image",
    "col-2-5 col-md-3-10 col-sm-2-5",
    "row-1 row-md-2"
  )

  const contentClasses = classNames(
    "cta__content",
    "col-8-12 col-md-2-11 col-sm-1-6",
    "row-1"
  )

  return (
    <section className={classes}>
      <GatsbyImage
        className={imageClasses}
        fluid={data.logoImage.childImageSharp.fluid}
        placeholderStyle={{
          filter: "blur(15px)",
        }}
        style={{
          width: "inherit",
        }}
        imgStyle={{
          height: "inherit",
          width: "100%",
          top: "auto",
          bottom: 0,
        }}
      />
      <div className={contentClasses}>
        <Heading size={2}>{heading}</Heading>
        <p>{description}</p>
        <div className="cta__links">
          <LinkHandler className="cta__link" linkUrl="https://play.google.com/store/apps/details?id=com.au.smartwaysystem.release" external>
            <img src={GooglePlay} alt="Google Play Store" />
          </LinkHandler>
          <LinkHandler className="cta__link" linkUrl="https://apps.apple.com/au/app/smartway-system/id1358996193" external>
            <img src={AppStore} alt="Apple App Store" />
          </LinkHandler>
        </div>
      </div>
    </section>
  )
}

export default CTA
