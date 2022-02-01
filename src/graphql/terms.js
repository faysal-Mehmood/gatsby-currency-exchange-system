//import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Termsapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "terms_page" } } }
        ) {
          nodes {
            frontmatter {
              title
              terms_content
            }
          }
        }
      }
    `
  )

  return data
}
