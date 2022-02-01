import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import "src/css/pages/_privacy-conditions.scss"
import "src/css/pages/_news.scss"
import group12 from "src/images/icons/Group12.png"
import group121 from "src/images/icons/Group121.png"

const AboutUsPage = ({pageContext}) => {
  return (
    <Layout>
      <SEO title="Contact Us" />
      <Container gridTemplateRows="8">

        <div className="background__images">
          <img src={group12}></img>
          <img src={group121}></img>
        </div>
        <div className="form__container col-2-11 col-md-1-12 row-3">
        <h1 className="row-1 col-2-11">
        About Us
        </h1>
        <div className="row-2 col-2-11">
          <p>Smartway System is a money transfer service provider where you can easy transfer fund from Australia to Thailand either online or using mobile applications 24/7. Smartway System provides the best rate available for client and attract no fee.</p>
          <p>
            Smartway System Pty Ltd has registered with ASIC, ACN 611856154 and has registered with AUSTRAC as a money remitter. AUSTRAC License No. 100520069.
          </p>
          <p>
          Our service is reliable and complied with AUSTRAC regulations. With our customer service officers, we would like to make sure that your transactions are safe and fast enough to get best customer satisfactions.
          </p>
          <p>
          Normally, it would take 1 business day for the recipient in Thailand to receive fund transferred from Australia. We provide the best rate available and charge no fee.
          </p>
        </div>
        </div>
      </Container>
    </Layout>
  )
}
export default AboutUsPage

