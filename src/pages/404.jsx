import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import "src/css/pages/_privacy-conditions.scss"
import "src/css/pages/_news.scss"
import group12 from "src/images/icons/Group12.png"
import group121 from "src/images/icons/Group121.png"

import translate from "src/helpers/language"
import { navigate } from "gatsby"

const NotFoundPage = () => (
  <Layout>
      <SEO title="Contact Us" />
      <Container gridTemplateRows="8">

        <div className="background__images">
          <img src={group12}></img>
          <img src={group121}></img>
        </div>
        <div className="form__container col-2-11 col-md-1-12 row-3">
        <h1 className="row-1 col-2-11">
        404 - Page Not Found
        </h1>
        <div className="row-2 col-2-11">
        <p>Sorry, the page you are looking for could not be found.</p>
        <button
              type="submit"
              className="btn bold btn--yellow"
              onClick={e => {
                e.preventDefault()
                navigate(
                  typeof window !== "undefined" && window.location.href.includes("/th")
                    ? "/th/"
                    : "/"
                )
              }}
            >
              {translate("Homepage", "หน้าแรก")}
            </button>
      </div>
        </div>
      </Container>
    </Layout>
);

export default NotFoundPage;
