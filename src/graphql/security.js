import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Securityapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "security" } } }
        ) {
          nodes {
            frontmatter {
              title
              security_content
            }
          }
        }
      }
    `
  )

  return data
}
