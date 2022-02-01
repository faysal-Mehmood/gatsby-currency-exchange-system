

import React from "react"
import { Layout, SEO, Container, Heading,  } from "src/sws-ui"
import ReactMarkdown from "react-markdown"
const Privacy = ({pageContext}) => {
  const data = pageContext.alldata.frontmatter

  return (
    <Layout>
      <SEO title="Privacy" />
      <Container gridTemplateRows="3" className="privacy-conditions">
        <Heading size="1" row="row-1" col="col-2-11">
          {data.title}
        </Heading>
        <div className="row-2 col-2-11">
          <ReactMarkdown
            source={
              data.privacy_policy_content
            }
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Privacy

