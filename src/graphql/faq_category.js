import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function FaqCategory() {
  const data = useStaticQuery(
    graphql`
      query category {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "faq_page" } } }
        ) {
          nodes {
            frontmatter {
              question_Category
              category_language
            }
          }
        }
      }
    `
  )

  return data
}
