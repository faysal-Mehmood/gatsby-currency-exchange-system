import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import "src/css/pages/_privacy-conditions.scss"
//import SecurityAPi from "../graphql/security"
import ReactMarkdown from "react-markdown"
const Security = ({pageContext}) => {
 const data = pageContext.alldata.frontmatter
  // const securitypage = SecurityAPi()

  // console.log(securitypage)

  return (
    <Layout>
      <SEO title="Security" />
      <Container gridTemplateRows="14" className="security">
        <h1 className="row-1 col-2-11">
          {data.title}
        </h1>
        <div className="row-2 col-2-11">
          <ReactMarkdown
            source={
              data.security_content
            }
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Security

