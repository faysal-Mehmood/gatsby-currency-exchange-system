import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import Termspage from "../graphql/terms"
import ReactMarkdown from "react-markdown"

const Terms = ({pageContext}) => {
  const data = pageContext.alldata.frontmatter

  return (
    <Layout>
      <SEO title="Terms &#38; Conditions" />
      <Container gridTemplateRows="14" className="privacy-conditions">
        <Heading size="1" row="row-1" col="col-2-11">
          {data.title}
        </Heading>
        <div className="row-2 col-2-11">
          <ReactMarkdown
            source={
              data.terms_content
            }
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Terms
