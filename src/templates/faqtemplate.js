import React from "react"
import "src/css/pages/_faqs.scss"
import Faqategory from "../graphql/faq_category"
import Allfaqapi from "../graphql/faq"
import {
  Accordion,
  AccordionWrapper,
  Heading,
  Container,
  Layout,
  SEO,
} from "src/sws-ui"

var eachFaq
const FaqsPage = ({pageContext}) => {
  const faqCategorydata = Faqategory()
  const faqData = Allfaqapi()
  
  console.log(pageContext)
  console.log(faqCategorydata)
  console.log(faqData)
  return (
    <Layout>
      <SEO title="Frequently Asked Questions" />
      <Container gridTemplateRows="8">
        <Heading size="2" col="col-1-9" row="row-1" className="faq__title">
          Help &amp; FAQ
        </Heading>
        {faqCategorydata.allMarkdownRemark.nodes.map((data, counter = 3) => {
          return data.frontmatter.category_language?.toLowerCase() === pageContext.lang?.toLowerCase() && 
           (
            <AccordionWrapper
              theme="grey"
              row={"row-" + counter + " row-md-2"}
              faqsPage
            >
              {(() => {
               
                eachFaq = []
                faqData.allMarkdownRemark.nodes.map((datafaq, counter) => {
                  if (
                    (datafaq.frontmatter.question_Category == data.frontmatter.question_Category)
                    && (datafaq.frontmatter.category_language?.toLowerCase() === pageContext.lang?.toLowerCase() )
                  ) {
                    datafaq.frontmatter.all_faqs.map((qa, qa_count) => {
                      var temp_faq = {
                        heading: qa.question_faq,
                        content: <p>{qa.answer_faq}</p>,
                      }
                      eachFaq.push(temp_faq)
                    })
                  }
                })
              })()}

              <Accordion
                accordionItems={eachFaq}
                theme="grey"
                heading={data.frontmatter.question_Category}
              />
            </AccordionWrapper>
          )
        })}
      </Container>
    </Layout>
  )
}

export default FaqsPage
