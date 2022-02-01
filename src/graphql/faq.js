import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Allfaqapi() {
  const data = useStaticQuery(
    graphql`
      query allfaq {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "faq_page" } } }
        ) {
          nodes {
            frontmatter {
              question_Category
              category_language
              all_faqs {
                answer_faq
                question_faq
              }
            }
          }
        }
      }
    `
  )

  return data
}
